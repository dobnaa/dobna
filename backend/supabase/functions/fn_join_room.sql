-- پیوستن کاربر به اتاق (همان خرید کارت)
CREATE OR REPLACE FUNCTION fn_join_room(
    p_room_id BIGINT,
    p_user_id UUID,
    p_card_number INTEGER
)
RETURNS VOID AS $$
BEGIN
    PERFORM fn_purchase_card(p_room_id, p_user_id, p_card_number);
END;
$$ LANGUAGE plpgsql;