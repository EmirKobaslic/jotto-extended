import React from 'react'

export default class GuessedWordsNumber extends React.Component {
  render() {
      return (
        <div>
        {this.props.guessedWords.length !== 0 &&
            <div data-test='guessed-words-number-component'>
              <div data-test='guessed-words-number'>
                Total Guesses: {this.props.guessedWords.length}
              </div>
            </div>
          }    
        </div>
      )
  }
}