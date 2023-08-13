import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import ButtonLng from './index'

describe('<ButtonLng />', () => {
  let mockChangeFunction

  beforeEach(() => {
    mockChangeFunction = jest.fn()
  })

  it('renders the given label', () => {
    const { getByText } = render(
      <ButtonLng onChangeLng={mockChangeFunction} onChangeLngArgs="en" label="English" />,
    )

    expect(getByText('English')).toBeInTheDocument()
  })

  it('triggers the onChangeLng function when clicked', () => {
    const { getByText } = render(
      <ButtonLng onChangeLng={mockChangeFunction} onChangeLngArgs="en" label="English" />,
    )

    fireEvent.click(getByText('English'))
    expect(mockChangeFunction).toHaveBeenCalledWith('en')
  })

  it('renders the correct icon based on the onChangeLngArgs', () => {
    const { rerender, container } = render(
      <ButtonLng onChangeLng={mockChangeFunction} onChangeLngArgs="en" label="English" />,
    )

    let icon = container.querySelector('svg')
    expect(icon).toBeInTheDocument() // Check if any icon is rendered
    // Add more specific checks if needed, based on how icons differ from one another

    rerender(<ButtonLng onChangeLng={mockChangeFunction} onChangeLngArgs="ko" label="Korean" />)
    icon = container.querySelector('svg')
    expect(icon).toBeInTheDocument()

    // Additional tests for other icons can be added similarly
  })

  // Additional test cases, such as handling of unexpected onChangeLngArgs values, can be added as needed
})
