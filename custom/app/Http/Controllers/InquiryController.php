<?php

namespace App\Http\Controllers;

use App\Models\Inquiry;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class InquiryController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'             => 'required|string|max:120',
            'company'          => 'nullable|string|max:160',
            'email'            => 'required|email|max:190',
            'phone'            => 'nullable|string|max:40',
            'country'          => 'nullable|string|max:80',
            'product_interest' => 'nullable|string|max:160',
            'message'          => 'required|string|max:4000',
            'website'          => 'prohibited', // honeypot
        ]);
        unset($data['website']);
        $data['locale'] = app()->getLocale();

        $inquiry = Inquiry::create($data);

        if ($to = Setting::get('inquiry_email')) {
            try {
                Mail::raw(
                    "New RFQ #{$inquiry->id}\nName: {$inquiry->name}\nCompany: {$inquiry->company}\n"
                    . "Email: {$inquiry->email}\nPhone: {$inquiry->phone}\nCountry: {$inquiry->country}\n"
                    . "Product: {$inquiry->product_interest}\n\n{$inquiry->message}",
                    fn ($m) => $m->to($to)->subject("RFQ — {$inquiry->name} ({$inquiry->product_interest})")
                );
            } catch (\Throwable) {
                // Mail failure must never lose the lead — it's already in the dashboard.
            }
        }

        return back()->with('success', true);
    }
}
