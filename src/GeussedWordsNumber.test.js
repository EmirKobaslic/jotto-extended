import React from 'react'
import { shallow } from 'enzyme'
import { findByTestAttr } from '../test/testUtils'

import GuessedWordsNumber from './GuessedWordsNumber'
import guessedWordsReducer from './reducers/guessedWordsReducer';

const defaultProps = {
  guessedWords: []
}

/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @returns {ShallowWrapper}
*/
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props }
  return shallow(<GuessedWordsNumber {...setupProps} />)
}

describe('no geussed words', () => {
  const wrapper = setup()

  test('component does not render if there are no guessed words', () => {
    const component = findByTestAttr(wrapper, 'guessed-words-number-component')
    expect(component.length).toBe(0)
  })
  test('div that shows number of guesses does not render if there are no guessed words', () => {
    const guessedWordsNumberDiv = findByTestAttr(wrapper, 'guessed-words-number')
    expect(guessedWordsNumberDiv.length).toBe(0)
  })
})

describe('words have been guessed', () => {
  const guessedWords = [
    { guessedWord: 'train', letterMatchCount: 3 },
    { guessedWord: 'agile', letterMatchCount: 1 },
    { guessedWord: 'party', letterMatchCount: 5 },
  ]

  const wrapper = setup({ guessedWords })

  test('component does render if there are words guessed', () => {
    const component = findByTestAttr(wrapper, 'guessed-words-number-component')
    expect(component.length).toBe(1)
  })
  test('div that shows number of guesses renders if there are words guessed', () => {
    const geussedWordsNumberDiv = findByTestAttr(wrapper, 'guessed-words-number')
    expect(geussedWordsNumberDiv.text()).not.toBe('')
  })
  test('number of guesses matches the length of the guessedWords array', () => {
    const guessedWordsNumber = findByTestAttr(wrapper, 'guessed-words-number')
    expect(guessedWordsNumber.text()).toMatch('3')
  })
})
