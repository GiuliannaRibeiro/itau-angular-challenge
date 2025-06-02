import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Task } from '../../../../core/models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCheckboxModule, FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() markAsCompleted = new EventEmitter<number>();
  @Output() updateName = new EventEmitter<{ id: number; name: string }>();
  @Output() deleteTask = new EventEmitter<number>();
  isEditing: boolean = false;
  editedName: string = '';

  onCheckboxChange() {
    this.markAsCompleted.emit(this.task.id);
  }

  startEdit() {
    this.isEditing = true;
    this.editedName = this.task.name;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  confirmEdit() {
    if (this.editedName.trim()) {
      this.updateName.emit({ id: this.task.id, name: this.editedName });
      this.isEditing = false;
    }
  }

  onDelete() {
    this.deleteTask.emit(this.task.id);
  }
}
