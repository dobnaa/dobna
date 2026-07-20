-- ======================================================
-- 30. SEED DATA: ALL SUPPORTED CURRENCIES
-- ======================================================
INSERT INTO public.currencies (code, name, name_fa, symbol, icon, type, decimal_places, network_list) VALUES
-- ===== CRYPTO =====
('BTC', 'Bitcoin', 'بیت‌کوین', '₿', 'bitcoin.svg', 'crypto', 8, ARRAY['BTC', 'Lightning']),
('ETH', 'Ethereum', 'اتریوم', '⟠', 'ethereum.svg', 'crypto', 8, ARRAY['ERC20']),
('USDT', 'Tether', 'تتر', '₮', 'usdt.svg', 'crypto', 2, ARRAY['BSC(BEP20)', 'TRC20', 'ERC20', 'Solana', 'TON']),
('SOL', 'Solana', 'سولانا', '◎', 'solana.svg', 'crypto', 8, ARRAY['Solana']),
('BNB', 'BNB', 'بایننس کوین', '◆', 'bnb.svg', 'crypto', 8, ARRAY['BSC(BEP20)']),
('DOGE', 'Dogecoin', 'دوج‌کوین', 'Ð', 'dogecoin.svg', 'crypto', 8, ARRAY['DOGE']),
('TON', 'Toncoin', 'تون‌کوین', '◆', 'toncoin.svg', 'crypto', 8, ARRAY['TON']),
('BONK', 'Bonk', 'بونک', '🐕', 'bonk.svg', 'crypto', 8, ARRAY['Solana']),
('PEPE', 'Pepe', 'پپه', '🐸', 'pepe.svg', 'crypto', 8, ARRAY['ERC20']),
('HMSTR', 'Hamster', 'همستر', '🐹', 'hmstr.svg', 'crypto', 8, ARRAY['TON']),
('USDC', 'USD Coin', 'یو اس دی سی', '💵', 'usdc.svg', 'crypto', 2, ARRAY['ERC20', 'Solana', 'BSC(BEP20)']),
('SUI', 'Sui', 'سویی', '✦', 'sui.svg', 'crypto', 8, ARRAY['Sui']),
-- ===== FIAT =====
('USD', 'US Dollar', 'دلار آمریکا', '$', 'usd.svg', 'fiat', 2, ARRAY[]),
('IRT', 'Iranian Toman', 'تومان ایران', '﷼', 'irt.svg', 'fiat', 0, ARRAY[]),
('EUR', 'Euro', 'یورو', '€', 'eur.svg', 'fiat', 2, ARRAY[]),
('TRY', 'Turkish Lira', 'لیر ترکیه', '₺', 'try.svg', 'fiat', 2, ARRAY[]),
('GBP', 'British Pound', 'پوند', '£', 'gbp.svg', 'fiat', 2, ARRAY[]),
('AED', 'UAE Dirham', 'درهم امارات', 'د.إ', 'aed.svg', 'fiat', 2, ARRAY[]),
('CNY', 'Chinese Yuan', 'یوان چین', '¥', 'cny.svg', 'fiat', 2, ARRAY[]),
('INR', 'Indian Rupee', 'روپیه هند', '₹', 'inr.svg', 'fiat', 2, ARRAY[]),
('CAD', 'Canadian Dollar', 'دلار کانادا', 'C$', 'cad.svg', 'fiat', 2, ARRAY[]),
('CHF', 'Swiss Franc', 'فرانک سوئیس', 'Fr', 'chf.svg', 'fiat', 2, ARRAY[]),
('AUD', 'Australian Dollar', 'دلار استرالیا', 'A$', 'aud.svg', 'fiat', 2, ARRAY[])
ON CONFLICT (code) DO NOTHING;

-- Update approximate prices
UPDATE public.currencies SET price_usd = 65000 WHERE code = 'BTC';
UPDATE public.currencies SET price_usd = 3500 WHERE code = 'ETH';
UPDATE public.currencies SET price_usd = 1 WHERE code = 'USDT';
UPDATE public.currencies SET price_usd = 150 WHERE code = 'SOL';
UPDATE public.currencies SET price_usd = 600 WHERE code = 'BNB';
UPDATE public.currencies SET price_usd = 0.15 WHERE code = 'DOGE';
UPDATE public.currencies SET price_usd = 5 WHERE code = 'TON';
UPDATE public.currencies SET price_usd = 1 WHERE code = 'USD';
UPDATE public.currencies SET price_usd = 0.000025 WHERE code = 'IRT';
UPDATE public.currencies SET price_usd = 1.08 WHERE code = 'EUR';