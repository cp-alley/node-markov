/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    let chains = {};

    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      chains[word] = chains[word] || [];
      chains[word].push(this.words[i + 1] || null);
    }

    return chains;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null
    let text = [];
    let word = this.words[0];

    while (word) {
      text.push(word);
      word = this._getChoice(word)
    }

    return text.join(" ");
  }

  _getChoice(word) {
    let randomIndex = Math.floor(Math.random() * this.chains[word].length);
    return this.chains[word][randomIndex];
  }
}

module.exports = {
  MarkovMachine,
};