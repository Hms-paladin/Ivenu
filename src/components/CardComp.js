import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { Progress } from 'antd';
import CarouselImages from './../pages/carouselImages';
import imgloader from './../images/noimgavail.png';
const CardViewComp = (props) => {
  return (
    <div  style={{width:'100%'}} >
      <Card>
      <div className="swiperPaginationcontrols photosmodalcarousel">
      {props.images.length>0&&
      <CarouselImages photos={props.images}/>
      }
      {props.images.length==0&&
        <img src={imgloader} style={{height:300}}/>
      }
      </div>
       {/*} <CardImg top  width="100%" src={props.images.length>0?props.images[0].venue_image_path:''} alt="Card image cap" />*/}
        <CardBody>
        {props.status==1&&!props.autosave&&<p className="circleStatus green"><span></span> Live</p>}
        {props.status==0&&!props.autosave&&<p className="circleStatus orange"><span></span> Pending</p>}
        {props.status==2&&!props.autosave&&<p className="circleStatus red"><span></span> Rejected</p>}
        {props.status==3&&!props.autosave&&<p className="circleStatus grey"><span></span> In Activated</p>}
       {props.autosave&&<p className="circleStatus ivnuered"><span></span>Incomplete</p>}
          <CardTitle>{props.title}</CardTitle>
          <CardSubtitle>{props.subtitle}</CardSubtitle>
          <CardText className="addellipsisClamp">{props.description}</CardText>
          <Button style={{backgroundColor:'#ea5b02',borderColor:'transparent'}} onClick={()=>props.goEditPage&&props.goEditPage()}>Edit</Button>
        {props.progress&& <Progress type="circle" percent={Math.round(props.progress)} status="active" />}
        </CardBody>
      </Card>
    </div>
  );
};

export default CardViewComp;