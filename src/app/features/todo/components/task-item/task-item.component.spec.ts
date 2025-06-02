import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskItemComponent } from './task-item.component';
import { By } from '@angular/platform-browser';
import { Task } from '../../../../core/models/task.model';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;
  let testTask: Task;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;

    testTask = {
      id: 1,
      name: 'Tarefa de Teste',
      isCompleted: false,
      completionDate: null,
    };

    component.task = testTask;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir o nome da tarefa', () => {
    const label = fixture.debugElement.query(By.css('mat-checkbox'))
      .nativeElement.textContent;
    expect(label).toContain('Tarefa de Teste');
  });

  it('deve emitir complete quando o checkbox for clicado', () => {
    spyOn(component.markAsCompleted, 'emit');

    const checkbox = fixture.debugElement.query(By.css('mat-checkbox'));
    checkbox.triggerEventHandler('change', {});

    expect(component.markAsCompleted.emit).toHaveBeenCalledWith(testTask.id);
  });

  it('deve exibir input ao iniciar edição', () => {
    component.startEdit();
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input'));
    expect(input).toBeTruthy();
  });

  it('deve emitir updateName e sair do modo de edição ao confirmar edição', () => {
    component.startEdit();
    component.editedName = 'Tarefa Editada';
    fixture.detectChanges();

    spyOn(component.updateName, 'emit');
    component.confirmEdit();

    expect(component.updateName.emit).toHaveBeenCalledWith({
      id: testTask.id,
      name: 'Tarefa Editada',
    });
    expect(component.isEditing).toBeFalse();
  });

  it('deve emitir delete ao clicar no botão de excluir', () => {
    spyOn(component.deleteTask, 'emit');
    const deleteBtn = fixture.debugElement.query(
      By.css('.task-actions button:last-child')
    );
    deleteBtn.triggerEventHandler('click', null);

    expect(component.deleteTask.emit).toHaveBeenCalledWith(testTask.id);
  });
});
