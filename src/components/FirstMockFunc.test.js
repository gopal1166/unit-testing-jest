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

