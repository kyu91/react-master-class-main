import React, { useState } from 'react';
import styled, { keyframes } from "styled-components";

function App() {
  const [value, setValue] = useState("")
  const onCange = (event:React.FormEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  }
  return( 
    <div>
      <form>
        <input value={value} onChange={onCange} type="text" placeholder='username'></input>
        <button>Log in</button>
      </form>
    </div>
  )
}

export default App;
