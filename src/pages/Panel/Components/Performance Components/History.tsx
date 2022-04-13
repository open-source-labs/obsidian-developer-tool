import React, { useState, useEffect } from "react"
import Mutations from "./Mutations"
import Queries from "./Queries"
import { Routes, Route } from 'react-router-dom'

const History = (props) => {
    return (
        <div id='history'>
            <Routes>
                <Route path='/query' element={<Queries data={props.queryData} setGraphqlData={props.setGraphqlData}/>}></Route>
                <Route path='/mutation' element={<Mutations data={props.mutationData} setGraphqlData={props.setGraphqlData}/>}></Route>
            </Routes>
        </div>
    )
}

export default History