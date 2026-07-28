<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        Setting::put([
            // Fixed from the old site: header mailto pointed to a stranger's domain.
            'email'         => 'info@almesbah-eg.com',
            'inquiry_email' => 'info@almesbah-eg.com',
            'phone'         => '+20 109 098 9083',
            'whatsapp'      => '201090989083',
            'address_en'    => 'Shubrameles, Zefta, Gharbia, Egypt',
            'china_office'  => 'Guangzhou & Hebei, China',
            // Fixed from the old site: map used to point at a Cairo mall.
            'map_url'       => 'https://maps.google.com/?q=Shubrameles,+Zefta,+Gharbia,+Egypt',
            'wechat_id'     => '',   // TODO: fill from client (needed for zh launch)
            'founded'       => '',   // TODO: fill from client
            'linkedin'      => '',
        ]);
    }
}
