import { useState } from "react";
import Header from "./Components/AppBar";
import Playground from './Components/Routes/Playground.js' 
import Cache from './Components/Routes/Cache.js'
import Performance from  './Components/Routes/Performance.js'




const App = () => {
  const [count, setCount] = useState<number>(0);


  
  return (
    <div style={{display: "flex", width: '100%', height: '100vh'}}> 
     <Header count={count} setCount={setCount}/>

     {(count===1) ? (
                <Performance/>
              ) : (
             <div> </div>
              )}
      {(count===2) ? (
                <Cache style={{width: '100%'}}/>
              ) : (
             <div> </div>
              )}
       {(count===3) ? (
                <Playground/>
              ) : (
             <div> </div>
              )}
     </div>
  );
};

export default App;
