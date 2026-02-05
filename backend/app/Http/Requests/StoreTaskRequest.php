<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $isUpdate = $this->isMethod('put') || $this->isMethod('patch');

        return [
            'title'       =>  ( $isUpdate ? 'sometimes' : 'required' ) . '|string|max:255',
            'description' =>  ( $isUpdate ? 'sometimes' : 'required' ) . '|string|max:255',
            'status'      =>  ( $isUpdate ? 'sometimes' : 'required' ) . '|string|max:255|in:pending,in_progress,done',
            'completion_at'    =>  ( $isUpdate ? 'sometimes' : 'required' ) . '|date',
            // 'date_end'    =>  ( $isUpdate ? 'sometimes' : 'required' ) . '|date',
        ];
    }
}
