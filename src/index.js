import React, { Component } from 'react';
import { render } from 'react-dom';
// import Fetch from './components/useEffectMock';
// import Fetch from './components/useEffectMock';

import './style.css';
import UseEffect2 from './components/useEffect2';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      // <Fetch url={'https://jsonplaceholder.typicode.com/posts'}/>
      <UseEffect2 />
    );
  }
}

render(<App />, document.getElementById('root'));
