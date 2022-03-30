import React, {useState, useEffect} from 'react'
import Log from './Log'

const Queries = (props) => {
    const logs = [];
    for (let i=0; i<props.data.length; i++){
        logs.push(<Log key={i} name={`${i}. Query`} onClick={() => props.setGraphqlData(props.data[i])}/>)
    }

    return(
        <div>
            {logs}
        </div>
    )
}

export default Queries