<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@almesbah-eg.com'],
            ['name' => 'ALMESBAH Admin', 'password' => Hash::make('password'), 'is_admin' => true]
        );

        $this->call([
            SettingSeeder::class,
            SeoMetaSeeder::class,
            ProductSeeder::class,
            ArticleSeeder::class,
            GallerySeeder::class,
            ZhContentSeeder::class,
        ]);
    }
}
