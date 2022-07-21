import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { range } from 'lit/directives/range.js';

@customElement('cr-word')
export class CrWord extends LitElement {

  static styles = css`
    .crLetter {
      text-transform: uppercase;
      text-align: center;
      border: 1px solid black;
      font-weight: bold;
      width: 30px;
      length: 28px;
      background-color: #51b2e6;
    }
  `;

  @property({type: String})
  word: String = '';

  render() {
    // iterate range(n) times to display a letter or ?
    return html`
      ${map(range(10), i => {
        const letter: string = this.word[i] || '?';
        return html`<td><button type="button" class="crLetter">${letter}</button></td>`
      })}
    `;
  }
}
