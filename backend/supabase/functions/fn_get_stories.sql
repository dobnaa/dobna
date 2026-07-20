-- دریافت استوری‌های فعال (دوئل و چالش)
CREATE OR REPLACE FUNCTION fn_get_stories()
RETURNS TABLE(
    id BIGINT,
    type VARCHAR(20),
    creator_id UUID,
    creator_username VARCHAR,
    creator_avatar VARCHAR,
    level INTEGER,
    currency VARCHAR(10),
    amount DECIMAL(20,8),
    expires_at TIMESTAMPTZ,
    remaining_time INTEGER
) AS $$
BEGIN
    -- استوری‌های دوئل
    RETURN QUERY
    SELECT 
        d.id,
        'duel'::VARCHAR AS type,
        d.creator_id,
        p.username AS creator_username,
        p.avatar AS creator_avatar,
        d.level,
        d.currency,
        d.amount,
        d.expires_at,
        EXTRACT(EPOCH FROM (d.expires_at - NOW()))::INTEGER AS remaining_time
    FROM public.duels d
    JOIN public.profiles p ON p.id = d.creator_id
    WHERE d.status = 'waiting' AND d.expires_at > NOW()
    
    UNION ALL
    
    -- استوری‌های چالش
    SELECT 
        c.id,
        'challenge'::VARCHAR AS type,
        c.creator_id,
        p.username AS creator_username,
        p.avatar AS creator_avatar,
        c.level,
        c.currency,
        c.amount,
        c.expires_at,
        EXTRACT(EPOCH FROM (c.expires_at - NOW()))::INTEGER AS remaining_time
    FROM public.challenges c
    JOIN public.profiles p ON p.id = c.creator_id
    WHERE c.status = 'waiting' AND c.expires_at > NOW()
    
    ORDER BY remaining_time ASC;
END;
$$ LANGUAGE plpgsql;