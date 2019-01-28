import React from 'react'
import { shallow } from 'enzyme'
import { findByTestAttr } from '../test/testUtils'

import { UnconnectedNewWord } from './NewWord'

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component
 * @function setup
 * @param {object} initialState - Initial state for this setup
 * @returns {ShallowWrapper}
*/
const setup = (initialState = {}) => {
  const wrapper = shallow(<UnconnectedNewWord {...initialState} />)
  return wrapper
}

describe('when `success` prop is true', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup({ success: true })
  }) 
  test('component renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-new-word')
    expect(component.length).toBe(1)
  })
  test('`New Word` button renders', () => {
    const newWordButton = findByTestAttr(wrapper, 'new-word-button')
    expect(newWordButton.length).toBe(1)
  })
  test('`New Word` button text renders', () => {
    const newWordButton = findByTestAttr(wrapper, 'new-word-button')
    expect(newWordButton.text()).not.toBe('')
  })
  test('has `success` equal true piece of state as prop', () => {
    const success = true
    const successProp = wrapper.instance().props.success
    expect(successProp).toBe(success)
  })
})

describe('when `success` prop is false', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup( { success: false } )
  })

  test('component renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-new-word')
    expect(component.length).toBe(1)
  })
  test('`New Word` button does not render', () => {
    const newWordButton = findByTestAttr(wrapper, 'new-word-button')
    expect(newWordButton.length).toBe(0)
  })
  test('has `success` equal false piece of state as prop', () => {
    const success = false
    const successProp = wrapper.instance().props.success
    expect(successProp).toBe(success)
  })
})