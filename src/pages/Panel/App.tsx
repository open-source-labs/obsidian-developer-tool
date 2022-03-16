import { useState } from "react";
import Header from "./Components/AppBar";
import Playground from '/Users/yasir/Desktop/obsidian-developer-tool/src/pages/Panel/Components/Routes/Playground.js'
import Cache from '/Users/yasir/Desktop/obsidian-developer-tool/src/pages/Panel/Components/Routes/Cache.js'
import Performance from  '/Users/yasir/Desktop/obsidian-developer-tool/src/pages/Panel/Components/Routes/Performance.js'




const App = () => {
  const [count, setCount] = useState<number>(0);


  
  return (
    <> 
    <div>
     <Header count={count} setCount={setCount} />
    </div>

     <div> 
     {(count===1) ? (
                <Performance/>
              ) : (
             <div> </div>
              )}
      {(count===2) ? (
                <Cache/>
              ) : (
             <div> </div>
              )}
       {(count===3) ? (
                <Playground/>
              ) : (
             <div> </div>
              )}
     </div>

     </>
  );
};

export default App;
