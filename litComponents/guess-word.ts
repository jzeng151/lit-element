import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('guess-word')
export class GuessWord extends LitElement {

  static styles = css`
  `;

  @property({type: String})
  guess: String = '';

  handleGuess() {
    this.dispatchEvent(new Event('guess-submitted'));
  }  
  
  handleInput(event: Event) {
    this.guess = (event.target as HTMLInputElement).value;
  }

  render() {

    return html`
      <input @input=${this.handleInput} type="text" placeholder="Enter guess"></input>
      <button type="button" @click=${this.handleGuess}>Guess</button>
    `;
  }
}
