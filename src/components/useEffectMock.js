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
