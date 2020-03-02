import React from 'react'
import { render, fireEvent, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import UseEffect2 from './useEffect2';
import { act } from 'react-dom/test-utils';

it('should render updated value from the setCount()', async () => {
    const { container, getByTestId } = render(<UseEffect2  />);

    let resolvedNode;
    act(() => {
        resolvedNode = getByTestId('count');
    });    

    expect(resolvedNode).toHaveTextContent(3);
});
