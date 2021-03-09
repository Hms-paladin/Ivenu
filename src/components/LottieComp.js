import React, { Component } from 'react'
import Lottie from 'react-lottie'

class ControlledLottie extends Component {
  state = {isStopped:false, isPaused:false}

  render(){
    const buttonStyle = {
      display:'inline-block',
      margin:'10px auto',
      marginRight:'10px',
      border:'none',
      color:'white',
      backgroundColor:'#647DFF',
      borderRadius:'2px',
      fontSize:'15px'

    };

    const defaultOptions = {
      loop:true,
      autoplay:true, 
      animationData:this.props.animationData?this.props.animationData:null,
      rendererSettings:{
        preserveAspectRatio:'xMidYMid slice'
      }
    };

    return(
      <div className="controlled">
      {this.props.animationData&&
        <Lottie options={defaultOptions}
              height={400}
              width={400}
              isStopped={this.state.isStopped}
              isPaused={this.state.isPaused}
        />
        }
      </div>
    )
  }
}

export default ControlledLottie;