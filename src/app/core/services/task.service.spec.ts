import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    service = new TaskService();
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('deve adicionar uma tarefa', () => {
    service.addTask('Nova tarefa');
    const tasks = service.tasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].name).toBe('Nova tarefa');
    expect(tasks[0].isCompleted).toBeFalse();
  });

  it('deve atualizar o nome da tarefa', () => {
    service.addTask('nome antigo');
    const id = service.tasks()[0].id;
    service.updateName(id, 'Nome novo');

    const updated = service.tasks().find((t) => t.id === id);
    expect(updated?.name).toBe('Nome novo');
  });

  it('deve marcar uma tarefa como concluída', () => {
    service.addTask('Tarefa a concluir');
    const id = service.tasks()[0].id;
    service.markAsCompleted(id);

    const task = service.tasks().find((t) => t.id === id);
    expect(task?.isCompleted).toBeTrue();
    expect(task?.completionDate).toBeInstanceOf(Date);
  });

  it('deve excluir uma tarefa', () => {
    service.addTask('Tarefa a excluir');
    const id = service.tasks()[0].id;
    service.deleteTask(id);

    expect(service.tasks().length).toBe(0);
  });

  it('deve filtrar tarefas ativas', () => {
    const now = new Date();
    service['_tasks'].set([
      { id: 1, name: 'Ativa', isCompleted: false, completionDate: null },
      { id: 2, name: 'Concluída', isCompleted: true, completionDate: now },
    ]);

    const active = service.activeTasks();
    expect(active.length).toBe(1);
    expect(active[0].name).toBe('Ativa');
  });

  it('deve filtrar tarefas concluídas', () => {
    const now = new Date();
    service['_tasks'].set([
      { id: 1, name: 'Ativa', isCompleted: false, completionDate: null },
      { id: 2, name: 'Concluída', isCompleted: true, completionDate: now },
    ]);

    const completed = service.completedTasks();
    expect(completed.length).toBe(1);
    expect(completed[0].name).toBe('Concluída');
  });
});
