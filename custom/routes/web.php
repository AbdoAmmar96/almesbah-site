<?php

use App\Http\Controllers\Dashboard as Dash;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\LegacyRedirectController;
use App\Http\Controllers\SeoController;
use App\Http\Controllers\SiteController;
use Illuminate\Support\Facades\Route;

// ---------- SEO plumbing ----------
Route::get('/robots.txt', [SeoController::class, 'robots']);
Route::get('/sitemap.xml', [SeoController::class, 'sitemap']);

// Old WordPress URLs → 301 to the new structure. Casino spam → 410 Gone.
Route::get('/{legacy}', [LegacyRedirectController::class, 'handle'])
    ->where('legacy', '(about-us|our-products|gallery|contact-us|flax-fibers|producti7[6-9]|producti8[01]|hello-world)');

// Root → default locale
Route::redirect('/', '/en', 301);

// ---------- Public site (locale-prefixed, ready for zh / ar) ----------
Route::prefix('{locale}')
    ->whereIn('locale', config('localization.supported'))
    ->middleware(['web', \App\Http\Middleware\SetLocale::class])
    ->group(function () {
        Route::get('/', [SiteController::class, 'home'])->name('home');
        Route::get('/about', [SiteController::class, 'about'])->name('about');
        Route::get('/products', [SiteController::class, 'products'])->name('products');
        Route::get('/products/{slug}', [SiteController::class, 'product'])->name('product');
        Route::get('/industries', [SiteController::class, 'industries'])->name('industries');
        Route::get('/export', [SiteController::class, 'export'])->name('export');
        Route::get('/gallery', [SiteController::class, 'gallery'])->name('gallery');
        Route::get('/blog', [SiteController::class, 'blog'])->name('blog');
        Route::get('/blog/{slug}', [SiteController::class, 'article'])->name('article');
        Route::get('/certifications', [SiteController::class, 'certifications'])->name('certifications');
        Route::get('/contact', [SiteController::class, 'contact'])->name('contact');
        Route::post('/contact', [InquiryController::class, 'store'])->name('inquiry.store');
    });

// ---------- Custom React dashboard ----------
Route::prefix('dashboard')->group(function () {
    Route::post('/login', [Dash\AuthController::class, 'login']);
    Route::post('/logout', [Dash\AuthController::class, 'logout']);

    Route::middleware('auth')->prefix('api')->group(function () {
        Route::get('/me', [Dash\AuthController::class, 'me']);
        Route::get('/stats', [Dash\StatsController::class, 'index']);
        Route::apiResource('/products', Dash\ProductController::class);
        Route::apiResource('/articles', Dash\ArticleController::class);
        Route::get('/inquiries', [Dash\InquiryController::class, 'index']);
        Route::patch('/inquiries/{inquiry}', [Dash\InquiryController::class, 'update']);
        Route::apiResource('/gallery', Dash\GalleryController::class)->only(['index', 'store', 'destroy']);
        Route::get('/settings', [Dash\SettingController::class, 'index']);
        Route::put('/settings', [Dash\SettingController::class, 'update']);
        Route::get('/seo', [Dash\SeoMetaController::class, 'index']);
        Route::put('/seo/{seoMeta}', [Dash\SeoMetaController::class, 'update']);
        Route::post('/upload', [Dash\UploadController::class, 'store']);
        Route::apiResource('/users', Dash\UserController::class)->except(['show']);
    });

    // SPA catch-all (login screen handles guests client-side)
    Route::get('/{any?}', fn () => view('dashboard'))->where('any', '.*');
});
