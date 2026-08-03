<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}"
      dir="{{ in_array(app()->getLocale(), config('localization.rtl')) ? 'rtl' : 'ltr' }}">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    @php($seo = $page['props']['seo'] ?? [])
    <title inertia>{{ $seo['title'] ?? 'ALMESBAH — Egyptian Flax Fiber' }}</title>
    <meta name="description" content="{{ $seo['description'] ?? '' }}" />
    {{-- Forest green, not the old brown: colours the chrome in browsers and chat apps. --}}
    <meta name="theme-color" content="#1f3a2c" />
    {{-- Server-rendered OG: link previews (WhatsApp/Facebook) don't execute JS.
         Bump ?v= whenever og.png changes — WhatsApp caches previews hard. --}}
    @php($ogImage = url('/images/og.png') . '?v=3')
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="ALMESBAH" />
    <meta property="og:title" content="{{ $seo['title'] ?? 'ALMESBAH — Egyptian Flax Fiber' }}" />
    <meta property="og:description" content="{{ $seo['description'] ?? '' }}" />
    <meta property="og:image" content="{{ $ogImage }}" />
    <meta property="og:image:secure_url" content="{{ $ogImage }}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="ALMESBAH — Egyptian flax fiber, straight from the mill." />
    <meta property="og:url" content="{{ url()->current() }}" />
    <meta property="og:locale" content="{{ app()->getLocale() === 'zh' ? 'zh_CN' : 'en_US' }}" />
    @foreach (array_diff(config('localization.supported', []), [app()->getLocale()]) as $alt)
        <meta property="og:locale:alternate" content="{{ $alt === 'zh' ? 'zh_CN' : 'en_US' }}" />
    @endforeach
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{{ $seo['title'] ?? 'ALMESBAH — Egyptian Flax Fiber' }}" />
    <meta name="twitter:description" content="{{ $seo['description'] ?? '' }}" />
    <meta name="twitter:image" content="{{ $ogImage }}" />
    <link rel="canonical" href="{{ url()->current() }}" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    @inertiaHead
</head>
<body>
    @inertia
</body>
</html>
