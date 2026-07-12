// compress-images.js
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// مسیر پوشه Assets
const assetsPath = path.join(__dirname, 'assets', 'images', 'notes');

// تنظیمات فشرده‌سازی
const config = {
    width: 400,          // عرض مناسب برای موبایل و وب
    quality: 80,         // کیفیت ۸۰٪ (تعادل بین حجم و کیفیت)
    format: 'webp',      // فرمت WebP (بهترین برای وب)
};

// پوشه‌هایی که باید پردازش شوند (همه ارزها)
const currencies = ['BTC', 'ETH', 'USDT', 'SOL', 'BNB', 'DOGE', 'TON', 'BONK', 'PEPE', 'HMSTR'];
const fiatCurrencies = ['USD', 'IRT', 'EUR', 'TRY', 'GBP', 'AED', 'CNY', 'INR', 'CAD', 'CHF', 'AUD'];

async function compressImages() {
    console.log('🔄 شروع فشرده‌سازی تصاویر...');
    
    // پردازش رمزارزها
    for (const currency of currencies) {
        const dirPath = path.join(assetsPath, 'crypto', currency);
        await processDirectory(dirPath);
    }
    
    // پردازش فیات‌ها
    for (const currency of fiatCurrencies) {
        const dirPath = path.join(assetsPath, 'fiat', currency);
        await processDirectory(dirPath);
    }
    
    console.log('✅ فشرده‌سازی با موفقیت انجام شد!');
}

async function processDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
        console.log(`⚠️ پوشه پیدا نشد: ${dirPath}`);
        return;
    }
    
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const ext = path.extname(file).toLowerCase();
        
        // فقط فایل‌های تصویری را پردازش کن
        if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;
        
        const fileName = path.basename(file, ext);
        const outputPath = path.join(dirPath, `${fileName}.webp`);
        
        try {
            await sharp(filePath)
                .resize(config.width, null, { withoutEnlargement: true })
                .webp({ quality: config.quality })
                .toFile(outputPath);
            
            // حذف فایل اصلی (اختیاری - اگر می‌خواهید PNG اصلی را نگه دارید، این خط را کامنت کنید)
            // fs.unlinkSync(filePath);
            
            const stats = fs.statSync(outputPath);
            console.log(`✅ فشرده شد: ${fileName} → ${(stats.size / 1024).toFixed(1)} KB`);
        } catch (error) {
            console.error(`❌ خطا در فشرده‌سازی ${filePath}:`, error.message);
        }
    }
}

// اجرا
compressImages();