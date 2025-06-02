import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TaskService } from './core/services/task.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let taskService: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [TaskService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    taskService['_tasks'].set([]);
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve adicionar uma nova tarefa', () => {
    component.addTask('Nova Tarefa');

    const tasks = taskService.tasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].name).toBe('Nova Tarefa');
    expect(tasks[0].isCompleted).toBeFalse();
  });

  it('deve marcar uma tarefa como concluída', () => {
    component.addTask('Tarefa para completar');
    const id = taskService.tasks()[0].id;

    component.markTaskAsCompleted(id);

    const updatedTask = taskService.tasks().find((t) => t.id === id);
    expect(updatedTask?.isCompleted).toBeTrue();
    expect(updatedTask?.completionDate).toBeInstanceOf(Date);
  });

  it('deve atualizar o nome de uma tarefa', () => {
    component.addTask('Nome antigo');
    const id = taskService.tasks()[0].id;

    component.updateTaskName({ id, name: 'Nome novo' });

    const updated = taskService.tasks().find((t) => t.id === id);
    expect(updated?.name).toBe('Nome novo');
  });

  it('deve excluir uma tarefa', () => {
    component.addTask('Tarefa para excluir');
    const id = taskService.tasks()[0].id;

    component.deleteTask(id);

    expect(taskService.tasks().length).toBe(0);
  });

  it('deve retornar apenas tarefas ativas', () => {
    taskService['_tasks'].set([
      { id: 1, name: 'Ativa', isCompleted: false, completionDate: null },
      {
        id: 2,
        name: 'Concluída',
        isCompleted: true,
        completionDate: new Date(),
      },
    ]);

    const active = component.activeTasks();
    expect(active.length).toBe(1);
    expect(active[0].name).toBe('Ativa');
  });

  it('deve retornar apenas tarefas concluídas', () => {
    taskService['_tasks'].set([
      { id: 1, name: 'Ativa', isCompleted: false, completionDate: null },
      {
        id: 2,
        name: 'Concluída',
        isCompleted: true,
        completionDate: new Date(),
      },
    ]);

    const completed = component.completedTasks();
    expect(completed.length).toBe(1);
    expect(completed[0].name).toBe('Concluída');
  });
});
