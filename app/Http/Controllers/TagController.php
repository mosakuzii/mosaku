<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Tag;

class TagController extends Controller
{
    public function store(Request $request)
    {
        if(Auth::check()){
            $tag = Tag::create([
                'user_id' => Auth::id(),
                'tag_name' => $request->tag_name,
                'tag_color' => $request->tag_color,
            ]);
            return User::find(Auth::id())->tags;
        }
        else{
            Log::debug('ログイン認証されていない');
        }
    }

    public function destroy($tag_id)
    {
        if(Auth::check()){
            if(Tag::where('id', $tag_id)->where('user_id', Auth::id())->exists()){
                Tag::find($tag_id)->delete();
                return User::find(Auth::id())->tags;
            }
            else{
                Log::debug('メモが見つからない、またはユーザ所有のメモではない');
            }
        }
        else{
            Log::debug('ログイン認証されていない');
        }
    }

    public function update($tag_id, Request $request)
    {
        if(Auth::check()){
            if(Tag::where('id', $tag_id)->where('user_id', Auth::id())->exists()){
                $tag = Tag::find($tag_id);
                $tag->tag_name = $request->tag_name;
                $tag->tag_color = $request->tag_color;
                $tag->save();
                return User::find(Auth::id())->tags;
            }
            else{
                Log::debug('メモが見つからない、またはユーザ所有のメモではない');
            }
        }
        else{
            Log::debug('ログイン認証されていない');
        }
    }
}
