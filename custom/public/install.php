<?php
/**
 * ALMESBAH — مثبّت لمرة واحدة (للاستضافة المشتركة بدون Terminal)
 * الاستخدام:  https://domain.com/install.php?token=TOKEN
 * ⚠️ غيّر التوكن قبل الرفع، واحذف الملف فور النجاح (بيحاول يحذف نفسه تلقائيًا).
 */
define('INSTALL_TOKEN', 'ALM-CHANGE-ME-2026');

header('Content-Type: text/html; charset=utf-8');
if (($_GET['token'] ?? '') !== INSTALL_TOKEN) {
    http_response_code(403);
    exit('Forbidden — token مطلوب.');
}

require __DIR__ . '/../vendor/autoload.php';
$app = require __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);

function step($kernel, string $cmd, array $params = []): void
{
    echo "<h3 style='font-family:monospace'>php artisan {$cmd}</h3><pre>";
    try {
        $code = $kernel->call($cmd, $params);
        echo htmlspecialchars($kernel->output()) . "\nexit code: {$code}";
    } catch (Throwable $e) {
        echo '⚠️ ' . htmlspecialchars($e->getMessage());
    }
    echo '</pre>';
}

echo '<body style="max-width:800px;margin:2rem auto;font-family:sans-serif">';
echo '<h1>ALMESBAH Installer</h1>';

if (empty(env('APP_KEY'))) {
    step($kernel, 'key:generate', ['--force' => true]);
}
step($kernel, 'migrate', ['--force' => true]);
step($kernel, 'db:seed', ['--force' => true]);
step($kernel, 'storage:link');
step($kernel, 'config:clear');
step($kernel, 'route:clear');

echo '<h2>✅ خلصنا</h2>';
echo '<p>افتح <a href="/en">/en</a> و <a href="/dashboard">/dashboard</a> (admin@almesbah-eg.com / password — <b>غيّر الباسورد فورًا</b>).</p>';

if (@unlink(__FILE__)) {
    echo '<p>🗑️ الملف حذف نفسه تلقائيًا.</p>';
} else {
    echo '<p style="color:#a00"><b>⚠️ احذف public/install.php يدويًا الآن.</b></p>';
}
echo '</body>';
