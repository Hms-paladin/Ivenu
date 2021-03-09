import React from "react";
import { GiftedChat, Bubble } from "react-web-gifted-chat";
import moment from "moment";
import { Spin, Icon } from "antd";
import "./MessageMaster.css";
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export default class ChatView extends React.Component {
  state = {
    messages: []
  };

  componentDidMount() {
    this.setState({
      messages: []
    });
  }

  componentWillReceiveProps(props) {
    if (props.messages != this.state.messages) {
      var obj = [];

      if (props.messages.length <= 0) {
        obj.push({
          _id: 1,
          text: "Please Start Your Conversation",
          createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
          system: true
        });
      }
      props.messages.forEach(element => {
        var temp = {};
        temp._id = element.chat_senderId;
        temp.text = element.text;
        temp.createdAt = element.created_at;
        temp.user = {
          _id: element.chat_receiverId
        };
        obj.push(temp);
      });
      this.setState({
        messages: obj
      });
    }

    if (props.clear) {
      console.log("clear called ");
      clearInterval(this.timer);
    }
  }

  onSend(messages = []) {
    

    var obj = {
      chatMessage: messages[0].text,
      chatReceiverId:
        this.props.userId.customerUserId != null
          ? this.props.userId.customerUserId
          : this.props.userId.venue_user_id,
      messageTime: moment().format("YYYY-MM-DD hh:mm:ss"),
      venueId: this.props.userId.venue_id
    };
    this.props.pushMessage(obj);
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#eb5b00"
          },
          left: {
            backgroundColor: "#eb5b00"
          }
        }}
      />
    );
  } 

  renderLoading =()=>{
    return <Spin indicator={antIcon} />;
  }

  componentDidMount = () => {
    console.log("didmount");
    this.timer = setInterval(() => {
      this.props.refresh();
    }, 5000);
  };

  componentDidUpdate = () => {
    console.log("did updateview");
  };

  componentWillUnmount() {
    console.log("willunmount");
    clearInterval(this.timer);
  }

  render() { 

    console.log(
      "id",this.state.messages
    );

    return (
      <GiftedChat
        messages={this.state.messages}
        renderUsernameOnMessage={true}
        onSend={messages => this.onSend(messages)}
        renderBubble={this.renderBubble}
        renderLoading={this.renderLoading}
        isLoadingEarlier={true}
        minComposerHeight={40}
        minInputToolbarHeight={600}
        alwaysShowSend={true}
        bottomOffset={10}
        user={{
          _id:
            this.props.userId.customerUserId != null
              ? this.props.userId.customerUserId
              : this.props.userId.venue_user_id
        }}
      />
    );
  }
}
