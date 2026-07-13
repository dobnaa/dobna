-- backend/supabase/functions/fn_complete_duel.sql
CREATE OR REPLACE FUNCTION fn_complete_duel(p_duel_id BIGINT, p_winner_id UUID)
RETURNS VOID AS $$
DECLARE
  v_duel RECORD;
  v_total_amount DECIMAL(20,8);
  v_fee DECIMAL(20,8);
  v_winner_amount DECIMAL(20,8);
BEGIN
  -- دریافت اطلاعات دوئل
  SELECT * INTO v_duel FROM duels WHERE id = p_duel_id;

  v_total_amount := v_duel.amount * 2; -- مبلغ دو کارت
  v_fee := v_total_amount * 0.05; -- 5% کارمزد
  v_winner_amount := v_total_amount - v_fee; -- 95% به برنده

  -- واریز کارمزد به حساب 00000005
  INSERT INTO system_balances (account_number, currency, amount)
  VALUES ('00000005', v_duel.currency, v_fee)
  ON CONFLICT (account_number, currency)
  DO UPDATE SET amount = system_balances.amount + v_fee;

  -- واریز جایزه به برنده
  UPDATE user_balances
  SET amount = amount + v_winner_amount
  WHERE user_id = p_winner_id AND currency = v_duel.currency;

  -- به‌روزرسانی وضعیت دوئل
  UPDATE duels
  SET status = 'completed',
      completed_at = NOW(),
      winner_id = p_winner_id,
      fee = v_fee
  WHERE id = p_duel_id;

  -- ثبت تراکنش‌ها
  INSERT INTO transactions (user_id, type, currency, amount, reference_id, description)
  VALUES 
    (p_winner_id, 'duel_win', v_duel.currency, v_winner_amount, p_duel_id, 'Duel prize'),
    ('00000005', 'fee', v_duel.currency, v_fee, p_duel_id, 'Duel fee');
END;
$$ LANGUAGE plpgsql;