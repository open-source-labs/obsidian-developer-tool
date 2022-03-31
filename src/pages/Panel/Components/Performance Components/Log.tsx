import React, { useState, useEffect } from "react"

//creates logs for queries and mutations
const Log = (props) => {
    return (
        <div className='log' onClick={props.onClick}>
            {props.name}
            <br></br>
            {/* {props.date} */}
        </div>
    )
}

export default Log