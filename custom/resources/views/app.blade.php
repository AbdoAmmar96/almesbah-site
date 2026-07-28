<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}"
      dir="{{ in_array(app()->getLocale(), config('localization.rtl')) ? 'rtl' : 'ltr' }}">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    @php($seo = $page['props']['seo'] ?? [])
    <title inertia>{{ $seo['title'] ?? 'ALMESBAH — Egyptian Flax Fiber' }}</title>
    <meta name="description" content="{{ $seo['description'] ?? '' }}" />
    {{-- Server-rendered OG: link previews (WhatsApp/Facebook) don't execute JS --}}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="ALMESBAH" />
    <meta property="og:title" content="{{ $seo['title'] ?? 'ALMESBAH — Egyptian Flax Fiber' }}" />
    <meta property="og:description" content="{{ $seo['description'] ?? '' }}" />
    <meta property="og:image" content="{{ url('/images/og.png') }}" />
    <meta property="og:url" content="{{ url()->current() }}" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="canonical" href="{{ url()->current() }}" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    @inertiaHead
</head>
<body>
    @inertia
</body>
</html>
