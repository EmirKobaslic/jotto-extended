import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, storeFactory } from '../test/testUtils'
import { UnconnectedInput } from './Input'

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component
 * @function setup
 * @param {object} initialState - Initial state for this setup
 * @returns {ShallowWrapper}
*/
const setup = (initialState = {}) => {
  const store = storeFactory(initialState)
  const wrapper = shallow(<UnconnectedInput {...initialState} />)
  return wrapper
}

describe('render', () => {
  describe('word has not been guessed', () => {
    let wrapper
    beforeEach(() => {
      const initialState = { success: false, guessedWords: [{}] }
      wrapper = setup(initialState)
    })
    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input')
      expect(component.length).toBe(1)
    })
    test('renders input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box')
      expect(inputBox.length).toBe(1)
    })
    test('renders submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button')
      expect(submitButton.length).toBe(1)
    })
  })
  describe('word has been guessed', () => {
    let wrapper
    beforeEach(() => {
      const initialState = { success: true, guessedWords: [{}]  }
      wrapper = setup(initialState)
    })
    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input')
      expect(component.length).toBe(1)
    })
    test('does not render input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box')
      expect(inputBox.length).toBe(0)
    })
    test('does not render submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button')
      expect(submitButton.length).toBe(0)
    })
  })
})

describe('redux props', () => {
  test('has success piece of state as prop', () => {
    const success = true
    const wrapper = setup({ success: true, guessedWords: [{}]  })
    const successProp = wrapper.instance().props.success
    expect(successProp).toBe(success)
  })
})

describe('`guessWord` testing', () => {
  let guessWordMock
  let wrapper
  const guessedWord = 'train'
  beforeEach(() => {
    // set up mock for guessWord
    guessWordMock = jest.fn() 
    const props = {
      guessWord: guessWordMock,
      guessedWords: [{}] 
    }
    wrapper = shallow(<UnconnectedInput {...props} />)

    // add value to input box
    wrapper.instance().inputBox.current = { value: guessedWord }

    const submitButton = findByTestAttr(wrapper, 'submit-button')
    submitButton.simulate('click', { preventDefault() {} })
  })
  test('calls `guessWord` when submit button is clicked', () => {
    const guessWordCallCount = guessWordMock.mock.calls.length
    expect(guessWordCallCount).toBe(1)
  })
  test('calls `guessWord` with input value as argument', () => {
    console.log(guessWordMock.mock.calls)
    const guessWordArg = guessWordMock.mock.calls[0][0]
    expect(guessWordArg).toBe(guessedWord)
  })
  test('input box clears on submit', () => {
    expect(wrapper.instance().inputBox.current.value).toBe('')
  })
})

describe('`Give Up` button testing', () => {
  const guessedWords = [
    { guessedWord: 'train', letterMatchCount: 3 }
  ]
  test('button renders upon first incorrect guess', () => {
  const initialState = { success: false, guessedWords: guessedWords }
    const wrapper = setup(initialState)
    const giveUpButton = findByTestAttr(wrapper, 'give-up-button')
    expect(giveUpButton.length).toBe(1)
  })
  test('`give-up-message` appears when button is pressed', () => {
    const initialState = { success: false, guessedWords: guessedWords, showGiveUpMessage: true }
    const wrapper = setup(initialState)
    const giveUpMessage = findByTestAttr(wrapper, 'give-up-message')
    expect(giveUpMessage.length).toBe(1)
  })
  test('`give-up-message` has text when button is pressed', () => {
    const initialState = { success: false, guessedWords: guessedWords, showGiveUpMessage: true }
    const wrapper = setup(initialState)
    const giveUpMessage = findByTestAttr(wrapper, 'give-up-message')
    expect(giveUpMessage.text('')).not.toBe('')
  })
  test('button does not render when guess was correct', () => {
    const wrapper = setup({ success: true, guessedWords: guessedWords })
    const giveUpButton = findByTestAttr(wrapper, 'give-up-button')
    expect(giveUpButton.length).toBe(0)
  })
  test('button does not render when no guesses have been made', () => {
    const wrapper = setup({ success: false, guessedWords: [] })
    const giveUpButton = findByTestAttr(wrapper, 'give-up-button')
    expect(giveUpButton.length).toBe(0)
  })
  test('`give-up-message` does not appear when button is not pressed', () => {
    const initialState = { success: false, guessedWords: [] }
    const wrapper = setup(initialState)
    const giveUpMessage = findByTestAttr(wrapper, 'give-up-message')
    expect(giveUpMessage.length).toBe(0)
  })
})