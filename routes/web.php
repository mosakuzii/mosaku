<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AccesskeyController;
use App\Http\Controllers\MemoController;
use App\Http\Controllers\TagController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//メモCRUD
Route::get('/', [MemoController::class, 'index'])->name('index');
Route::post('/store', [MemoController::class, 'store'])->name('memo.store');
Route::post('/update', [MemoController::class, 'update'])->name('memo.update');
Route::delete('/delete', [MemoController::class, 'destroy'])->name('memo.delete');

//タグCRUD
Route::resource('/tag', TagController::class);

Route::get('/entry', [AccesskeyController::class, 'entry'])->name('entry');
Route::post('/verify-accesskey', [AccesskeyController::class, 'verifyAccesskey'])->name('accesskey.verify');

require __DIR__.'/auth.php';
