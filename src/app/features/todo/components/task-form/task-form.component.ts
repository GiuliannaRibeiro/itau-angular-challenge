import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, MatIconModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  newTask: string = '';

  @Output() taskCreated = new EventEmitter<string>();

  submitTask() {
    if (this.newTask.trim()) {
      this.taskCreated.emit(this.newTask);
      this.newTask = '';
    }
  }
}
