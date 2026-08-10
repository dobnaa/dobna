-- ======================================================
-- fn_get_or_create_deposit_address.sql
-- دریافت یا ایجاد آدرس واریز برای کاربر
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_get_or_create_deposit_address(
    p_user_id UUID,
    p_currency VARCHAR(10),
    p_network VARCHAR(30),
    p_address VARCHAR(255) DEFAULT NULL,
    p_contract_address VARCHAR(255) DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
    v_existing RECORD;
BEGIN
    -- بررسی وجود آدرس فعال
    SELECT * INTO v_existing
    FROM public.deposit_addresses
    WHERE user_id = p_user_id
      AND currency = UPPER(p_currency)
      AND network = p_network
      AND is_active = TRUE
    LIMIT 1;

    IF FOUND THEN
        RETURN jsonb_build_object(
            'success', TRUE,
            'address', v_existing.address,
            'contract_address', v_existing.contract_address,
            'existing', TRUE
        );
    END IF;

    -- اگر آدرس جدید ارائه نشده باشد، خطا
    IF p_address IS NULL THEN
        RETURN jsonb_build_object('success', FALSE, 'error', 'ADDRESS_NOT_PROVIDED');
    END IF;

    -- ذخیره آدرس جدید
    INSERT INTO public.deposit_addresses (
        user_id,
        currency,
        network,
        address,
        contract_address,
        is_active
    ) VALUES (
        p_user_id,
        UPPER(p_currency),
        p_network,
        p_address,
        p_contract_address,
        TRUE
    );

    RETURN jsonb_build_object(
        'success', TRUE,
        'address', p_address,
        'contract_address', p_contract_address,
        'existing', FALSE
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.fn_get_or_create_deposit_address IS '
دریافت یا ایجاد آدرس واریز برای کاربر.
آدرس باید توسط Edge Function و سرویس custody تولید شده باشد.
خطاها: ADDRESS_NOT_PROVIDED
';