<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use Illuminate\Http\Request;

class InquiryController extends Controller
{
    public function index(Request $request)
    {
        return Inquiry::when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->latest()->paginate(30);
    }

    public function update(Request $request, Inquiry $inquiry)
    {
        $inquiry->update($request->validate(['status' => 'required|in:new,replied,closed']));
        return $inquiry;
    }
}
