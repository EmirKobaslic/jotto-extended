import { actionTypes } from '../actions'


/**
 * @function secretWordReducer
 * @param {object} state - State sent to reducer
 * @param {object} action - Action sent to reducer
 * @returns {string} - New state (secret word payload from action)
*/
export default (state = null, action) => {
  switch (action.type) {
    case actionTypes.SET_SECRET_WORD:
      return action.payload
    default:
      return state
  }
}