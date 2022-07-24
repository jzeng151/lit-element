import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import './todo-input';
import './todo-card';
import { TodoInput } from './todo-input';
import { TodoCard } from './todo-card';

@customElement('todo-list')
export class TodoList extends LitElement {

  static styles = css`
  `;

  @property({type: Array<String>})
  todosList: string[] = [];

  private _addTodo(event: Event): void {
    // grab newTodo from todo-input
    const target = event.target as TodoInput;
    this.todosList = [...this.todosList, target.newTodo];
  }

  private _removeTodo(event: Event):void {
    const target = event.target as TodoCard;
    const newTodosList: Array<string> = this.todosList.filter(todo => todo !== target.todo);
    this.todosList = newTodosList;
  }

  private _editTodo(event: Event):void {
    const target = event.target as TodoCard;
    const newTodosList: Array<string> = this.todosList.map(todo => {
      if (todo === target.todo) {
        return target.editedTodo
      } 
      return todo;
    })
    this.todosList = newTodosList;
    target.isEditing = 'false';
    this.requestUpdate();
  }

  render() {

    return html`
      <div>
        <todo-input
          @add-todo=${this._addTodo}>
        </todo-input>
        <div id="todo-list">
          ${map(this.todosList, todo => {
            return html`
              <todo-card
                @remove-todo=${this._removeTodo}
                @edit-todo=${this._editTodo}
                todo=${todo} >
              </todo-card>
            `
          })}
        </div>
      </div>
    `;

  }

}
