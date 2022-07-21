import {html, css, LitElement} from 'lit';

import {customElement, property} from 'lit/decorators.js';
import './todo-input';

@customElement('todo-list')
export class TodoList extends LitElement {

  static styles = css`p { color: blue }`;


  @property()

  name = 'Somebody';


  render() {

    return html`
      <div>
        <todo-input></todo-input>
        <button type="button" >Add todo</button>
        <div>
          
        </div>
      </div>
    `;

  }

}
