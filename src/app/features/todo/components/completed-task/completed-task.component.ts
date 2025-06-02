import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Task } from '../../../../core/models/task.model';

@Component({
  selector: 'app-completed-task',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './completed-task.component.html',
  styleUrl: './completed-task.component.scss',
})
export class CompletedTaskComponent {
  @Input() tasks: Task[] = [];
}
