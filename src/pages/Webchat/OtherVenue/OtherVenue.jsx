import React, { Component } from "react";
import "./OtherVenue.css";


class OtherVenue extends Component {
  render() {
    const { data,_tab } = this.props;
    var image = data.venue_image_path != null ? data.venue_image_path : 'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png';
     
    return (
      <div className='other_venue_header'>
        <div className="other_venue" onClick={() => this.props._onClick(data, this.props.tab)}>
          <img src={image} alt="error" className="other_venue_img" />
          <div className="other_venue_text">  
          {_tab == 1 && (
              <>{this.props.data.trn_venue_name} <div>{
                this.props.data.trn_venue_address
              }</div>
            </>
          )}  


            {_tab == 0 && (
              <>{this.props.data1.user_name} <div>Venue Provider</div>
              </>
            )} 
            
          </div>
        </div>

      </div>
    );
  }
}

export default OtherVenue;
