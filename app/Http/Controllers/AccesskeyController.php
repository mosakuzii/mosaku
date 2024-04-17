<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Auth;
use Illuminate\Support\Route;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Accesskey;

class AccesskeyController extends Controller
{
    public function entry(): Response
    {
        //TODO: Accesskeyデバッグ用: /entryでリロードしたら全てのregisteringをentryに戻す
        Accesskey::where('registration_status', 'registering')->update(['registration_status'=>'entry']);
        return Inertia::render('Auth/Entry', ['status' => session('status')]);
    }

    public function verifyAccessKey(Request $request): RedirectResponse
    {
        if(Accesskey::where('registration_status', 'entry')
            ->where('access_key', $request['accesskey'])
            ->where('expiration_date', '>', date('Y-m-d H:i:s'))
            ->count() > 0){
            Accesskey::where('access_key', $request['accesskey'])->update(['registration_status'=>'registering']);
            return redirect('register')->with('accesskey', $request['accesskey']);
        }
        else{
            return redirect('entry');
        }
    }
}
