import { html, css, LitElement, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import './todo-input';
import './todo-card';
import './todo-display';
import { TodoDisplay } from './todo-display';

@customElement('todo-card')
export class TodoCard extends LitElement {

  static styles = css`
    #remove-todo-button {
      float: right;
    }
    #todo-card {
      text-align: center;
      background-color: #a43955;
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
  
  @property({type: Boolean})
  isCompleted: Boolean = false;

  private _removeTodo(): void {
    this.dispatchEvent(new Event('remove-todo'));
  }

  private _editTodo(): void {
    //if render is the edit input grab update todo with edited one and switch render to show todo
    if (this.isEditing === 'true') {
      const todoDisplay = this.shadowRoot?.querySelector('todo-display') as TodoDisplay;
      this.editedTodo = todoDisplay.editedTodo;
      this.dispatchEvent(new Event('edit-todo'));
    } else if (this.isEditing === 'false') {
      this.isEditing = 'true';
    }
  }
  
  // toggle complete/incomplete tasks
  private _changeStatus(): void {
    const todoCard: HTMLDivElement = this.shadowRoot?.querySelector('#todo-card')!;
    // if todo is incomplete set it to complete
    if(!this.isCompleted) {
      todoCard.style.backgroundColor = '#39a453'; // green
    } else if (this.isCompleted) {
      todoCard.style.backgroundColor = '#a43955'; // red
    }
    this.isCompleted = !this.isCompleted;
  }

  render() {

    return html`
      <div id="todo-card">
        <button 
          @click=${this._removeTodo} 
          type="button" 
          id="remove-todo-button" >
          X
        </button>
        <todo-display
          @edit-todo=${this._editTodo}
          isEditing=${this.isEditing}
          todo=${this.todo} >
        </todo-display>
        <button
          @click=${this._editTodo} >
          Edit
        </button>

        <input
          type="checkbox"
          @click=${this._changeStatus} >
        Done
        </input>

      </div>
    `;
  }
}
