<?php

namespace App\Http\Controllers;

/**
 * Rescue layer for the old hacked WordPress site:
 *  - Real legacy pages  → 301 to their new home (SEO equity preserved)
 *  - Injected spam junk → handled globally: bootstrap/app.php returns 410 Gone
 *    for any path containing "casino" (see README, "Spam cleanup").
 */
class LegacyRedirectController extends Controller
{
    private const MAP = [
        'about-us'    => '/en/about',
        'our-products'=> '/en/products',
        'gallery'     => '/en/gallery',
        'contact-us'  => '/en/contact',
        'flax-fibers' => '/en/products/cottonised-flax',
        'producti76'  => '/en/products/flax-spools-on-bobbin',
        'producti77'  => '/en/products/flax-twines',
        'producti78'  => '/en/products/scutched-flax',
        'producti79'  => '/en/products/hackled-flax',
        'producti80'  => '/en/products/hackled-flax-in-dolls',
        'producti81'  => '/en/products/plumbing-flax-fibres',
    ];

    public function handle(string $legacy)
    {
        if ($legacy === 'hello-world') {
            abort(410);
        }
        return redirect(self::MAP[$legacy] ?? '/en', 301);
    }
}
