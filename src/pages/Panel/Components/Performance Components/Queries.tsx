import React, {useState, useEffect} from 'react'
import Log from './Log'

//component that displays query logs
const Queries = (props) => {
    
    const logs = [];
    for (let i=0; i<props.data.length; i++){
        logs.push(<Log key={`${i}.q`} name={`${i}. Query`} onClick={() => props.setGraphqlData(props.data[i])}/>)
    }

    return(
        <div>
            {logs}
        </div>
    )
}

export default Queries