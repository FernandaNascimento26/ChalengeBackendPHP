<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;



Route::post('/register', function (Request $request) {
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8',
        'user_type' => 'required|string|in:admin,gestor,logged_user,common_user'
    ]);

    if ($validator->fails()) {
        return Response::json(['errors' => $validator->errors()], 400);
    }

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'user_type' => $request->user_type,
    ]);

    return Response::json(['message' => 'User registered successfully!'], 201);
});


Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout', function (Request $request) {
    $request->user()->currentAccessToken()->delete();

    return response()->json('Logged out', 200);
})->middleware('auth:sanctum');


// Rotas protegidas
Route::middleware(['auth:sanctum', 'role:Administrador'])->group(function () {
    Route::get('/admin-page', function () {
        return response()->json(['message' => 'Welcome, Admin!'], 200);
    });
});

Route::middleware(['auth:sanctum', 'role:Gestor'])->group(function () {
    Route::get('/manager-page', function () {
        return response()->json(['message' => 'Welcome, Manager!'], 200);
    });
});

Route::middleware(['auth:sanctum', 'role:Usuário Logado'])->group(function () {
    Route::get('/user-page', function () {
        return response()->json(['message' => 'Welcome, Logged In User!'], 200);
    });
});

Route::middleware(['auth:sanctum', 'role:Usuário Comum'])->group(function () {
    Route::get('/common-user-page', function () {
        return response()->json(['message' => 'Welcome, Common User!'], 200);
    });
});

Route::middleware('auth:sanctum')->get('/users', [UserController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::delete('/profile', [ProfileController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
});
