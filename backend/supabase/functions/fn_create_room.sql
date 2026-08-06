-- ======================================================
-- fn_create_room.sql
-- ایجاد اتاق جدید در یک سطح تالار گروه
-- ======================================================

CREATE OR REPLACE FUNCTION public.fn_create_room(
    p_community_id BIGINT,
    p_level INTEGER,
    p_card_price DECIMAL(20,8),
    p_currency VARCHAR(10)
)
RETURNS BIGINT AS $$
DECLARE
    v_room_id BIGINT;
BEGIN
    INSERT INTO public.rooms (
        community_id,
        level,
        card_price,
        currency,
        status,
        created_at
    ) VALUES (
        p_community_id,
        p_level,
        p_card_price,
        p_currency,
        'waiting',
        NOW()
    ) RETURNING id INTO v_room_id;

    RETURN v_room_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.fn_create_room IS '
ایجاد اتاق جدید در یک سطح تالار گروه.
ورودی‌ها:
- p_community_id: شناسه گروه
- p_level: سطح تالار (۱ تا ۴)
- p_card_price: قیمت هر کارت
- p_currency: ارز اتاق

خروجی: شناسه اتاق جدید
';