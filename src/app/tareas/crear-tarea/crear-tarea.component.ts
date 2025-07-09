import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  standalone: true,
  selector: 'app-crear-tarea',
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.scss']
})
export class CrearTareaComponent {
  titulo = '';
  descripcion = '';
  error = '';

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  async onSubmit() {
    if (!this.titulo.trim()) {
      this.error = 'El título es obligatorio';
      return;
    }
    try {
      await this.taskService.createTask({
        title: this.titulo,
        description: this.descripcion
      });
      this.router.navigate(['/tasks']);
    } catch (err: any) {
      this.error = err.response?.data?.msg || 'Error al crear la tarea';
    }
  }
}



