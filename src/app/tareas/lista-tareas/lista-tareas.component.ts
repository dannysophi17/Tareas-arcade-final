import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Task, TaskService } from '../../services/task.service';

@Component({
  selector: 'app-lista-tareas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-tareas.component.html',
  styleUrls: ['./lista-tareas.component.scss']
})
export class ListaTareasComponent implements OnInit {
  tareas: Task[] = [];
  error = '';

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  private async cargar() {
    try {
      this.tareas = await this.taskService.getTasks();
    } catch {
      this.error = 'No se pudieron cargar las tareas';
    }
  }

  nuevaTarea() {
    this.router.navigate(['/tasks/create']);
  }

  async eliminarTarea(id: string) {
    try {
      await this.taskService.deleteTask(id);
      await this.cargar();
    } catch {
      this.error = 'Error al eliminar la tarea';
    }
  }

  async toggleDone(task: Task) {
    try {
      const updated = await this.taskService.toggleTaskCompletion(task);
      this.tareas = this.tareas.map(t =>
        t._id === updated._id ? updated : t
      );
    } catch {
      this.error = 'Error al cambiar estado de la tarea';
    }
  }
}


