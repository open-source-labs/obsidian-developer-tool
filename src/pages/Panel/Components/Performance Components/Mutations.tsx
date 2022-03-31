import React, {useState, useEffect} from 'react'
import Log from './Log'

//component to hold mutation logs
const Mutations = (props) => {
    const logs = [];
    for (let i=0; i<props.data.length; i++){
        logs.push(<Log key={`${i}.m`} name={`${i}. Mutation`} onClick={() => props.setGraphqlData(props.data[i])}/>)
    }

    return(
        <div>
            {logs}
        </div>
    )
}

export default Mutations