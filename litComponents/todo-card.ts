import { html, css, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './todo-input';
import './todo-card';
import './todo-display';
import { TodoDisplay } from './todo-display';

@customElement('todo-card')
export class TodoCard extends LitElement {

  static styles = css`
    #removeTodo {
      float: right;
    }
    #todoCard {
      text-align: center;
      background-color: #ff9999;
      border: 1px solid #1a1a1a;
      width: 40%;
      margin-left: 30%;
      margin-top: 1%;
    }
  `;

  @property({type: String})
  todo: string = '';

  @property({type: String})
  editedTodo: string = '';

  @property({type: String})
  isEditing: string = 'false';

  removeTodo(): void {
    this.dispatchEvent(new Event('remove-todo'));
  }

  editTodo(): void {
    //if render is the edit input grab update todo with edited one and switch render to show todo
    if (this.isEditing === 'true') {
      const todoDisplay = this.shadowRoot.querySelector('todo-display') as TodoDisplay;
      console.log(todoDisplay)
      this.editedTodo = todoDisplay.editedTodo;
      // this.todo = todoDisplay.editedTodo;
      this.dispatchEvent(new Event('edit-todo'));
      // this.isEditing = 'false';
    // switch render to show edit input
    } else if (this.isEditing === 'false') {
      this.isEditing = 'true';
    }
  }

  changeStatus(): void {
    // complete/incomplete task toggle
  }

  render() {

    return html`
      <div id="todoCard">
        <button 
          @click=${this.removeTodo} 
          type="button" 
          id="removeTodo" >
          X
        </button>
        <todo-display
          @edit-todo=${this.editTodo}
          isEditing=${this.isEditing}
          todo=${this.todo} >
        </todo-display>
        <button
          @click=${this.editTodo} >
          Edit
        </button>

        <button
          @click=${this.changeStatus} >
        Completed
        </button>

      </div>
    `;
  }
}
