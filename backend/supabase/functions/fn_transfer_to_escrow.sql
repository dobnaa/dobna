-- backend/supabase/functions/fn_transfer_to_escrow.sql
CREATE OR REPLACE FUNCTION fn_transfer_to_escrow(
  p_user_id UUID,
  p_currency VARCHAR(10),
  p_amount DECIMAL(20,8),
  p_account VARCHAR(20),
  p_reference TEXT
) RETURNS VOID AS $$
BEGIN
  -- کسر از حساب کاربر
  UPDATE user_balances
  SET amount = amount - p_amount
  WHERE user_id = p_user_id AND currency = p_currency;

  -- واریز به حساب مرکزی (حساب سیستمی)
  INSERT INTO system_balances (account_number, currency, amount)
  VALUES (p_account, p_currency, p_amount)
  ON CONFLICT (account_number, currency)
  DO UPDATE SET amount = system_balances.amount + p_amount;

  -- ثبت تراکنش
  INSERT INTO transactions (user_id, type, currency, amount, reference_id, description)
  VALUES (p_user_id, 'escrow_deposit', p_currency, -p_amount, p_reference, 'Transfer to escrow');
END;
$$ LANGUAGE plpgsql;