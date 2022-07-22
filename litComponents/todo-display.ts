import { html, css, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('todo-display')
export class TodoDisplay extends LitElement {
  
  static styles = css`
    .edit-box {
      display: block;
    }
  `

  

  @property({type: String})
  todo: string = '';

  @property({type: String})
  editedTodo: string = '';

  @property({type: String})
  isEditing: string = 'false';

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.editedTodo = target.value;
  }

  editTodo() {
    const input: HTMLInputElement = this.renderRoot.querySelector('#edit-todo');
    input.value = '';
    this.dispatchEvent(new Event('edit-todo'))
  }

  render() {

    if (this.isEditing === 'true') {
      return html`
        <div id="edit-box">
          <input
            id="edit-todo"
            @input=${this.handleInput}
            type="text"
            value=${this.todo} />
          <button
            @click=${this.editTodo} >
          Save
          </button>
        </div>
      `
    }
    if (this.isEditing === 'false') {
      return html`
        <p>${this.todo}</p>
      `
    }
  }
}
