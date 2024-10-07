<?php
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('TypingTest'); // Use only 'TypingTest' without 'home'
});
