import React from "react";
<<<<<<< HEAD
import { Button } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "antd/dist/antd.css";
import "./style/app.css";
import TimeLine from "./comppnent/Timeline/index";
import SpecialTable from "./comppnent/Table/index";
=======
import {  Button } from "antd";
import { BrowserRouter as Router, Route, Link  } from "react-router-dom";
import "antd/dist/antd.css";
import './style/app.css';
import TimeLine from "./comppnent/Timeline/index"
>>>>>>> 43863294dcec4ba8a45c43ec1c3688734a94dfb2
class App extends React.Component {
  state = {
    collapsed: false,
    height: document.body.clientHeight,
<<<<<<< HEAD
    menu: [
      {
        id: 1,
        menuAddr: "/component/timeLine",
        name: "时间轴组件"
      },
      {
        id: 2,
        menuAddr: "/comppnent/Table",
        name: "表格定制列"
      }
    ],
    visible: true
=======
    menu:[
        {
            id:1,
            menuAddr:'',
            name:'时间轴组件'
        }
    ],
    visible:true
>>>>>>> 43863294dcec4ba8a45c43ec1c3688734a94dfb2
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
<<<<<<< HEAD
    const { menu, visible } = this.state;
    return (
      <div>
        <div className="header">
          <span>
              Based on Ant Design, expand other functions
          </span>
        </div>
        <Router>
          <div
            style={{ height: this.state.height, left: visible ? "0px" : null }}
            className="taskSidebar"
          >
            <div>
              {menu.map(menuItem => {
                return (
                  <div className="li" key={menuItem.id}>
                    <Link
                      to={menuItem.menuAddr}
                      style={{ color: "black", fontSize: "18px" }}
                    >
                      {menuItem.name}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rightMain">
            <div>
              <Route path="/component/timeLine" component={TimeLine} />
              <Route path="/comppnent/Table" component={SpecialTable} />
            </div>
          </div>
=======
    const {menu,visible} = this.state;
    return (
      <div>
        <div className="header">
            
        </div>
        <Router>
            <div
            style={{height: this.state.height ,left:visible?'0px':null}}
            className="taskSidebar"
            >
            <div>
                
                    {
                        menu.map(menuItem =>{
                            return (
                                <div className="li" key={menuItem.id}>
                                   <Link to="/component/timeLine" style={{    color: 'black',fontSize: '18px'}}>{menuItem.name}</Link>
                                </div> 
                            )
                        })
                    }
                
            </div>
            </div>
            <div className="rightMain">
              <div style={{width:'110px'}}>
              
                  <Route path="/component/timeLine"   component={TimeLine} />
              </div>
            </div>
>>>>>>> 43863294dcec4ba8a45c43ec1c3688734a94dfb2
        </Router>
      </div>
    );
  }
}

export default App;
