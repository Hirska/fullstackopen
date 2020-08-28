import React from 'react'

const Notification = ({ message, success }) => {
    let style = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (message === null) {
        return null
    }
    success ? style = { ...style, color: 'red' } : style = { ...style, color: 'green' }
    return (
        <div style={style}>{message}</div>
    )
}

export default Notification;