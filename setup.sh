#!/usr/bin/env bash
# ALMESBAH — Laravel 12 + Inertia + React scaffold
# Usage: ./setup.sh  (then copy the custom files over the fresh app)
set -e
APP=almesbah
composer create-project laravel/laravel:^12.0 $APP
cd $APP
composer require inertiajs/inertia-laravel:^1.0
php artisan inertia:middleware
rm -f vite.config.js   # our vite.config.ts must win
rm -f public/robots.txt # served statically, would shadow our SEO route
# Versions are pinned: the app targets React 18 + Inertia client v1 (matches
# inertia-laravel ^1.0 above). Unpinned installs pull React 19 / Inertia v3,
# whose protocol mismatch renders every page blank.
npm install react@^18.3.1 react-dom@^18.3.1 @inertiajs/react@^1.3.0 react-router-dom@^7
npm install -D @vitejs/plugin-react@^5 typescript @types/react@^18.3.12 @types/react-dom@^18.3.1
npm install @fontsource/fraunces @fontsource/karla
echo ""
echo "==> Base app ready. Now copy the contents of ../custom/ into $APP/ (overwrite),"
echo "    put your product images in public/images/products/, then:"
echo "    php artisan storage:link && php artisan migrate --seed && npm run build"
echo "    Admin login: admin@almesbah-eg.com / password (change in production!)"
