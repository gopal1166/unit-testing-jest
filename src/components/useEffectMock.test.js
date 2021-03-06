import React from 'react'
import { render, fireEvent, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import axiosMock from 'axios'
import Fetch from './useEffectMock';
import { act } from 'react-dom/test-utils';

jest.mock('axios')

it('should fetch and display data', async () => {

    act(() => {
        axiosMock.get.mockResolvedValueOnce({ data: { greeting: "hello there" } });
    })
    const url = "/greeting";
    const { container, getByTestId } = render(<Fetch url={url} />);
    const resolvedSpan = await waitForElement(() => getByTestId("greetingResp"));
    expect(resolvedSpan).toHaveTextContent('hello')

})