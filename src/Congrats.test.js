import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, checkProps, storeFactory } from '../test/testUtils'
import { UnconnectedCongrats } from './Congrats'

const defaultProps = { success: false }

/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @returns {ShallowWrapper}
*/
const setup = (initialState = {}) => {
  const store = storeFactory(initialState)
  const wrapper = shallow(<UnconnectedCongrats {...initialState} />)
  return wrapper
}

test('renders without error', () => {
  const wrapper = setup({ success: false })
  const component = findByTestAttr(wrapper, 'component-congrats')
  expect(component.length).toBe(1)
})

test('renders no text when `success` prop false', () => {
  const wrapper = setup({ success: false })
  const component = findByTestAttr(wrapper, 'component-congrats')
  expect(component.text()).toBe('')
})

test('renders no button when `success` prop is false', () => {
  const wrapper = setup({ success: false })
  const newWordButton = findByTestAttr(wrapper, 'new-word-button')
  expect(newWordButton.length).toBe(0)
})

test('renders non-empty congrats message when `success` prop is true', () => {
  const wrapper = setup({ success: true })
  const message = findByTestAttr(wrapper, 'congrats-message')
  expect(message.text().length).not.toBe(0)
})

test('does not throw warning with expected props', () => {
  const expectedProps = { success: false }
  checkProps(UnconnectedCongrats, expectedProps)
})

test('congrats has correct `success` prop', () => {
  const success = true
  const wrapper = setup({ success: true })
  const successProp = wrapper.instance().props.success
  expect(successProp).toBe(success)
})

describe('getSecretWord testing', () => {
  test('`getSecretWord is called`', () => {

  })
})