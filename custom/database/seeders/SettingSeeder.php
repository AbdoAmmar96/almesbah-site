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
            // Both lines below carry WhatsApp *and* WeChat.
            'phone'         => '+20 109 098 9083',
            'phone2'        => '+20 120 295 9833',
            'whatsapp'      => '201090989083',
            'whatsapp2'     => '201202959833',
            'address_en'    => 'Shubramillis, Zefta, Gharbia, Egypt',
            'china_office'  => 'Guangzhou & Hebei, China',
            // Fixed from the old site: map used to point at a Cairo mall.
            'map_url'       => 'https://maps.google.com/?q=Shubramillis,+Zefta,+Gharbia,+Egypt',
            // WeChat is deliberately on the *other* line from the WhatsApp float.
            'wechat_id'     => '+20 120 295 9833',
            'wechat_url'    => 'https://u.wechat.com/EC_8iSbQ7eP8A8est7ay9HU?s=4',
            'wechat_qr'     => '/images/wechat-qr.png',
            'founded'       => '',   // TODO: fill from client
            'linkedin'      => '',
        ]);
    }
}
