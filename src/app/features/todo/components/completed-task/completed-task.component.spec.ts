import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompletedTaskComponent } from './completed-task.component';
import { By } from '@angular/platform-browser';
import { formatDate } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

describe('CompletedTaskComponent', () => {
  let component: CompletedTaskComponent;
  let fixture: ComponentFixture<CompletedTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedTaskComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompletedTaskComponent);
    component = fixture.componentInstance;
  });

  it('deve exibir corretamente a lista de tarefas concluídas', () => {
    const data = new Date('2024-05-30T15:30:00');
    component.tasks = [
      {
        id: 1,
        name: 'Tarefa Concluída',
        isCompleted: true,
        completionDate: data,
      },
    ];

    fixture.detectChanges();

    const taskElements = fixture.debugElement.queryAll(
      By.css('.completed-task')
    );
    expect(taskElements.length).toBe(1);

    const name = taskElements[0].query(By.css('.completed-name')).nativeElement
      .textContent;
    expect(name).toContain('Tarefa Concluída');

    const completionDateText = taskElements[0].query(By.css('.completion-date'))
      .nativeElement.textContent;
    const formatted = formatDate(data, 'dd/MM/yyyy, HH:mm', 'pt-BR');
    expect(completionDateText).toContain(`Concluído em ${formatted}`);
  });

  it('não deve renderizar nada se a lista de tarefas estiver vazia', () => {
    component.tasks = [];
    fixture.detectChanges();

    const tasksRendered = fixture.debugElement.queryAll(
      By.css('.completed-task')
    );
    expect(tasksRendered.length).toBe(0);
  });
});
