-- محاسبه و به‌روزرسانی رنک گروه بر اساس BMC و لاتاری
CREATE OR REPLACE FUNCTION fn_update_group_rank()
RETURNS VOID AS $$
DECLARE
    v_community RECORD;
    v_score DECIMAL(20,8);
BEGIN
    FOR v_community IN 
        SELECT id, bmc_amount, lottery_amount, currency
        FROM public.communities
        WHERE is_active = TRUE
    LOOP
        -- امتیاز = (BMC + لاتاری) × نرخ ارز به دلار
        SELECT price_usd INTO v_score
        FROM public.currencies
        WHERE code = v_community.currency;
        
        IF v_score IS NULL THEN
            v_score := 1;
        END IF;
        
        v_score := (v_community.bmc_amount + v_community.lottery_amount) * v_score;
        
        -- به‌روزرسانی رنک در جدول community_stats
        INSERT INTO public.community_stats (community_id, total_bmc, total_lottery, total_rank_score)
        VALUES (v_community.id, v_community.bmc_amount, v_community.lottery_amount, v_score)
        ON CONFLICT (community_id)
        DO UPDATE SET 
            total_bmc = EXCLUDED.total_bmc,
            total_lottery = EXCLUDED.total_lottery,
            total_rank_score = EXCLUDED.total_rank_score;
    END LOOP;

    -- به‌روزرسانی رنک بر اساس امتیاز
    WITH ranked AS (
        SELECT 
            community_id,
            ROW_NUMBER() OVER (ORDER BY total_rank_score DESC) AS rank_num
        FROM public.community_stats
    )
    UPDATE public.communities
    SET rank = ranked.rank_num
    FROM ranked
    WHERE communities.id = ranked.community_id;
END;
$$ LANGUAGE plpgsql;