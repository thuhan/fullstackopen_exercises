import React from 'react'

const Notification = ({ notification }) => {

  if (notification.message === null)
    return null
  
  return (
    <div className={notification.notiType}>
      {notification.message}
    </div>
  )
}

export default Notification