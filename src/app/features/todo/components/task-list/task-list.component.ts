import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../../../core/models/task.model';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [ CommonModule, MatIconModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})

export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() markAsCompleted = new EventEmitter<number>();
  @Output() updateName = new EventEmitter<{ id: number; name: string }>();
  @Output() deleteTask = new EventEmitter<number>();

  onTaskCompleted(id: number) {
    this.markAsCompleted.emit(id);
  }

  onUpdateName(event: { id: number; name: string }) {
    this.updateName.emit(event);
  }

  onDeleteTask(id: number) {
    this.deleteTask.emit(id);
  }
}