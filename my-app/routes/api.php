<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\MenuItemController;


Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user',    [AuthController::class, 'me']);

    Route::apiResource('categories', CategoryController::class);

    Route::apiResource('menu-items', MenuItemController::class);
    Route::patch('menu-items/{menuItem}/toggle', [MenuItemController::class, 'toggleAvailability']);

});