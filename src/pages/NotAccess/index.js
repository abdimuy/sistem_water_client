import React from 'react'

const NotAccess = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        color: '#3f51b5',
        flex: 1
      }}
    >No tienes los permisos para acceder a este página</div>
  )
}

export default NotAccess