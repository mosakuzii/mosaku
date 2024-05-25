<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AccesskeyController;
use App\Http\Controllers\MemoController;
use App\Http\Controllers\NotebookController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\SuggestionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//メモCRUD
Route::get('/', [MemoController::class, 'index'])->name('index');
Route::post('/memo/store', [MemoController::class, 'store'])->name('memo.store');
Route::post('/memo/update', [MemoController::class, 'update'])->name('memo.update');
Route::delete('/memo/delete/{memo_id}', [MemoController::class, 'destroy'])->name('memo.delete');

//タグCRUD
Route::resource('/tag', TagController::class);

//ノートブックAPI
Route::resource('/notebook', NotebookController::class);

//ページAPI
Route::resource('/page', PageController::class);

//目安箱送信
Route::post('/suggestion', [SuggestionController::class, 'post'])->name('suggestion.post');

Route::get('/entry', [AccesskeyController::class, 'entry'])->name('entry');
Route::post('/verify-accesskey', [AccesskeyController::class, 'verifyAccesskey'])->name('accesskey.verify');

require __DIR__.'/auth.php';
