<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Memo;
use App\Models\Notebook;
use App\Models\User;
use App\Models\Tag;

class MemoController extends Controller{

    public function index(Request $request){
        if(Auth::check()){
            $memos = Memo::with('tags')->with('notebook')->where('user_id', Auth::id())->orderBy('updated_at', 'desc')->get();
            $trashMemos = Memo::with('tags')->with('notebook')->onlyTrashed()->where('user_id', Auth::id())->orderBy('updated_at', 'desc')->get();
            $notebooks = Notebook::with('memos')->where('user_id', Auth::id())->get();
            $tags = Tag::with('memos')->where('user_id', Auth::id())->get();
            return Inertia::render('App', ['memos' => $memos, 'trashMemos' => $trashMemos, 'notebooks' => $notebooks, 'tags' => $tags]);
        }
        else{
            return redirect('entry');
        }
    }

    public function store(Request $request){
        if(Auth::check()){
            $memo = Memo::create([
                'user_id' => Auth::id(),
                'notebook_id' => $request->notebook_id,
                'title' => $request->title,
                'content' => $request->content,
                'starred' => $request->starred,
            ]);
            $tags = collect($request->tags)->pluck('id');
            $memo->tags()->sync($tags);
            $memo = Memo::with('notebook')->with('tags')->find($memo->id);
            $allMemos = Memo::with('notebook')->with('tags')->where('user_id', Auth::id())->orderBy('updated_at', 'desc')->get();
            $allNotebooks = Notebook::with('memos')->where('user_id', Auth::id())->get();
            $allTags = Tag::with('memos')->where('user_id', Auth::id())->get();
            return ['selectedMemo' => $memo, 'allMemos' => $allMemos, 'allNotebooks' => $allNotebooks, 'allTags' => $allTags];
        }
        else{
            Log::debug('ログイン認証されていない');
        }
    }

    public function update(Request $request){
        if(Auth::check()){
            if(Memo::where('id', $request->id)->where('user_id', Auth::id())->exists()){
                //TODO: ProfileController.phpを参考に、validated()を使って、ここの処理を簡易化できそう
                $memo = Memo::find($request->id);
                $memo->notebook_id = $request->notebook_id;
                $memo->title = $request->title;
                $memo->content = $request->content;
                $memo->starred = $request->starred;
                $memo->save();

                $tags = collect($request->tags)->pluck('id');
                $memo->tags()->sync($tags);
                $memo = Memo::with('notebook')->with('tags')->find($memo->id);
                $allMemos = Memo::with('notebook')->with('tags')->where('user_id', Auth::id())->orderBy('updated_at', 'desc')->get();
                $allNotebooks = Notebook::with('memos')->where('user_id', Auth::id())->get();
                $allTags = Tag::with('memos')->where('user_id', Auth::id())->get();
                return ['selectedMemo' => $memo, 'allMemos' => $allMemos, 'allNotebooks' => $allNotebooks, 'allTags' => $allTags];
            }
            else{
                Log::debug('メモが見つからない、またはユーザ所有のメモではない');
            }
        }
        else{
            Log::debug('ログイン認証されていない');
        }
    }

    public function destroy($memo_id){
        if(Auth::check()){
            if(Memo::where('id', $memo_id)->where('user_id', Auth::id())->exists()){
                Memo::find($memo_id)->delete();
                $allMemos = Memo::with('notebook')->with('tags')->where('user_id', Auth::id())->orderBy('updated_at', 'desc')->get();
                $trashMemos = Memo::with('tags')->with('notebook')->onlyTrashed()->where('user_id', Auth::id())->orderBy('updated_at', 'desc')->get();
                $allNotebooks = Notebook::with('memos')->where('user_id', Auth::id())->get();
                $allTags = Tag::with('memos')->where('user_id', Auth::id())->get();
                return ['allMemos' => $allMemos, 'trashMemos' => $trashMemos, 'allNotebooks' => $allNotebooks, 'allTags' => $allTags];
            }
            else{
                Log::debug('メモが見つからない、またはユーザ所有のメモではない');
            }
        }
        else{
            Log::debug('ログイン認証されていない');
        }
    }

    public function restore($memo_id){
        if(Auth::check()){
            if(Memo::withTrashed()->where('id', $memo_id)->where('user_id', Auth::id())->exists()){
                Memo::withTrashed()->where('id', $memo_id)->restore();
                $allMemos = Memo::with('notebook')->with('tags')->where('user_id', Auth::id())->orderBy('updated_at', 'desc')->get();
                $trashMemos = Memo::with('tags')->with('notebook')->onlyTrashed()->where('user_id', Auth::id())->orderBy('updated_at', 'desc')->get();
                $allNotebooks = Notebook::with('memos')->where('user_id', Auth::id())->get();
                $allTags = Tag::with('memos')->where('user_id', Auth::id())->get();
                return ['allMemos' => $allMemos, 'trashMemos' => $trashMemos, 'allNotebooks' => $allNotebooks, 'allTags' => $allTags];
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
