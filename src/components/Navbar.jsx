import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
      <Link to="/" style={{alignSelf: 'center'}}>Recipe Collection</Link>
      <ul>
        <li style={{listStyle: 'none'}}><Link to="/recipes/add">Add Recipe</Link></li>
      </ul>
    </div>
  )
}

export default Navbar