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

  // same as in todo-input maybe create helper function file? 
  private _handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.editedTodo = target.value;
  }

  private _editTodo() {
    const input: HTMLInputElement = this.renderRoot?.querySelector('#edit-todo-input')!;
    input.value = '';
    this.dispatchEvent(new Event('edit-todo'));
  }

  render() {

    if (this.isEditing === 'true') {
      return html`
        <div id="edit-box">
          <input
            id="edit-todo-input"
            @input=${this._handleInput}
            type="text"
            value=${this.todo} />
          <button
            @click=${this._editTodo} >
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
