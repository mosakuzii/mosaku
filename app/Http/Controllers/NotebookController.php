<?php

namespace App\Http\Controllers;

use App\Models\Notebook;
use App\Models\Memo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class NotebookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if(Auth::check()){
            Notebook::create([
                'user_id' => Auth::id(),
                'theme_id' => $request->theme_id,
                'title' => $request->title,
                'starred' => $request->starred,
            ]);
            $allNotebooks = Notebook::with('memos')->where('user_id', Auth::id())->get();
            return ['allNotebooks' => $allNotebooks];
        }
        else{
            Log::debug('ログイン認証されていない');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Notebook $notebook)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        if(Auth::check()){
            if(Notebook::where('id', $request->id)->where('user_id', Auth::id())->exists()){
                $notebook = Notebook::find($request->id);
                $notebook->theme_id = $request->theme_id;
                $notebook->title = $request->title;
                $notebook->starred = $request->starred;
                $notebook->save();
                $allNotebooks = Notebook::with('memos')->where('user_id', Auth::id())->get();
                return ['allNotebooks' => $allNotebooks];
            }
            else{
                Log::debug('ノートブックが見つからない、またはユーザ所有のメモではない');
            }
        }
        else{
            Log::debug('ログイン認証されていない');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($notebook_id)
    {
        if(Auth::check()){
            if(Notebook::where('id', $notebook_id)->where('user_id', Auth::id())->exists()){
                Notebook::find($notebook_id)->delete();
                Memo::where('notebook_id', $notebook_id)->update(['notebook_id' => null]);
                $allMemos = Memo::with('notebook')->with('tags')->where('user_id', Auth::id())->orderBy('updated_at', 'desc')->get();
                $allNotebooks = Notebook::with('memos')->where('user_id', Auth::id())->get();
                return ['allMemos' => $allMemos, 'allNotebooks' => $allNotebooks];
            }
            else{
                Log::debug('ノートブックが見つからない、またはユーザ所有のメモではない');
            }
        }
        else{
            Log::debug('ログイン認証されていない');
        }
    }
}
