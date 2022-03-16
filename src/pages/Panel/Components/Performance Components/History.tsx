import React, { useState, useEffect } from "react"
import Mutations from "./Mutations"
import Queries from "./Queries"

const History = (props) => {
    return (
        <div>
            <Queries data={props.queryData}/>
            <Mutations data={props.mutationData}/>
        </div>
    )
}

export default History