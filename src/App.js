import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';

import GuessedWords from './GuessedWords'
import Congrats from './Congrats'
import GuessedWordsNumber from './GuessedWordsNumber'
import Input from './Input'
import NewWord from './NewWord'
import { getSecretWord, guessWord } from './actions'

export class UnconnectedApp extends Component {

  /**
   * @method componentDidMount
   * @returns {undefined}
  */
  componentDidMount() {
    // get the secret word
    this.props.getSecretWord()
  }

  testfunction() {
    console.log('I am a test')
  }

  state = {
    clickNumber: 0,
    showGiveUpMessage: false,
    showEnterSecretWordInput: false
  }
  
  handleGiveUp = (event, status) => {
    event.preventDefault()
    let showGiveUpMessage
    if (!status) {
      showGiveUpMessage = false
    } else {
      showGiveUpMessage = true
    }
    this.setState({
      showGiveUpMessage: showGiveUpMessage
    })
  }

  handleShowEnterSecretwordInput = () => {
    this.setState({
      showEnterSecretWordInput: !this.state.showEnterSecretWordInput
    })
  }

  handleHelloClick = async () => {
    await this.setState({
      clickNumber: this.state.clickNumber + 1
    })
    console.log(this.state.clickNumber)
  }

  render() {
    return (
      <div className="container" data-test="app-component">
        <h1>Jotto</h1>
        <div>The secret word is {this.props.secretWord}</div>
        <Congrats success={this.props.success}  />
        <NewWord 
        success={this.props.success} 
        showGiveUpMessage={this.state.showGiveUpMessage}
        handleGiveUp={this.handleGiveUp}
        />
        {!this.state.showEnterSecretWordInput && 
          <Input 
            guessedWords={this.props.guessedWords} 
            handleGiveUp={this.handleGiveUp} 
            showGiveUpMessage={this.state.showGiveUpMessage}
            secretWord={this.props.secretWord} 
            success={this.props.success} 
          />}
        {this.props.helloDisplay && 
          <h2 data-test='hello-text' onClick={() => {this.handleHelloClick()}}>Hello</h2>
        }
        <GuessedWords guessedWords={this.props.guessedWords} />
        <GuessedWordsNumber guessedWords={this.props.guessedWords} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { success, guessedWords, secretWord } = state
  return { success, guessedWords, secretWord }
}

export default connect(mapStateToProps, { getSecretWord, guessWord })(UnconnectedApp);