import React from 'react'

function Navbar() {
  return (
    <div style={style.navbar}>
      <h3>Adaptive Learning System</h3>
    </div>
  )
}

const style = {
    navbar:{
        width:'100%',
        backgroundColor:'red',
        padding:12,
        position: 'absolute',
        display:'none'
    }
}

export default Navbar
