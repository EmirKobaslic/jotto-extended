import React, { Component } from 'react'
import {connect} from 'react-redux'

import { guessWord } from './actions'

export class UnconnectedInput extends Component {
  handleSubmit = (event) => {
    // don't submit form
    event.preventDefault()
    const guessedWord = this.inputBox.current.value
    if (guessedWord && guessWord.length > 0) {
      this.props.guessWord(guessedWord)
    }

    this.inputBox.current.value= ''
  }

  handleGiveUp = (event) => {
    this.props.handleGiveUp(event, true)
  }
  /**
   * Create ref for input box
   * @method constructor
   * @param {object} props 
   * @returns {undefined}
  */
  constructor(props) {
    super(props)
    this.inputBox = React.createRef()
  }

  /**
   * Render the component
   * @method render
   * @returns {JSX.Element} - Rendered component
  */
  render() {
    let giveUpButton
    if (this.props.guessedWords.length >= 1 && !this.props.success) {
      giveUpButton = (
        <button
        data-test="give-up-button"
        className="btn btn-secondary mb-2"
        type="submit"
        style={{
          marginLeft: 20
        }}
        onClick={this.handleGiveUp}
        >
          Give Up
        </button>
      )
    }
    const contents = this.props.success ? null : (
    <form className="form-inline">
      <input 
        data-test="input-box" 
        ref={this.inputBox}
        className="mb-2 mx-sm-3"
        id="word-guess"
        type="text"
        placeholder="enter guess"
      />
      <button
        data-test="submit-button"
        className="btn btn-primary mb-2"
        type="submit"
        onClick={this.handleSubmit}
      >
        Submit
      </button>
      {giveUpButton}
    </form>
  )
    return (
      <div>
        {!this.props.showGiveUpMessage && 
          <div data-test="component-input">
          {contents}
        </div>
        }
        {this.props.showGiveUpMessage && 
          <div data-test='give-up-message' className='alert alert-danger'>
            The secret word was "{this.props.secretWord}".
            Better luck next time!
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ success, guessedWords, secretWord }) => {
  return { success, guessedWords, secretWord }
}

export default connect(mapStateToProps, { guessWord })(UnconnectedInput)