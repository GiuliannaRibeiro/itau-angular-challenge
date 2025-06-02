import { Injectable, computed, signal } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private _tasks = signal<Task[]>([]);

  readonly tasks = this._tasks.asReadonly();

  readonly activeTasks = computed(() =>
    this._tasks().filter((task) => !task.isCompleted)
  );

  readonly completedTasks = computed(() =>
    this._tasks().filter((task) => task.isCompleted)
  );

  addTask(name: string) {
    const newTask: Task = {
      id: Date.now(),
      name,
      isCompleted: false,
      completionDate: null,
    };
    this._tasks.update((prev) => [...prev, newTask]);
  }

  updateName(id: number, name: string) {
    this._tasks.update((prev) =>
      prev.map((task) => (task.id === id ? { ...task, name } : task))
    );
  }

  markAsCompleted(id: number) {
    this._tasks.update((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, isCompleted: true, completionDate: new Date() }
          : task
      )
    );
  }

  deleteTask(id: number) {
    this._tasks.update((prev) => prev.filter((task) => task.id !== id));
  }
}
