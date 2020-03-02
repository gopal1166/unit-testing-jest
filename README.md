## Getting started with mock functions

```
/** FirstMockFunc.js */ 

import React from 'react';

const FirstMockFunc = () => <div data-test='firstMockFunc'>hi</div>;

export default FirstMockFunc;

```

### Mock func create, changin return value, implementation
```
/** FirstMockFunc.test.js */ 

import React from 'react';
import { shallow } from 'enzyme';
import { findByAttr } from '../utils/TestUtils';
import FirstMockFunc from './FirstMockFunc';

let wrapper;
const setup = () => {
  wrapper = shallow(<FirstMockFunc />);
  return wrapper;
}

beforeAll(() => {
  setup();
});

test ('should render', () => {
    const res = findByAttr(wrapper, 'firstMockFunc');
    expect(res.length).toBe(1);
})

// mock functions
test('undefined by default', () => {
    const mock = jest.fn();
    const result = mock('belo');
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith('belo');
    expect(result).toBeUndefined();
})

// change return value
test('change return value', () => {
    const mock = jest.fn(name => name);
    const result = mock('ram');

    expect(result).toBe('ram');
    expect(mock).toHaveBeenCalledWith('ram');
});

// mock implementation at once
test('mock implementation once', () => {
    const mock = jest.fn().mockImplementationOnce((name) => name);
    expect(mock('ram')).toBe('ram');
    expect(mock).toHaveBeenCalledWith('ram');

    expect(mock('gopal')).toBe(undefined);
    expect(mock).toHaveBeenCalledWith('gopal');
})
```

--------------

# mocking axios on button click

### axiosMock.js: 
on button click making axios call, setting data, updating DOM with response
```
/** axiosMock.js */

import React, { useState } from 'react'
import axios from 'axios'

const  Fetch = ({ url }) => {
  const [greeting, setGreeting] = useState('')
  const [buttonClicked, setButtonClicked] = useState(false)

  const fetchGreeting = async () => {
    const response = await axios.get(url)
    const data = response.data
    console.log("data in axiosMock: ", data);
    
    const { greeting } = data
    setGreeting(greeting)
    setButtonClicked(true)
  }

  const buttonText = buttonClicked ? 'Ok' : 'Load Greeting'

  return (
    <div>
      <button onClick={fetchGreeting} disabled={buttonClicked}>
        {buttonText}
      </button>
      {greeting ? <h1 data-testid='greetingRes'>{greeting}</h1> : null}
    </div>
  )
}

export default Fetch;
```

## axiosMock.test.js:
mocking axios call and returning custom data, checking the updated data on DOM.
```
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

});
```

## mocking axios call in useEffect

### useEffectMock.js:
making an axios call in useEffect and updating DOM.
```
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const  Fetch = ({ url }) => {
  const [greeting, setGreeting] = useState('')
  const [loader, setLoader] = useState(false)

  const fetchGreeting = async () => {
    const response = await axios.get(url)
    const data = response.data
    console.log(
        "data", data
    );
    
    const { greeting } = data
    setGreeting(greeting)
    setLoader(true)
  }

  useEffect(() => {
      console.log("calling useEffect");
      
      fetchGreeting();
  }, [])

  const loaderText = loader ? 'Ok' : 'Load Greeting'

  return (
    <div>
        <div data-testid='loader'>{loaderText}</div>
      {greeting ? <h1 data-testid='greetingResp'>{greeting}</h1> : null}
    </div>
  )
}

export default Fetch;
```

## useEffectMock.test.js:
mocking axios in useEffect, setting fake data
```
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

});
```

## useEffect2.js:
updating hook state in useEffect
```
import React, { useEffect, useState } from 'react';

const useEffect2 = () => {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');

    const setMyName = (myName) => {
        setName(myName);
    }

    useEffect(() => {
        setCount(3);
        setMyName('Gopal');
    });

    return (
        <div>
            <div data-testid='count'>{count}</div>
            <div data-testid='name'>{name}</div>
        </div>
    )
}

export default useEffect2;
```

## useEffect2.test.js:
testing the DOM if rendered with updated hook state data
```
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
```
