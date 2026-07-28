<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Product;

class SeoController extends Controller
{
    // Clean robots.txt — every legitimate bot welcome, Baiduspider included.
    public function robots()
    {
        $lines = [
            'User-agent: *',
            'Allow: /',
            'Disallow: /dashboard',
            '',
            'Sitemap: ' . url('/sitemap.xml'),
        ];
        return response(implode("\n", $lines), 200, ['Content-Type' => 'text/plain']);
    }

    public function sitemap()
    {
        $urls = [];
        foreach (config('localization.supported') as $locale) {
            foreach (['', '/about', '/products', '/industries', '/export', '/gallery', '/blog', '/certifications', '/contact'] as $path) {
                $urls[] = ['loc' => url("/$locale$path"), 'priority' => $path === '' ? '1.0' : '0.7'];
            }
            foreach (Product::published()->with('translations')->get() as $p) {
                $urls[] = ['loc' => url("/$locale/products/" . $p->tr($locale)->slug), 'priority' => '0.9'];
            }
            foreach (Article::published()->with('translations')->get() as $a) {
                $urls[] = ['loc' => url("/$locale/blog/" . $a->tr($locale)->slug), 'priority' => '0.8'];
            }
        }

        $xml = '<?xml version="1.0" encoding="UTF-8"?>'
            . '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
        foreach ($urls as $u) {
            $xml .= "<url><loc>{$u['loc']}</loc><priority>{$u['priority']}</priority></url>";
        }
        $xml .= '</urlset>';

        return response($xml, 200, ['Content-Type' => 'application/xml']);
    }
}
