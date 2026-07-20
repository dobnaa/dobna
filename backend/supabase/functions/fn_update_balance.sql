-- به‌روزرسانی موجودی کاربر در یک ارز خاص
CREATE OR REPLACE FUNCTION fn_update_balance(
    p_user_id UUID,
    p_currency VARCHAR(10),
    p_amount DECIMAL(20,8),
    p_type VARCHAR(10) -- 'add' or 'subtract'
)
RETURNS VOID AS $$
BEGIN
    IF p_type = 'add' THEN
        UPDATE public.user_balances
        SET amount = amount + p_amount
        WHERE user_id = p_user_id AND currency = p_currency;
    ELSIF p_type = 'subtract' THEN
        UPDATE public.user_balances
        SET amount = amount - p_amount
        WHERE user_id = p_user_id AND currency = p_currency;
    ELSE
        RAISE EXCEPTION 'نوع نامعتبر است (فقط add یا subtract)';
    END IF;
END;
$$ LANGUAGE plpgsql;