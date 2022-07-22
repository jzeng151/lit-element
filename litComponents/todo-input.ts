import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';


@customElement('todo-input')
export class TodoInput extends LitElement {

  static styles = css`
    .add-todo { 
      text-align: center;
    }
  `;
  
  @property({type: String})
  newTodo: string = '';

  handleClick(): void {
    const input: HTMLInputElement = this.renderRoot.querySelector('#todo-input');
    input.value = '';
    this.dispatchEvent(new Event('add-todo'));
  }

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.newTodo = target.value;
  }
  
  render() {

    return html`
      <div class="add-todo">
        <h2>Todo List</h2>
        <input 
          id="todo-input"
          @input=${this.handleInput} 
          type="text" 
          placeholder="Enter new todo" />
        <button @click=${this.handleClick} type="button">Add todo</button>
      </div>
    `;
  }
}
