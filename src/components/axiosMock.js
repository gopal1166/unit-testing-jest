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

// import React, { useState } from 'react'
// import axios from 'axios'

// export default function FetchPosts({ url }) {
//   const [greeting, setGreeting] = useState([])
//   const [buttonClicked, setButtonClicked] = useState(false)

//   const fetchGreeting = async () => {
//     const response = await axios.get(url)
//     const data = response && response.data
//     console.log("Data", data);
    
//     // const { greeting } = data
//     setGreeting(data)
//     setButtonClicked(true)
//   }

//   const buttonText = buttonClicked ? 'Ok' : 'Load Greeting'

//   return (
//     <div>
//       <button onClick={fetchGreeting} disabled={buttonClicked}>
//         {buttonText}
//       </button>
//       {greeting ? <h1 data-testid='greetingRes'>{greeting}</h1> : null}
//     </div>
//   )
// }

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const FetchPosts = () => {
//     const [data, setData] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         axios.get('https://jsonplaceholder.typicode.com/posts')
//             .then(response => setData(response.data))
//             .catch(error => setError(error))
//     })

//     if (!data) {
//         return <div data-testid='loading'>Loading...</div>
//     }

//     return <div data-testid='data'>{data.greeting}</div>
// }

// export default FetchPosts;
