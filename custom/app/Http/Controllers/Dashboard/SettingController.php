<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
        return Setting::asArray();
    }

    public function update(Request $request)
    {
        Setting::put($request->validate([
            'phone' => 'nullable|string', 'whatsapp' => 'nullable|string',
            'wechat_url' => 'nullable|string', 'wechat_qr' => 'nullable|string',
            'phone2' => 'nullable|string', 'whatsapp2' => 'nullable|string',
            'wechat_url2' => 'nullable|string', 'wechat_qr2' => 'nullable|string',
            'email' => 'nullable|email', 'inquiry_email' => 'nullable|email',
            'address_en' => 'nullable|string', 'china_office' => 'nullable|string',
            'map_url' => 'nullable|string',
            'founded' => 'nullable|string', 'linkedin' => 'nullable|string',
        ]));
        return Setting::asArray();
    }
}
