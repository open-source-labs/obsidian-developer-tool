import React, { useState } from "react";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";


import { FiHome, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { BiCog } from "react-icons/bi";
import {MdExplore} from "react-icons/Md"
import {GoDatabase} from 'react-icons/Go'
import {GrDocumentPerformance} from 'react-icons/Gr'


import "react-pro-sidebar/dist/css/styles.css";
import "./AppBar.css";


type Props = {
    count: number
    setCount: Function
}
const Header = (props:Props) => {
    
   
    const [menuCollapse, setMenuCollapse] = useState(false)

    
  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="header">
        <ProSidebar collapsed={menuCollapse}>
            
          <SidebarHeader>
          <div className="logotext" >
              {!menuCollapse ? (
              <p>{'Obsidian Developer Tool'}</p>
              ) : ( 
                  <div></div>
                  )}
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={false} icon={<FiHome />}>
                Home
              </MenuItem>
              <MenuItem onClick={() => props.setCount(props.count=1)} icon={<GrDocumentPerformance />}>Performance</MenuItem>
              <MenuItem onClick={() => props.setCount(props.count=2)} icon={<GoDatabase />}>Cache</MenuItem>
              <MenuItem onClick={() => props.setCount(props.count=3)} icon={<MdExplore />}>Playground</MenuItem>
              <MenuItem onClick={() => props.setCount(props.count=4)} icon={<BiCog />}>Settings</MenuItem>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;
