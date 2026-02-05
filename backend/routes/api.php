<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\TaskController;
use App\Http\Controllers\api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// * RUTAS PUBLICAS
Route::post('/register',  [ UserController::class, 'store' ] );
Route::post('/login',     [ AuthController::class, 'login' ] );

Route::post('/refresh',  [AuthController::class, 'refresh']);

// * RUTAS PRIVADAS
Route::middleware('auth:api')->group(function () {
    // ? USUARIO
    Route::get('/me',        [ AuthController::class, 'me'] );
    Route::put('/me',        [ AuthController::class, 'update_me'] );

    // ? TAREAS
    Route::get('/task',      [ TaskController::class, 'index' ] );
    Route::post('/task',     [ TaskController::class, 'store' ] );
    Route::put('/task/{id}', [ TaskController::class, 'update' ] );
});