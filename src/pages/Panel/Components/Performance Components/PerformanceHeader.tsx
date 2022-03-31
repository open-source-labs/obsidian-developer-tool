import React, {useState} from "react"
import { Link } from 'react-router-dom'

//component that renders query or mutation logs on click
const PerformanceHeader = (props) => {
    const [query, setQuery] = useState('tab1')
    const [mutation, setMutation] = useState('tab2')

    //conditional rendering changes state to change hidden property on css
    const activateQuery = () => {
        setQuery('tab3')
        setMutation('tab2')
    }

    const activateMutation = () => {
        setQuery('tab1')
        setMutation('tab4')
    }
  
    return(
        <div id='performance-header'>
            <div id='performance-header-title'>
                History Logs
            </div>
            <div className="tabs">
            <Link to='/query'><div id='query-tab' onClick={activateQuery}>
                    <input type="radio" className="tabs__radio" name="tabs-example" id={query} checked />
                    <label htmlFor="tab1" id='tab-1-label' className="tabs__label">Queries</label>
                </div></Link>
                <Link to='/mutation'><div id='mutation-tab' onClick={activateMutation}>
                    <input type="radio" className="tabs__radio" name="tabs-example" id={mutation} />
                    <label htmlFor="tab2" className="tabs__label">Mutations</label>
                </div></Link>
            </div>
        </div>
    )
}

export default PerformanceHeader
