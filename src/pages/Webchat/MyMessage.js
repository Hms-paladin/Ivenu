import React, { Component } from 'react';

import WebchatMaster from "./WebchatMaster";
import UserDp from "./UserDp";
import MessageMaster from "./MessageMaster";
import OtherVenue from "./OtherVenue/OtherVenue"; 
import ChatView from './ChatView';
import "./MessageMaster.css"; 
import { Typography } from "antd";
import { Spin, Icon } from "antd";

const { Title,Text } = Typography;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const links = "https://api.ivneu.com/api/v1/";

export default class componentName extends Component {
                 constructor(props) {
                   super(props);
                   this.state = {
                     myVenue: [],
                     otherVenue: [],
                     showloading: false,
                     cmyVenue: [],
                     cotherVenue: [],
                     changedText: "",
                     changedText1: "",
                     clear: false,
                     showMessage: false,
                     activeVenue: null,
                     messages: [],
                     venueChatMember: [],
                     showVenueChatList: false,
                     activeReceive: "",
                     activeTab: 0,
                     loginUserId:null,
                     tempVenue:null
                   };
                 } 
                 componentDidMount(){

                   this.getAllVenues();
                  
                 }

                 changeActiveTab=(index)=>{
                     console.log('tab',index)
                     // this.setState({activeTab:index,messages:[],activeVenue:'',showMessage:false})
                 }

                 componentWillMount = () => {

                   if(localStorage.getItem('LoginStatus') && localStorage.getItem('LoginData')){
    
      var LoginData=JSON.parse(localStorage.getItem('LoginData'));
      this.setState({
        loginUserId:LoginData.user_id 
      },()=>{
                   if(this.props.history.location.state!=null && this.props.history.location.state!=undefined){
                     if(this.props.history.location.state.data!=null && this.props.history.location.state!=undefined){
                       this.setState({
                         showMessage:true,
                         activeReceive:this.props.history.location.state.data.venue_id,
                         activeVenue:this.props.history.location.state.data,
                         otherVenue:[this.props.history.location.state.data],
                         activeTab:1,
                         tempVenue:123

                       });

                       
                   }
                   }
                    

      });

                 }
                 };

                 changeFilteredData = data => {
                   this.setState({ changedText: data });
                   var fiteredRecords = this.state.cmyVenue.filter(obj =>
                     obj.trn_venue_name
                       .toLowerCase()
                       .includes(data.toLowerCase())
                   );
                   this.setState({ myVenue: fiteredRecords });
                 };

                 changeFilteredData1 = data => {
                   this.setState({ changedText1: data });
                   var fiteredRecords = this.state.cotherVenue.filter(obj =>
                     obj.trn_venue_name
                       .toLowerCase()
                       .includes(data.toLowerCase())
                   );
                   this.setState({ otherVenue: fiteredRecords });
                 };

                 refresh = () => {
                   console.log("timer called");
                   if (!this.state.clear) this.getVenueMessage();
                 };

                 getAllVenues = () => {
                   fetch(links + "getChatList", {
                     method: "POST",
                     headers: {
                       Accept: "application/json",
                       "Content-Type": "application/json"
                     },
                     body: JSON.stringify({
                       userId: this.state.loginUserId
                     })
                   })
                     .then(response => response.json())
                     .then(responseJson => {
                       //  console.log("getchatlist", responseJson);

                       if (responseJson.status != 0) {
                         this.setState({ showloading: false });
                       } else if (
                         responseJson.status == 0 &&
                         responseJson.data.length > 0
                       ) {
                         var data = responseJson.data[0];
                         var temp  =data.otherVenueChatedList;
                         
                         this.setState({
                           showloading: false,
                           myVenue: data.myVenueChatList,
                           otherVenue: [...this.state.otherVenue,...temp],
                           cmyVenue: data.myVenueChatList,
                           cotherVenue: data.otherVenueChatedList
                         },()=>console.log('othervfdsdfs',this.state.otherVenue));
                       }
                     });
                 };

                 pushMessage = item => {
                   var data = item;
                   data.chatSenderId = this.state.loginUserId;

                   fetch(links + "sendMessage", {
                     method: "POST",
                     headers: {
                       Accept: "application/json",
                       "Content-Type": "application/json"
                     },
                     body: JSON.stringify(data)
                   })
                     .then(response => response.json())
                     .then(responseJson => {
                       console.log("mesgresposn", responseJson);
                       if (responseJson.status == 0) {
                         this.getVenueMessage();
                       }
                     });
                 };

                 onLoadVenueMemberChat = item => {
                   this.setState({
                     showVenueChatList: false,
                     showMessage: true,
                     activeReceive: item,
                     clear: false
                   });
                   var customerUserId = item.chat_senderId;
                   var activeVenue = this.state.activeVenue;
                   activeVenue.customerUserId = customerUserId;
                   this.setState({ activeVenue }, () => {
                     this.getVenueMessage(activeVenue);
                   });
                 };

                 getVenueMessage = item => {
                   const { activeVenue } = this.state;

                   fetch(links + "getChatMessages", {
                     method: "POST",
                     headers: {
                       Accept: "application/json",
                       "Content-Type": "application/json"
                     },
                     body: JSON.stringify({
                       myUserId: this.state.loginUserId,
                       customerUserId:
                         activeVenue.customerUserId > 0
                           ? activeVenue.customerUserId
                           : activeVenue.venue_user_id,
                       venueId: activeVenue.venue_id
                     })
                   })
                     .then(response => response.json())
                     .then(responseJson => {
                       if (responseJson.status != 0) {
                         //  Toast.show("No Records Found", Toast.LONG)
                         this.setState({ showloading: false });
                       } else if (
                         responseJson.status == 0 &&
                         responseJson.data.length > 0
                       ) {
                         var data =
                           responseJson.data.length > 0
                             ? responseJson.data
                             : [];
                         this.setState({
                           showloading: false,
                           messages: data
                         });
                       }
                     });
                 };

                 getVenueMember = item => {
                   fetch(links + "getProviderChatListMembers", {
                     method: "POST",
                     headers: {
                       Accept: "application/json",
                       "Content-Type": "application/json"
                     },
                     body: JSON.stringify({
                       myUserId: this.state.loginDetails
                         ? this.state.loginDetails.user_id
                         : "0",
                       venueId: item.venue_id
                     })
                   })
                     .then(response => response.json())
                     .then(responseJson => {
                       console.log(responseJson);

                       if (responseJson.status != 0) {
                         this.setState({ showloading: false });
                       } else if (
                         responseJson.status == 0 &&
                         responseJson.data.length > 0
                       ) {
                         var data =
                           responseJson.data.length > 0
                             ? responseJson.data
                             : [];

                         this.setState({
                           showloading: false,
                           venueChatMember: data
                         });
                       }
                     });
                 };

                 onLoadMessage = (item, i) => {
                   this.setState({ venueChatMember: [],messages:[],activeVenue:null,activeReceive:'' });
                   if (i == 1) {
                     this.setState(
                       {
                         showMessage: true,
                         activeVenue: item,
                         clear: false,
                         venueChatMember: [],
                         showloading: false,
                         showVenueChatList: false
                       },
                       () => {
                         this.getVenueMessage(item);
                       }
                     );
                   } else if (i == 0) {
                     this.onClickVenue(item);
                   }
                 };

                 onClickVenue = item => {
                   this.setState(
                     {
                       showVenueChatList: true,
                       showloading: true,
                       activeVenue: item,
                       showMessage: false
                     },
                     () => {
                       this.getVenueMember(item);
                     }
                   );
                 };

                 clear = () => {
                   this.setState(
                     {
                       changedText: "",
                       changedText1: ""
                     },
                     () => this.getAllVenues()
                   );
                 };

                 render() {
                   const {
                     showloading,
                     myVenue,
                     otherVenue,
                     messages,
                     venueChatMember,
                     showVenueChatList,
                     activeVenue,
                     clear,
                     showMessage,
                     activeReceive
                   } = this.state;
                   return (
                     <div
                       style={{
                         flex: 1,
                         justifyContent: "flex-start",
                         justifyContent: "center",
                         alignItems: "center"
                       }}
                     >
                       <div class="flex-container"> 
                       {
                         this.state.tempVenue==null &&(
                            <div style={{ flexGrow: 1 }}>
                           <WebchatMaster
                             myVenueData={this.state.myVenue}
                             otherVenueData={this.state.otherVenue}
                             onSearch={this.changeFilteredData}
                             onSearch1={this.changeFilteredData1}
                             clear={this.clear}
                             onClick={this.onLoadMessage}
                             _changeActiveTab={this.changeActiveTab}
                             activeVenue={activeVenue}
                             tab={this.state.activeTab}
                           />
                         </div>
                           )
                       }
                        

                         <div style={{ flexGrow: 4 }}>
                           {showMessage == true ? (
                             <div
                               style={{
                                 alignContent: "center",
                                 display: "flex",
                                 flexDirection: "column"
                               }}
                             >
                               <OtherVenue
                                 data={activeVenue}
                                 data1={activeReceive}
                                 tab={this.state.activeTab}
                                 _onClick={() => console.log("called")}
                                 _tab={this.state.activeTab}
                               />
                               <ChatView
                                 messages={messages}
                                 userId={activeVenue}
                                 refresh={this.refresh}
                                 clear={this.state.clear}
                                 pushMessage={this.pushMessage}
                               />
                             </div>
                           ) : (
                             <div
                               style={{
                                 flex: 1,
                                 justifyContent: "center",

                                 alignItems: "center",
                                 height: "100%",
                                 paddingTop: "15%"
                               }}
                             >
                               <img src="https://api.akeneo.com/img/illustrations/illus--Referenceentityrecord.svg" />
                               <div className="my_venue_text">
                                 <h1>No Active Chat </h1>
                               </div>
                             </div>
                           )}
                         </div>
                         {showVenueChatList && (
                           <div
                             style={{
                               flexGrow: 1,
                               height: 750,
                               backgroundColor: "#f1f1f1"
                             }}
                           >
                             <Title level={4}>
                               {this.state.activeVenue.trn_venue_name} Venue
                               Members
                             </Title>
                             {venueChatMember.length > 0 && !showloading ? (
                               venueChatMember.map((item, i) => {
                                 return (
                                   <UserDp
                                     data={item}
                                     onClick={this.onLoadVenueMemberChat}
                                   />
                                 );
                               })
                             ) : (
                               <div
                                 style={{
                                   display: "flex",
                                   alignItems: "center",
                                   flexDirection: "column",
                                   paddingTop: 20
                                 }}
                               >
                                 <Spin indicator={antIcon} size="large" />{" "}
                                 <Text strong>Please Wait</Text>
                               </div>
                             )}
                           </div>
                         )}
                       </div>
                     </div>
                   );
                 }
               }
