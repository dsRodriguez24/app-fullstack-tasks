<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAuthRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Facades\Request;

class AuthController extends Controller
{
    public function login(StoreAuthRequest $request): JsonResponse
    {
        $credentials = $request->only('email', 'password');

        if (!$token = Auth::guard('api')->attempt($credentials)) {
            return response()->json(['error' => 'No autorizado'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function me(): JsonResponse
    {
        return response()->json( Auth::user() );
    }

    public function update_me(Request $request): JsonResponse
    {
        $user = Auth::user();
        $user->update($request->all());
        return response()->json($user);
    }

    public function logout(): JsonResponse
    {
        Auth::guard('api')->logout();
        return response()->json(['message' => 'Sesión cerrada exitosamente']);
    }

    // public function refresh(Request $request)
    // {
    //     $token = $request->cookie('refresh_token');

    //     if (!$token) {
    //         return response()->json(['error' => 'No se encontró la cookie'], 401);
    //     }

    //     try {
    //         // Forzamos a JWTAuth a usar el token de la cookie para refrescar
    //         // setToken() es vital aquí
    //         $newToken = Auth::guard('api')->setToken($token)->refresh();
            
    //         return $this->respondWithToken($newToken);
    //     } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
    //         return response()->json(['error' => 'Token inválido', 'detalle' => $e->getMessage()], 401);
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => 'Sesión expirada o error'], 401);
    //     }
    // }

    public function refresh(Request $request){
        try {
            $token = $request->cookie('refresh_token');
            
            // 1. Generamos el nuevo token
            $newToken = Auth::guard('api')->setToken($token)->refresh();

            // 2. IMPORTANTE: Autenticamos al usuario con el nuevo token 
            // para que Auth::user() deje de ser null
            Auth::guard('api')->setToken($newToken)->user();

            return $this->respondWithToken($newToken);

        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo refrescar'], 401);
        }
    }

    protected function respondWithToken($token): JsonResponse
    {
        $cookie = cookie(
            'refresh_token', 
            $token, 
            60,   
            '/',  
            null, 
            false,
            true, 
            false,
            'Lax' 
        );

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60,
            'user' => Auth::user()
        ])->withCookie($cookie);
    }

    
}