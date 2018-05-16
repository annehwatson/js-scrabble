
const Scrabble = {
  score(word) {
    if (word === null || word === "") {
      throw 'Please enter valid input';
    }

    if (word.length > 7) {
      throw 'Words must be 7 letters or less';
    }

    let validLetters = /^[A-Za-z]+$/;
    let letterArray = []
    if (word.match(validLetters)) {
      letterArray = word.toLowerCase().split("");
      console.log(letterArray);
    } else {
      throw 'Please enter valid input';
    }

    let wordScore = 0
    if (letterArray.length == 7) {
      wordScore = 50;
    }

    for (let letter of letterArray) {
      switch (letter) {
        case 'a':
        case 'e':
        case 'i':
        case 'o':
        case 'u':
        case 'l':
        case 'n':
        case 'r':
        case 's':
        case 't':
          wordScore += 1;
          break;
        case 'd':
        case 'g':
          wordScore += 2;
          break;
        case 'b':
        case 'c':
        case 'm':
        case 'p':
          wordScore += 3;
          break;
        case 'f':
        case 'h':
        case 'v':
        case 'w':
        case 'y':
          wordScore += 4;
          break;
        case 'k':
          wordScore += 5;
          break;
        case 'j':
        case 'x':
          wordScore += 8;
          break;
        case 'q':
        case 'z':
          wordScore += 10;
          break;
        default:
          throw 'Unscoreable character';
      }
    }
    return wordScore;

  },
  highestScoreFrom(arrayOfWords) {
    if (arrayOfWords.length === 0) {
      throw 'Please provide some words to score!'
    }

    if (arrayOfWords.length === 1) {
      return arrayOfWords[0];
    }

    let winner = arrayOfWords[0]

    for (let word of arrayOfWords) {
      let score = Scrabble.score(word);
      let winningScore = Scrabble.score(winner);

      if (winningScore < score) {
        winner = word;
      } else if (winningScore === score) {
        if (word.length === 7) {
          winner = word;
        } else if (winner.length === 7) {
          //handles if the existing winning word is also 7 so no reassignment
        } else if (word.length < winner.length) {
          winner = word;
        }
      }
    }
    return winner;
  }
};

Scrabble.Player = class {
  constructor(name) {
    if (name == null || name == "") {
      throw 'Requires a name';
    } else {
        this.name = name;
        this.plays = [];
    }
  }

  play(word) {
    if (word.length === 0 || word === null || word === "") {
      throw 'Please enter a word to play';
    } else {
        Scrabble.score(word);
        this.plays.push(word);
        return this.plays;
    }
  }

  plays() {
    //this should return an array of the words that a player has played so far
    return this.plays;
  }
};


module.exports = Scrabble;

// Driver code
let words = ['ate','academy']
console.log(Scrabble.highestScoreFrom(words))

let anne = new Scrabble.Player('Anne');
console.log(anne.play('apple'));
