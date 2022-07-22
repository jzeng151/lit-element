import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './cr-word';
import './guess-word';
import './reveal-letter';
import { GuessWord } from './guess-word';

@customElement('chain-reaction')
export class ChainReaction extends LitElement {

  static styles = css`
    .cr-table {
      margin-left: auto;
      margin-right: auto;
    }
  `;
  @property({type: Boolean})
  isGuessing = false;

  @property({type: Array<String>})
  chain = [''];

  @property({type: Array<String>})
  displayedWords = [''];

  @property({type: Number})
  currentWordTopIdx = 0;

  @property({type: Number})
  currentWordBottomIdx = 0;
  
  @property({type: Number})
  currentWordIdx = 0;
  
  @property({type: String})
  guessingAt = '';

  startGame(): void {
    console.log('start game')
    // eventually add backend to fetch a new chain
    const chain: Array<string> = ['student', 'debt', 'free', 'parking', 'garage', 'sale'];
    // set chain and current progress in props with first and last word revealed
    this.chain = chain;
    this.currentWordTopIdx = 0;
    this.currentWordBottomIdx = this.chain.length - 1;
    this.displayedWords = new Array(chain.length).fill('');
    this.displayedWords[0] = chain[0];
    this.displayedWords[this.displayedWords.length - 1] = chain[chain.length - 1];
  }

  //function to conditionally render guess input or reveal a new letter before guessing
  getGuessStatus() {
    const topWord = this.chain[this.currentWordTopIdx];
    const bottomWord = this.chain[this.currentWordBottomIdx];
    if (this.isGuessing) {
      return html`
        <h5>guessing<h5>
        <guess-word
          @guess-submitted=${this.handleGuess}
          chain=${JSON.stringify(this.chain)}
          currentWordTop=${this.currentWordTopIdx}
          currentWordBottom=${this.currentWordBottomIdx} >
        </guess-word>
      `
    }
    if (!this.isGuessing){
      return html`
        <h5>not guessing<h5>
        <reveal-letter
          @reveal-letter-above=${() => this.revealLetter('above')}
          @reveal-letter-below=${() => this.revealLetter('below')}
          currentWordTop=${topWord}
          currentWordBottom=${bottomWord} >
        </reveal-letter>
      `
    }
  }

  // function to show a new letter
  revealLetter(place: string): void {
    // determine whether to reveal a letter above the end or below the start
    if (place === 'above') {
      this.currentWordIdx = this.currentWordBottomIdx - 1;
      this.guessingAt = 'above';
    }
    else if (place === 'below') {
      this.currentWordIdx = this.currentWordTopIdx + 1;
      this.guessingAt = 'below';
    }
    const currentChain = this.displayedWords;
    const currWordIdx = this.currentWordIdx;
    // add one to the length of current revealed letters 
    const newLetterCount = currentChain[currWordIdx].length + 1;
    // add extra letter to the current word in displayedWords
    currentChain[currWordIdx] = this.chain[currWordIdx].slice(0,newLetterCount);
    // change the render to allow user to guess the word
    this.isGuessing = true;
    this.requestUpdate();
  }

  handleGuess(event: Event) {
    const target = event.target as GuessWord;
    const guess = target.guess.toLowerCase();
    const word = this.chain[this.currentWordIdx].toLowerCase();
    if (guess === word) {
      const currWordIdx = this.currentWordIdx
      this.displayedWords[currWordIdx] = this.chain[currWordIdx];
      if (this.guessingAt === 'above') {
        this.currentWordBottomIdx -= 1;
      }
      else if (this.guessingAt = 'below') {
        this.currentWordTopIdx += 1;
      }
    }
    this.checkGameStatus();
    // add functionalility to execute on wrong guess
    this.isGuessing = false;
  }

  checkGameStatus() {
    if (this.currentWordTopIdx + 1 === this.currentWordBottomIdx) {
      alert('You win!')
    }
  }

  render() {
    return html`
      <div>
        CR table
        <table class="cr-table">
          ${this.displayedWords.map(word => {
            return html`
              <tr>
                <cr-word word=${word}>hello</cr-word>
              </tr>`
          })}
        </table>
        ${this.getGuessStatus()}
      </div>
    `;

  }

  connectedCallback(): void {
    super.connectedCallback()
    this.startGame();
  }
}
