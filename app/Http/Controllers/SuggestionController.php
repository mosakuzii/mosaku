<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Models\Suggestion;
use App\Models\User;
use App\Mail\MosakuSuggestion;

class SuggestionController extends Controller
{
    public function post(Request $request)
    {
        if(Auth::check()){
            $suggestion = Suggestion::create([
                'user_id' => Auth::id(),
                'title' => $request->suggestion_title,
                'content' => $request->suggestion_content,
            ]);
            Mail::to('mosaku.contact@gmail.com')
            ->send(new MosakuSuggestion(
                Auth::user()->name,
                $request->suggestion_title,
                $request->suggestion_content));
        }
        else{
            Log::debug('ログイン認証されてない');
        }
    }
}
