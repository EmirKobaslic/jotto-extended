import React from 'react'
import { shallow } from 'enzyme'
import App, { UnconnectedApp } from './App'
import { findByTestAttr } from '../test/testUtils'

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component
 * @function setup
 * @param {object} initialState - Initial state for this setup
 * @returns {ShallowWrapper}
*/
const setup = (initialState = {}) => {
  const wrapper = shallow(<UnconnectedApp {...initialState} />)
  return wrapper
}

describe('redux properties', () => {
  test('renders the App component', () => {
    const wrapper = setup({ guessedWords: [{}] })
    const component = findByTestAttr(wrapper, 'app-component')
    expect(component.length).toBe(1);
  })
  test('has access to `success` state', () => {
    const success = true
    const wrapper = setup({ success, guessedWords: [{}] })
    const successProp = wrapper.instance().props.success
    expect(successProp).toBe(success)
  })
  test('has access to `secretWord` state', () => {
    const secretWord = 'party'
    const wrapper = setup({ secretWord, guessedWords: [{}] })
    const secretWordProp = wrapper.instance().props.secretWord
    expect(secretWordProp).toBe(secretWord)
  })
  test('has access to `guessedWords state`', () => {
    const guessedWords = [{ guessedWord: 'train', letterMatchCount: 3, guessedWords: [{}] }]
    const wrapper = setup({ guessedWords })
    const guessedWordsProp = wrapper.instance().props.guessedWords
    expect(guessedWordsProp).toEqual(guessedWords)
  })
})

test('`getSecretWord` runs on App mount', () => {
  const getSecretWordMock = jest.fn()

  const props = {
    getSecretWord: getSecretWordMock,
    success: false,
    guessedWords: []
  }

  // set up app componennt with getSecredWordMock as the getSecretWord prop
  const wrapper = shallow(<UnconnectedApp {...props} />)

  // run lifecycle method
  wrapper.instance().componentDidMount()

  // check to see if our mock ran
  const getSecretWordCallCount = getSecretWordMock.mock.calls.length
  
  expect(getSecretWordCallCount).toBe(1)

})

