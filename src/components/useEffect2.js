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