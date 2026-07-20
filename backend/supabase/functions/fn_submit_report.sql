-- ثبت گزارش تخلف
CREATE OR REPLACE FUNCTION fn_submit_report(
    p_reporter_id UUID,
    p_reported_id UUID,
    p_type VARCHAR(30),
    p_reason TEXT,
    p_community_id BIGINT DEFAULT NULL
)
RETURNS BIGINT AS $$
DECLARE
    v_report_id BIGINT;
BEGIN
    INSERT INTO public.reports (
        reporter_id, reported_id, community_id, type, reason, created_at
    ) VALUES (
        p_reporter_id, p_reported_id, p_community_id, p_type, p_reason, NOW()
    ) RETURNING id INTO v_report_id;

    RETURN v_report_id;
END;
$$ LANGUAGE plpgsql;