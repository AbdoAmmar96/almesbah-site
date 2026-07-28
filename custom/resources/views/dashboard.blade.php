<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <title>ALMESBAH — Dashboard</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    @viteReactRefresh
    @vite(['resources/css/dashboard.css', 'resources/js/dashboard/main.tsx'])
</head>
<body>
    <div id="dash-root"></div>
</body>
</html>
