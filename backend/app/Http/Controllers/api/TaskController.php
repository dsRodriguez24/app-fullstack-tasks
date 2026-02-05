<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        /** @var \App\Models\User $user */
        $user   = Auth::user();
        $tasks  = $user->tasks;
        return response()->json($tasks, 201);
    }
    
    public function store(StoreTaskRequest $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $task = $user->tasks()->create( $request->validated() );
        return response()->json($task, 201);
        }
        
    public function update(StoreTaskRequest $request, $id){
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // Buscamos la tarea que pertenezca al usuario
        $task = $user->tasks()->find($id);

        if (!$task) {
            return response()->json(['error' => 'No encontrada o no autorizada'], 404);
        }

        // Actualizamos solo con los datos validados que pasaron el 'sometimes'
        $task->update($request->validated());

        return response()->json($task, 200);
    }


}
