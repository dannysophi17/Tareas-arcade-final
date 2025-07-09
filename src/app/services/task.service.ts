import { Injectable } from '@angular/core';
import api from './api-instance';

export interface Task {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  completed?: boolean;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private url = '/tasks';

  async getTasks(): Promise<Task[]> {
    const res = await api.get<Task[]>(this.url);
    return res.data;
  }

  async createTask(task: { title: string; description: string }): Promise<Task> {
    const res = await api.post<Task>(this.url, task);
    return res.data;
  }

  async deleteTask(id: string): Promise<void> {
    await api.delete(`${this.url}/${id}`);
  }
  
  async toggleTaskCompletion(task: Task): Promise<Task> {
    const res = await api.patch<Task>(
      `${this.url}/${task._id}`,
      { completed: !task.completed }
    );
    return res.data;
  }
}




