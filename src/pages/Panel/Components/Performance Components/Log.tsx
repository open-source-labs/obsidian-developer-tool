import React, { useState, useEffect } from "react"

const Log = (props) => {
    return (
        <div id={props.id}>
            {props.type}: {props.url}
            <br></br>
            {props.date}
        </div>
    )
}

export default Log