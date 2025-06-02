# Case Técnico - Itaú Angular Challenge

Projeto desenvolvido para o desafio técnico do Itaú, utilizando:

- **Angular 18**  
- **Standalone Components**
- **Signals e Computed Properties** para gerenciamento de estado
- **Validação de campos**
- **Testes unitários**
- Estrutura clara (componentes, serviços e modelos)

## Checklist dos Requisitos

**Obrigatórios:**
- [✓] Código com Angular 18
- [✓] Validação de campos obrigatórios implementada
- [✓] Estrutura de projeto definida
- [✓] Gerenciamento de estado com Signals
- [✓] Testes unitários

**Extras (Opcionais):**
- [✓] Standalone Components
- [✓] Uso de Signals (gerenciamento de estado reativo, eliminando a necessidade de JSON Server para armazenamento)

## Descrição do Projeto

Aplicação To-Do List que permite:

- **Adicionar Tarefa:** Campo de entrada e botão para incluir novas tarefas.
- **Listar Tarefas:** Exibe as tarefas ativas com opções para editar, excluir e marcar como concluída.
- **Listar Tarefas Concluídas:** Exibe em uma lista separada, as tarefas finalizadas com a data/hora da conclusão registrada.

## Estrutura dos Componentes

- **AppComponent:** Gerencia o estado e integra os demais.
- **TaskFormComponent:** Formulário para adicionar tarefas.
- **TaskListComponent:** Exibe as tarefas ativas.
- **TaskItemComponent:** Representa cada tarefa individual, permitindo edição, exclusão e marcação como concluída.
- **CompletedTaskComponent:** Exibe as tarefas concluídas.

## Instruções para Execução

1. Clone o repositório.
2. Execute `npm install`.
3. Inicie a aplicação com `ng serve` ou `npm start`.
4. Para executar os testes, rode `ng test`

## Paleta de Cores  

A aplicação utiliza a paleta de cores do Itaú para reforçar a identidade visual:  
- **Laranja:** `#FF7200`  
- **Azul escuro:** `#0D0057`  
