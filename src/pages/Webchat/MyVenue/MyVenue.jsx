import React, { Component } from "react";
import "./MyVenue.css"; 


class MyVenue extends Component {
  render() {  
    const {data,active}=this.props;
    console.log('datafsd',data)
    var image = data.venue_image_path != null ? data.venue_image_path : 'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png';
    console.log('active', active)
    return (
      <div className={active!=null && (active.venue_id == data.venue_id && active !=null )?"active":''}>
        <div className="my_venue" onClick={()=>this.props._onClick(data,this.props.tab)}> 
          <img src={image} alt="error" className="my_venue_img" />
          <div className="my_venue_text">
    {this.props.data.trn_venue_name}
          </div>
        </div>
       
      </div>
    );
  }
}

export default MyVenue;
