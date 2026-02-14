<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/navbar', function () {
    return Inertia::render('navbar-showcase');
});

Route::get('/navigation', function () {
    return Inertia::render('navigation-showcase');
});

require __DIR__ . '/settings.php';
