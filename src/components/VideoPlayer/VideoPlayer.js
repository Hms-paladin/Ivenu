import React, { Component } from 'react';
import './VideoPlayer.css';
class VideoPlayer extends Component {
  constructor(props){
    super(props);
    this.state={
      PausePlay:false,
      breadCrums:"",
      runTime:"00:00",
      endTime:"-00:00",
      videoRange:0,
      videourl:this.props.videoUrl?this.props.videoUrl:''
    };
  }


  PausePlay=() =>{
    var vid = document.getElementById("my_video");
    if(this.state.PausePlay){
      vid.pause();
    }else{
      vid.play();
      vid.playbackRate=1;
    }
    this.setState({PausePlay:!this.state.PausePlay});
  }

  SlowFast=(data) =>{
    var vid = document.getElementById("my_video");

    var currentspeed=vid.playbackRate; 
    var incdecspeed= currentspeed.toFixed(1) == 0.1 && data == -0.1 ? 0 :data;
    vid.playbackRate = currentspeed + incdecspeed; 
  }

  Videotime=() =>{

    var vid = document.getElementById("my_video");
    var nt = vid.currentTime * (100 / vid.duration);

    var curmins = Math.floor(vid.currentTime / 60);
    var cursecs = Math.floor(vid.currentTime - curmins * 60);

    var durmins = Math.floor(vid.duration / 60);
    var dursecs = Math.floor(vid.duration - durmins * 60);



    var curtime=this.convMilliseconds(curmins,cursecs);
    var duration=this.convMilliseconds(durmins,dursecs);

    var mdata = duration-curtime;

    var murmins= Math.floor(mdata / 60);
    var mursecs=Math.floor(mdata - murmins * 60);




    if(cursecs < 10){ cursecs = "0"+cursecs; }

    if(mursecs < 10){ mursecs = "0"+mursecs; }

    if(curmins < 10){ curmins = "0"+curmins; }

    if(murmins < 10){ murmins = "0"+murmins; }


    this.setState({runTime:curmins+":"+cursecs,
      endTime:"-"+murmins+":"+mursecs,videoRange:nt})
  }

  convMilliseconds(minutes,seconds){
    var min=minutes*60;
    return min+seconds;
  }

  SlideChange=(e) =>{
    var vid = document.getElementById("my_video");
    var seekto = vid.duration * (e.target.value / 100);
    vid.currentTime = seekto;
    this.setState({videoRange:e.target.value});
    this.Videotime();
  }


  render() {

    return (

      <div>



      <div id="video_player_box">
      <video id="my_video" preload="metadata">
      <source src={this.state.videourl} type="video/mp4" />
      </video>
      <div className="orderflexmob">
      <div className="video_controls_bar">

      <div>
      <button onClick={()=>this.SlowFast(-0.1)}><img src={require('../../images/VideoPNG/LeftPNG.png')}/></button>
      </div>
      <div>
      <button onClick={()=>this.PausePlay()}><img src={require(this.state.PausePlay?'../../images/VideoPNG/PausePNG.png':'../../images/VideoPNG/PlayPNG.png')}/></button>
      </div>
      <div>
      <button onClick={()=>this.SlowFast(0.1)}><img src={require('../../images/VideoPNG/RightPNG.png')}/></button>
      </div>

      </div>

      <div className='video-top'>
      <input type="range" className="seek-bar"  onChange={(e)=>this.SlideChange(e)} value={this.state.videoRange}/>
      </div>
      <div className='video-top'>
      <span className="ctlleft">{this.state.runTime}</span>  <span className="ctlright">{this.state.endTime}</span>
      </div>
      </div>
      </div>

      </div>
      );
  }
  componentDidMount() {
    this.PausePlay();
    this.intervalID = setInterval(
      () => this.Videotime(),
      500
      );
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }


}

export default VideoPlayer;
