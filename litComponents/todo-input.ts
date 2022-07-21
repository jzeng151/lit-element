import {html, css, LitElement} from 'lit';

import {customElement, property} from 'lit/decorators.js';


@customElement('todo-input')
export class TodoInput extends LitElement {

  static styles = css`p { color: blue }`;





  render() {

    return html`
        <input type="text" placeholder="Enter new todo" />
    `;

  }

}
