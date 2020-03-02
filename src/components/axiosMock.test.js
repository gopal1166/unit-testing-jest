// __tests__/fetch.test.js
import React from 'react'
import { render, fireEvent, waitForElement, getByTestId } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import axiosMock from 'axios'
import Fetch from './axiosMock';

jest.mock('axios')

// test('loads and displays greeting', async () => {
//   const url = '/greeting'
//   const { container, getByText, getByRole } = render(<Fetch url={url} />)

//   axiosMock.get.mockResolvedValueOnce({
//     data: { greeting: 'hello there' },
//   })

//   fireEvent.click(getByText('Load Greeting'))
//   const greetingTextNode = await waitForElement(() => getByTestId(container, 'greetingRes'))

// //   expect(axiosMock.get).toHaveBeenCalledTimes(1)
// //   expect(axiosMock.get).toHaveBeenCalledWith(url)
// //   expect(getByRole('heading')).toHaveTextContent('hello there')
// //   expect(getByRole('button')).toHaveAttribute('disabled')
// })


test('should mock axios', async () => {
    // Arrange
    axiosMock.get.mockResolvedValueOnce({
        data: { greeting: "Belo" }
    });
    const url = '/greeting';
    const { container, getByText } = render(<Fetch url={url} />);

    // Act
    
    fireEvent.click(getByText('Load Greeting'));
    const greetingTextNode = await waitForElement(() => getByTestId(container, 'greetingRes'));
    // const greetingTextNode = await waitForElement(() => getByTestId(container, 'greetingRes'))

    // Assert

})