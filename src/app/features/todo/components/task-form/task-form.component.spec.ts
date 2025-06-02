import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFormComponent, FormsModule, MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('não deve emitir evento se o campo estiver vazio ou apenas com espaços', () => {
    spyOn(component.taskCreated, 'emit');

    component.newTask = '   ';
    component.submitTask();

    expect(component.taskCreated.emit).not.toHaveBeenCalled();
  });

  it('deve emitir o evento taskCreated com o valor correto e limpar o campo', () => {
    spyOn(component.taskCreated, 'emit');

    component.newTask = 'Nova Tarefa';
    component.submitTask();

    expect(component.taskCreated.emit).toHaveBeenCalledWith('Nova Tarefa');
    expect(component.newTask).toBe('');
  });

  it('deve renderizar o input e o botão corretamente', () => {
    const input = fixture.debugElement.query(By.css('input'));
    const button = fixture.debugElement.query(By.css('button'));

    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
  });
});
