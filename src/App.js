import React from "react";
import {  Button } from "antd";
import { BrowserRouter as Router, Route, Link  } from "react-router-dom";
import "antd/dist/antd.css";
import './style/app.css';
import TimeLine from "./comppnent/Timeline/index"
class App extends React.Component {
  state = {
    collapsed: false,
    height: document.body.clientHeight,
    menu:[
        {
            id:1,
            menuAddr:'',
            name:'时间轴组件'
        }
    ],
    visible:true
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
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
        </Router>
      </div>
    );
  }
}

export default App;
