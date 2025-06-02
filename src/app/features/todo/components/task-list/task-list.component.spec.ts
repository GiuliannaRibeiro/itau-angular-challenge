import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { Task } from '../../../../core/models/task.model';
import { By } from '@angular/platform-browser';
import { TaskItemComponent } from '../task-item/task-item.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  const mockTasks: Task[] = [
    { id: 1, name: 'Tarefa 1', isCompleted: false, completionDate: null },
    { id: 2, name: 'Tarefa 2', isCompleted: false, completionDate: null },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TaskListComponent,
        TaskItemComponent,
        MatIconModule,
        CommonModule,
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
  });

  it('deve exibir uma mensagem quando não houver tarefas', () => {
    component.tasks = [];
    fixture.detectChanges();
    const message = fixture.debugElement.query(By.css('.empty-message'));
    expect(message).toBeTruthy();
    expect(message.nativeElement.textContent).toContain('Nenhuma tarefa adicionada');
  });

  it('deve renderizar os itens de tarefa corretamente', () => {
    component.tasks = mockTasks;
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('app-task-item'));
    expect(items.length).toBe(2);
  });

  it('deve emitir markAsCompleted quando uma tarefa for completada', () => {
    spyOn(component.markAsCompleted, 'emit');
    component.onTaskCompleted(1);
    expect(component.markAsCompleted.emit).toHaveBeenCalledWith(1);
  });

  it('deve emitir updateName quando o nome de uma tarefa for atualizado', () => {
    spyOn(component.updateName, 'emit');
    const updateData = { id: 2, name: 'Atualizado' };
    component.onUpdateName(updateData);
    expect(component.updateName.emit).toHaveBeenCalledWith(updateData);
  });

  it('deve emitir deleteTask quando uma tarefa for excluída', () => {
    spyOn(component.deleteTask, 'emit');
    component.onDeleteTask(2);
    expect(component.deleteTask.emit).toHaveBeenCalledWith(2);
  });
});
