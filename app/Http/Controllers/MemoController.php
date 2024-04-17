<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Memo;
use App\Models\User;
use App\Models\Tag;

class MemoController extends Controller
{
    public function index(Request $request)
    {
        if(Auth::check()){
            $memos = Memo::with('tags')->where('user_id', Auth::id())->get();
            $tags = User::find(Auth::id())->tags;
            return Inertia::render('Index', ['memos' => $memos, 'tags' => $tags]);
        }
        else{
            return redirect('entry');
        }
    }

    public function store(Request $request)
    {
        if(Auth::check()){
            Log::debug('store with login');
            
            $memo = Memo::create([
                'user_id' => Auth::id(),
                'title' => $request->title,
                'content' => $request->content,
                'pinned' => $request->pinned,
                'starred' => $request->starred,
            ]);
            $tags = collect($request->tags)->pluck('id')->filter()->unique();
            $memo->tags()->sync($tags);
        }
        else{
            Log::debug('ログイン認証されていない');
        }
    }

    public function update(Request $request)
    {
        if(Auth::check()){
            if(Memo::where('id', $request->id)->where('user_id', Auth::id())->exists()){
                Log::debug($request);
                //TODO: ProfileController.phpを参考に、validated()を使って、ここの処理を簡易化できそう
                $memo = Memo::find($request->id);
                $memo->title = $request->title;
                $memo->content = $request->content;
                $memo->pinned = $request->pinned;
                $memo->starred = $request->starred;
                $memo->save();
                $tags = collect($request->tags)->pluck('id')->filter()->unique();
                $memo->tags()->sync($tags);
            }
            else{
                Log::debug('メモが見つからない、またはユーザ所有のメモではない');
            }
        }
        else{
            Log::debug('ログイン認証されていない');
        }
    }

    public function destroy(Request $request)
    {
        if(Auth::check()){
            if(Memo::where('id', $request->id)->where('user_id', Auth::id())->exists()){
                Log::debug($request);
                Memo::find($request->id)->delete();
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
