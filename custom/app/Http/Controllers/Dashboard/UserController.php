<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        abort_unless($request->user()->is_admin, 403);

        return User::orderBy('id')->get(['id', 'name', 'email', 'is_admin', 'created_at']);
    }

    public function store(Request $request)
    {
        abort_unless($request->user()->is_admin, 403);

        $data = $request->validate([
            'name'     => 'required|string|max:100',
            'email'    => 'required|email|max:190|unique:users,email',
            'password' => 'required|string|min:8',
            'is_admin' => 'boolean',
        ]);

        $user = User::create($data); // password hashed by the model's cast

        return response()->json($user->only('id', 'name', 'email', 'is_admin'), 201);
    }

    public function update(Request $request, User $user)
    {
        $actor  = $request->user();
        $isSelf = $actor->id === $user->id;

        if (! $actor->is_admin && ! $isSelf) {
            abort(403, 'You can only change your own password.');
        }

        // Changing your own password always requires the current one —
        // admin resets for OTHER accounts don't (that's the whole point).
        $rules = ['password' => 'required|string|min:8'];
        if ($isSelf) {
            $rules['current_password'] = 'required|current_password';
        }
        $data = $request->validate($rules);

        $user->update(['password' => $data['password']]);

        return response()->json(['ok' => true]);
    }

    public function destroy(Request $request, User $user)
    {
        abort_unless($request->user()->is_admin, 403);
        abort_if($user->id === $request->user()->id, 422, 'You cannot delete your own account.');

        $user->delete();

        return response()->json(['ok' => true]);
    }
}
