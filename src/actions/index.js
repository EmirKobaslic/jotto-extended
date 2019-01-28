import axios from 'axios'

import { getLetterMatchCount } from '../helpers'

export const actionTypes = {
  CORRECT_GUESS: 'CORRECT_GUESS',
  GUESS_WORD: 'GUESS_WORD',
  SET_SECRET_WORD: 'SET_SECET_WORD',
  RESET_GAME: 'RESET_GAME'
}

/**
 * Returns Redux Thunk that dispatches GUESS_WORD action
 * and (conditionally) CORRECT_GUESS action
 * @function guessWord
 * @param {string} guessedWord 
 * @returns {function} - Redux Thunk function
*/
export const guessWord = (guessedWord) => {
  return function(dispatch, getState) {
    const secretWord = getState().secretWord
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord)

    dispatch({
      type: actionTypes.GUESS_WORD,
      payload: { guessedWord, letterMatchCount }
    })

    if (guessedWord === secretWord) {
      dispatch({
        type: actionTypes.CORRECT_GUESS
      })
    }

  }
}

export const getSecretWord = (newWord) => {
  return (dispatch) => {
    if (typeof(newWord) === 'undefined') {
      return axios.get('http://localhost:3030')
      .then(response => {
        dispatch({
          type: actionTypes.SET_SECRET_WORD,
          payload: response.data
        })
      })
    } else {
      dispatch({
        type: actionTypes.SET_SECRET_WORD,
        payload: newWord
      })
    }
  }
}

export const resetGame = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.RESET_GAME
    })
  }
}