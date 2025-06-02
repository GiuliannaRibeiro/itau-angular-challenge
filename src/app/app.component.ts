import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TaskFormComponent } from './features/todo/components/task-form/task-form.component';
import { TaskListComponent } from './features/todo/components/task-list/task-list.component';
import { CompletedTaskComponent } from './features/todo/components/completed-task/completed-task.component';
import { TaskService } from './core/services/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    TaskFormComponent,
    TaskListComponent,
    CompletedTaskComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private taskService = inject(TaskService);
  title = 'itau-angular-challenge';

  readonly activeTasks = this.taskService.activeTasks;
  readonly completedTasks = this.taskService.completedTasks;

  addTask(taskName: string) {
    this.taskService.addTask(taskName);
  }

  markTaskAsCompleted(id: number) {
    this.taskService.markAsCompleted(id);
  }

  updateTaskName(event: { id: number; name: string }) {
    this.taskService.updateName(event.id, event.name);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }
}
