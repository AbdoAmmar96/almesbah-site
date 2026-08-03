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
            // Two lines, and each one carries WhatsApp *and* its own WeChat account —
            // so the QR and add-friend link are per line, not shared.
            'phone'         => '+20 109 098 9083',
            'whatsapp'      => '201090989083',
            'wechat_url'    => 'https://u.wechat.com/kPWQSr5Jdb-6UZh2N0WNnkg?s=2',
            'wechat_qr'     => '/images/wechat-qr-1.png',

            'phone2'        => '+20 120 295 9833',
            'whatsapp2'     => '201202959833',
            'wechat_url2'   => 'https://u.wechat.com/EC_8iSbQ7eP8A8est7ay9HU?s=4',
            'wechat_qr2'    => '/images/wechat-qr-2.png',

            'address_en'    => 'Shubramillis, Zefta, Gharbia, Egypt',
            'china_office'  => 'Guangzhou & Hebei, China',
            // Fixed from the old site: map used to point at a Cairo mall.
            'map_url'       => 'https://maps.google.com/?q=Shubramillis,+Zefta,+Gharbia,+Egypt',
            'founded'       => '',   // TODO: fill from client
            'linkedin'      => '',
        ]);
    }
}
