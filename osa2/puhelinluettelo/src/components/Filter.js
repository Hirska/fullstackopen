import React from 'react'

const Filter = ({ handleChange, value }) => (
    <div>
        filter shown with <input value={value} onChange={handleChange} />
    </div>
)

export default Filter