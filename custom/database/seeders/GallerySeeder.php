<?php

namespace Database\Seeders;

use App\Models\GalleryItem;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['/images/factory.jpg',                        'Inside the mill — Shubrameles, Gharbia'],
            ['/images/products/hackled-flax.jpg',          'Hackled line fiber, spinning-ready'],
            ['/images/products/scutched-flax.jpg',         'Scutched flax off the turbine'],
            ['/images/products/hackled-flax-in-dolls.jpg', 'Plumbing dolls — Jokia put-up'],
            ['/images/products/flax-twines.jpg',           'Twine balls, packed to order'],
            ['/images/products/rescutched-tow-arrous.jpg', 'Arrous bales awaiting loading'],
        ];
        foreach ($items as $i => [$image, $caption]) {
            GalleryItem::updateOrCreate(
                ['image' => $image],
                ['caption' => $caption, 'album' => 'factory', 'sort' => $i]
            );
        }
    }
}
