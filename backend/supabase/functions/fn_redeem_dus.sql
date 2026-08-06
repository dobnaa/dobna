-- ======================================================
-- fn_redeem_dus.sql
-- تبدیل DUS به ارزهای دیگر دوبنا (ساده)
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_redeem_dus(
    p_user_id UUID,
    p_target_currency VARCHAR(10),
    p_dus_amount INTEGER
)
RETURNS JSONB AS $$
DECLARE
    v_current_balance INTEGER;
    v_rate DECIMAL(20,8);
    v_target_amount DECIMAL(20,8);
BEGIN
    -- ۱. بررسی موجودی
    SELECT dobna_points_balance INTO v_current_balance
    FROM public.profiles WHERE id = p_user_id;

    IF v_current_balance IS NULL OR v_current_balance < p_dus_amount THEN
        RETURN jsonb_build_object('success', false, 'error', 'INSUFFICIENT_DUS');
    END IF;

    -- ۲. نرخ تبدیل (۱ DUS = ۱ USD، سپس به ارز مقصد)
    IF UPPER(p_target_currency) = 'USD' THEN
        v_rate := 1;
        v_target_amount := p_dus_amount;
    ELSE
        SELECT price_usd INTO v_rate
        FROM public.currencies
        WHERE code = UPPER(p_target_currency);

        IF v_rate IS NULL OR v_rate <= 0 THEN
            RETURN jsonb_build_object('success', false, 'error', 'RATE_NOT_FOUND');
        END IF;

        v_target_amount := p_dus_amount / v_rate;
    END IF;

    -- ۳. کسر DUS
    UPDATE public.profiles
    SET dobna_points_balance = dobna_points_balance - p_dus_amount
    WHERE id = p_user_id;

    -- ۴. واریز به کیف پول
    INSERT INTO public.user_balances (user_id, currency, amount)
    VALUES (p_user_id, UPPER(p_target_currency), v_target_amount)
    ON CONFLICT (user_id, currency)
    DO UPDATE SET amount = public.user_balances.amount + EXCLUDED.amount;

    -- ۵. ثبت در دفتر
    INSERT INTO public.dobna_points_ledger (user_id, amount, reason, reference_id, balance_after)
    VALUES (
        p_user_id,
        -p_dus_amount,
        'dus_redemption',
        p_target_currency,
        (SELECT dobna_points_balance FROM public.profiles WHERE id = p_user_id)
    );

    -- ۶. خروجی
    RETURN jsonb_build_object(
        'success', true,
        'target_amount', v_target_amount,
        'target_currency', UPPER(p_target_currency)
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;