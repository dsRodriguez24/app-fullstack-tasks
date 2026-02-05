export interface NewTaskInput {
  title: string;
  description: string;
  fecha: string; // YYYY-MM-DD
  hora: string; // HH:mm
}

export interface ValidationResult {
  valid: boolean;
  errors: { [k: string]: string };
}

export const validateNewTask = (input: NewTaskInput): ValidationResult => {
  const errors: { [k: string]: string } = {};

  if (!input.title || !input.title.trim()) {
    errors.title = 'El título es requerido';
  }

  if (!input.description || !input.description.trim()) {
    errors.description = 'La descripción es requerida';
  }

  if (!input.fecha) {
    errors.fecha = 'La fecha es requerida';
  }

  if (!input.hora) {
    errors.hora = 'La hora es requerida';
  }

  return { valid: Object.keys(errors).length === 0, errors };
};

export const createTaskPayload = (input: NewTaskInput) => {
  return {
    title: input.title,
    description: input.description,
    completion_at: `${input.fecha} ${input.hora}:00`,
    status: 'pending',
  };
};

export default validateNewTask;
