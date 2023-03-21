import React from 'react'
import { useOutletContext } from 'react-router-dom'

interface IFollowersContext{
    nameOfMyUser: string;
}

const Followers = () => {
    const {nameOfMyUser} = useOutletContext<IFollowersContext>();
    console.log(nameOfMyUser)
  return (
    <div>
        <h1>Followers {nameOfMyUser}</h1>
    </div>
  )
}

export default Followers