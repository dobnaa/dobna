-- پرداخت پاداش دعوت
CREATE OR REPLACE FUNCTION fn_process_referral_reward(
    p_invitee_id UUID,
    p_amount DECIMAL(20,8),
    p_currency VARCHAR(10)
)
RETURNS VOID AS $$
DECLARE
    v_inviter_id UUID;
    v_reward DECIMAL(20,8);
BEGIN
    SELECT referred_by INTO v_inviter_id
    FROM public.profiles
    WHERE id = p_invitee_id;

    IF v_inviter_id IS NOT NULL THEN
        v_reward := p_amount * 0.10; -- ۱۰٪ پاداش
        
        UPDATE public.user_balances
        SET amount = amount + v_reward
        WHERE user_id = v_inviter_id AND currency = p_currency;
        
        UPDATE public.profiles
        SET total_referrals = total_referrals + 1,
            total_commission = total_commission + v_reward
        WHERE id = v_inviter_id;
    END IF;
END;
$$ LANGUAGE plpgsql;