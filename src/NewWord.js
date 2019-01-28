import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getSecretWord, resetGame } from './actions'

export class UnconnectedNewWord extends React.Component {
  getSecretWord = (event) => {
    this.props.resetGame()
    this.props.getSecretWord()
    this.props.handleGiveUp(event, false)
  }
  render() {
    if (this.props.success || this.props.showGiveUpMessage) {
      return (
        <div data-test="component-new-word">
          <button
            data-test='new-word-button'
            className='btn btn-primary mb-2'
            type='submit'
            onClick={this.getSecretWord}
          >
            New Word
          </button>
        </div>
      )
    } else {
      return <div data-test="component-new-word"></div>
    }
  }
}

UnconnectedNewWord.propTypes = {
  success: PropTypes.bool.isRequired
}

const mapStateToProps = ({ success }) => {
  return { success }
}

export default connect(mapStateToProps, { getSecretWord, resetGame })(UnconnectedNewWord);