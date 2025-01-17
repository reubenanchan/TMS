<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;

Route::middleware('api')->get('/todos', [TodoController::class, 'index']);
Route::middleware('api')->post('/todos', [TodoController::class, 'store']);
Route::middleware('api')->get('/todos/{todo}', [TodoController::class, 'show']);
Route::middleware('api')->put('/todos/{todo}', [TodoController::class, 'update']);
Route::middleware('api')->delete('/todos/{todo}', [TodoController::class, 'destroy']);