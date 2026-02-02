import React from 'react'
import { NavLink } from 'react-router-dom'

const navbar = () => {
  return (
    <div className="nav-section">
      <NavLink to="/create-post">Create Post</NavLink>
      <NavLink to="/feed-section">Feed</NavLink>
      
    </div>
  )
}

export default navbar
