import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('reveal-letter')
export class RevealLetter extends LitElement {

  static styles = css`

  `;

  @property({type: String})
  currentWordTop = '';

  @property({type: String})
  currentWordBottom = '';

  @property({type: String})
  guessingWord = '';

  revealLetter(place: string): void {
    this.dispatchEvent(new Event(`reveal-letter-${place}`));
  }  

  render() {
    
    return html`
      <div>
        <p>Would you like a letter after ${this.currentWordTop} or letter before ${this.currentWordBottom}</p>
        <button type="button" @click=${() => this.revealLetter('below')}>Below ${this.currentWordTop}</button>
        <button type="button" @click=${() => this.revealLetter('above')}>Above ${this.currentWordBottom}</button>
      </div>
    `;
  }
}
