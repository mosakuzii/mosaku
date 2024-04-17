<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Accesskey;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    // public function create(Request $request): Response
    public function create(Request $request)
    {
        $accesskey = $request->session()->get('accesskey');
        if(Accesskey::where('access_key', $accesskey)
            ->where('expiration_date', '>', date('Y-m-d H:i:s'))
            ->count() > 0){
            return Inertia::render('Auth/Register', ['accesskey' => $request->session()->get('accesskey')]);
        }
        else{
            return redirect('entry');
        }
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        Accesskey::where('access_key', $request['access_key']['accesskey'])
            ->update(['registration_status'=>'completed', 'user_id'=>$user->id]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('index', absolute: false));
    }
}
