import React, { Component } from "react";
import "./UserDp.css";
import ProfileSearch from "./ProfileSearch";

class UserDp extends Component {
  render() { 

      const {data}=this.props;
    var image = data.venue_image_path != null ? data.venue_image_path : 'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png';


    return (
      <div>
        <div className="user_profile" onClick ={()=>this.props.onClick(data)}>
          <img src={image} alt="error" className="profile_img" />
          <div className="user_profile_text">
            {data.user_name.toUpperCase()}<div> Member</div>
          </div>
        </div>
     
      </div>
    );
  }
}

export default UserDp;
