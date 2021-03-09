import React from "react";
import { Tabs } from "antd";
import "./WebchatMaster.css";
import MessageMaster from "./MessageMaster";
import MyVenue from "./MyVenue/MyVenue";
import OtherVenue from "./OtherVenue/OtherVenue";
import ProfileSearch from "./ProfileSearch";


const { TabPane } = Tabs;

class WebchatMaster extends React.Component {
  callback = key => {
    console.log(key);
  };
  render() {
    const { TabPane } = Tabs;
    const { myVenueData, otherVenueData} = this.props; 
    console.log('activefds',this.props.tab)
    return (
      <div className="newchatlist"> 
      
        <Tabs  onChange={this.props._changeActiveTab}>
          <TabPane tab="My Venues" key="0">
            <div>
              <ProfileSearch tab="0" 
              onSearch={this.props.onSearch}
              clear={this.props.clear}
              />
              {

                myVenueData.length>0 && myVenueData.map((item, i) => {
                  return (<MyVenue
                    data={item}
                    tab="0"
                    _onClick={this.props.onClick} 
                    active={this.props.activeVenue}
                    
                  />)
                })


              }

              
            </div>
           
          </TabPane>
          <TabPane tab="Other Venues" key="1">
            <div><ProfileSearch tab="1"
              onSearch={this.props.onSearch1}
              clear={this.props.clear}
              />
              {

                 otherVenueData.length>0 &&  otherVenueData.map((list, i) => {
                  return (<MyVenue
                    data={list}
                    tab="1" 
                    _onClick={this.props.onClick}
                    active={this.props.activeVenue}
                  />)
                })

              }

            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
  componentDidMount(){
    console.log(this.refs.tabsview)
  }
}
export default WebchatMaster;
