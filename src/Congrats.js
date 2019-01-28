import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * Functional react component for congratulatory message.
 * @function
 * @param {object} props - React props
 * @returns {JSX.Element} 
*/

export class UnconnectedCongrats extends React.Component {
    render() {
    if (this.props.success) {
      return(
        <div data-test="component-congrats" className='alert alert-success'>
          <span data-test="congrats-message">
            Congrats! You guessed the word!
          </span>
        </div>
      )
    } else {
      return (
        <div data-test='component-congrats' />
      )
    }
  }
}

UnconnectedCongrats.propTypes = {
  success: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ success }) => {
  return { success }
}

export default connect(mapStateToProps)(UnconnectedCongrats)
