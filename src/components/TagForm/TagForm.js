import React, { Component } from 'react';
import {Button, Container, Row, Col } from 'reactstrap';
import Bindname from '../bindname/bindname';
import Choosediv from '../choosediv/choosediv';
import Apilink from '../../helpers/apilink';
import plus from '../../images/circleplus.png';
import Popupbox from '../../components/popupbox/popupbox';
import {notification} from 'antd';
import { BounceLoader } from 'react-spinners';
// import { Row, Col } from 'antd';
import './TagForm.css';
Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};
// import { BounceLoader } from 'react-spinners';

const override = {
  display:'block',
  margin:'0 auto',
  'border-color':'red',
}

const HeaderContent=(<div className="choose-text1">Please <span className="choose-text2">Tag</span> related <span className="choose-text2">Keywords</span></div>);
class TagForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dovalue:null,
      whatvalue:null,
      activeArrow:false,
      loading:true,
      purposes:[],
      tags:[],
      FormTags:[],doDropdown:{id:'venue_act_id',name:'venue_act_name',dropdown:[]},whatDropdown:{id:'venue_purpose_id',name:'venue_purpose_name',dropdown:[]}
    };
  }

  // componentWillMount() {
  //   this.ListTags();
  // }



  ListTags=(data)=>{

    fetch(Apilink.apiurl+'getTags', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({user_cat_id:"1"}),
    }).then((response)=>response.json())
    .then((responseJson)=>{

      var response=responseJson.data;
      console.log("response datas",response);
      response.map(v => v.data.map(d => d.isChecked = false));
      console.log(response)
      if(data&&data.length>0){
        for(var i in response){
          var findIndex=data.findIndex((obj)=>obj.tag_cat_id==response[i].tag_cat_id);
          if(findIndex!=-1){
            response[i].data=data[findIndex].data;
          }
        }
      }
      this.setState({ tags:response,loading:false});

    })  
  }

  onSave=()=>{
    console.log("submittedData",this.state.doDropdown.dropdown);
    if(this.state.purposes.length==0){
      notification.warning({
    message:'Error Message',
    description:"Please Choose Atleast One Action & Purpose",
    onClick:() => {
      console.log('Notification Clicked!');
    },
  });
      return;
    }
    this.props.sendtagsdetails(this.state.tags,this.state.FormTags);
    this.props.sendpurposes(this.state.purposes,this.state.doDropdown.dropdown,this.state.purposes.length);
    this.setState({activeArrow:true})
  }



  handleChange=(i1,i2,state)=> {

    var tags=this.state.tags;
    tags[i1].data[i2].isChecked=state;
    console.log(tags)
    this.setState({tags:tags});
    var array=[];
    for(var i=0 ; i<tags.length ; i++){

      var data=tags[i].data;
    // tags[i].data=this.seperate_checked(data);
    var obj={'tag_cat_id':tags[i].tag_cat_id,'tag_details':this.seperate_checked(data)};
    array.push(obj)

  }
  this.setState({FormTags:array})
    if(window.innerWidth<768){ 
  this.props.sendtagsdetails(this.state.tags,array);
}
  // console.log(array)
  

}

addcustomtags=(index,data)=>{

  if(data=="" || data==undefined){
    return;
  }

  var tags=this.state.tags;
  tags[index].data.push({'tag_name':data,'isChecked':true});
  this.setState({tags});
  var array=[];
  for(var i=0 ; i<tags.length ; i++){

    var data=tags[i].data;
    // tags[i].data=this.seperate_checked(data);
    var obj={'tag_cat_id':tags[i].tag_cat_id,'tag_details':this.seperate_checked(data)};
    array.push(obj)
  }
  this.setState({FormTags:array})
  console.log(array)
  if(window.innerWidth<768){  
  this.props.sendtagsdetails(this.state.tags,array);
  }
  console.log({['custom'+index]:''})
  this.setState({['custom'+index]:''});
}

onSubmit=(value,index,state)=> {

  console.log(this.state.tags)

  // this.props.nexttab('list6');
// var countlength=this.state.tags.filter((obj)=>obj.state==true);
//  console.log("tags",this.state.tags);
}

seperate_checked=(data)=>{

  var initial_data=data;
  var checked_data = initial_data.filter(obj => obj.isChecked == true)
  var final_data = checked_data.map(function(data){return data.tag_name});
  return final_data;

}
 loadActions=(data)=>{
   console.log('datadropdown',data);
    fetch(Apilink.apiurl+'do', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(),
    }).then((response)=>response.json())
    .then((responseJson)=>{
        var doDropdown=this.state.doDropdown;
        responseJson.data.map((obj)=>obj.purpose=[]);
    doDropdown.dropdown=responseJson.data;

    if(data){
      for(var i in responseJson.data){

        var findIndex=data.findIndex((obj)=>obj.venue_act_id==responseJson.data[i].venue_act_id);
        if(findIndex!=-1&&data[findIndex].purpose){
            responseJson.data[i].purpose=data[findIndex].purpose;
        }
      }
    }
    console.log(responseJson.data);
    this.setState({doDropdown})
console.log("do",this.state.doDropdown);

    })  
 }
   loadwhat(data){
    // console.log("whatpurpose",data);
    fetch(Apilink.apiurl+'whatpurpose', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({'venue_act_id':data}),
    }).then((response)=>response.json())
    .then((responseJson)=>{
    console.log("what",this.state.whatDropdown);
    var whatDropdown=this.state.whatDropdown;
    if(responseJson.data.length>0){

     responseJson.data.map((d) => d.isChecked = false);
    }
      var findData=this.state.purposes.filter((obj)=>obj.id==this.state.dovalue.venue_act_id);
      // console.log(findData);
    for(var i in responseJson.data){
      if(findData.length>0){


      var checkIndex=findData[0].value.findIndex((obj)=>obj==responseJson.data[i].venue_purpose_id);

     // var checkIndex=this.state.purposes.findIndex((obj)=>obj.==responseJson.data[i].venue_purpose_id);
     if(checkIndex!=-1){
     responseJson.data[i].isChecked=true;
     }else{
     responseJson.data[i].isChecked=false;
     }
   }else{
     responseJson.data[i].isChecked=false;
   }
    }
    whatDropdown.dropdown=responseJson.data;
    console.log(whatDropdown);
    this.setState({whatDropdown})
    })  
  }
  removePurposes=(purposeid,checked,obj,index,purposeIndex)=>{
var whatDropdown=JSON.parse(JSON.stringify(this.state.whatDropdown));
var doDropdown=JSON.parse(JSON.stringify(this.state.doDropdown));
var purposes=JSON.parse(JSON.stringify(this.state.purposes));

var FindIndex=whatDropdown.dropdown.findIndex((obj)=>obj.venue_purpose_id==purposeid);
var finddata=purposes.findIndex((obj1)=>obj1.id==obj.venue_act_id);
var purposeIndex1=purposes[finddata].value.findIndex((obj)=>obj==purposeid);
purposes[finddata].value.splice(purposeIndex1,1);
if(purposes[finddata].value.length==0){
  purposes.splice(finddata,1);
}
doDropdown.dropdown[index].purpose.splice(purposeIndex,1);
this.setState({purposes,doDropdown});
if(FindIndex!=-1){
  if(obj.venue_act_id==this.state.dovalue.venue_act_id){
whatDropdown.dropdown[FindIndex].isChecked=checked;
}else{
}
}
console.log("PURPOSES",purposes);
this.setState({whatDropdown});
 if(window.innerWidth<768){ 

        this.props.sendpurposes(purposes,doDropdown.dropdown,purposes.length);
    }
  }
  changeBox=(index,checked,actionid)=>{
    console.log(checked);

    var whatDropdown=this.state.whatDropdown;
    whatDropdown.dropdown[index].isChecked=checked;
    this.setState({whatDropdown});
    var doDropdown=this.state.doDropdown;
    var purposes=this.state.purposes;
    // doDropdown
    var findIndex=doDropdown.dropdown.findIndex((obj)=>obj.venue_act_id==this.state.dovalue.venue_act_id);
    // console.log(findIndex);
    if(findIndex!=-1){
        doDropdown.dropdown[findIndex].purpose=whatDropdown.dropdown.filter((obj)=>obj.isChecked==true);
    }
    var datas=whatDropdown.dropdown.filter((obj)=>obj.isChecked==true).map((obj)=>obj.venue_purpose_id);
    this.setState({doDropdown});
    var findIndex1=this.state.purposes.findIndex((obj1)=>obj1.id==this.state.dovalue.venue_act_id);
    if(purposes.length==0){

    purposes.push({id:this.state.dovalue.venue_act_id,value:datas});
    }else{
      if(findIndex1!=-1){
        purposes[findIndex1].value=datas;
        // purposes[findIndex1].value.unique();
      if(datas.length==0){
        purposes.splice(findIndex1,1);
      }
      }else{
        purposes.push({id:this.state.dovalue.venue_act_id,value:datas});
      }
      // purposes[i]
    }
    this.setState({purposes});
    // console.log(purposes);
    // purposes.concat(datas)
    // this.setState({purposes});
    // var obj={};
    // if(obj[this.state.dovalue.venue_act_id]==undefined){
    //   obj[this.state.dovalue]
    // }
    if(window.innerWidth<768){ 
        // this.props.sendActionDetails()

        this.props.sendpurposes(purposes,doDropdown.dropdown,purposes.length);
    }
  }
  loadTooltipPurpose=()=>{
      notification.warning({
    message:'Notification',
    description:"venue will list out based on your purpose and actions.",
    onClick:() => {
      console.log('Notification Clicked!');
    },
  });
  }
  renderDoData=(obj,index)=>{
 if(obj.purpose.length>0){
   return (
<div className="selectedActionsPurpose"><span>{obj.venue_act_name}</span>
{obj.purpose.map((purpose ,purposeIndex)=>{
return(
   <div className='tagForm_tag_check'>
 <span style={{marginRight:20}}>    
      <input style={{display:'none'}}  onClick={(e)=>this.removePurposes(purpose.venue_purpose_id,!purpose.isChecked,obj,index,purposeIndex)} type="checkbox" id={'tagpurposeIndex_'+purposeIndex+obj.venue_act_id} name="ossm"  checked={purpose.isChecked}/> 
      <label for={'tagpurposeIndex_'+purposeIndex+obj.venue_act_id}>{purpose.venue_purpose_name}</label>
      </span>
      </div>
  )
})}

</div>
     )
 }
  }
 receivedodrop=(data)=>{
   // console.log(data);
   this.setState({dovalue:data})
   this.loadwhat(data.venue_act_id);
 }
render() {
  console.log(this.state)

  return (
    <div className="Tagging-main-div">
    <Bindname text={"Tagging"}/>
    <Choosediv  content={HeaderContent} changeActive={(data,action)=>this.props.changeActive(data,action)} prev={4} next={6} activeArrow={this.state.activeArrow}/>
    <div className="TagForm-div">
{this.state.loading==true &&
    <div className='sweet-loading'>
    <BounceLoader
    sizeUnit={"px"}
    size={75}
    color={'#24479D'}
    loading={this.state.loading}
    />
      <div className="sweet-loading_text">Loading...</div>
    </div> 
    }


    {this.state.loading==false &&
      <div>
    <div className="checkform-div">
    <div className="checkform-heading">
    <p className="form-text1">Please TAG the Training Venue with Keyword</p>

    </div>

    <button type="button" className="checksave-button" onClick={this.onSave}><span className="checksave-span">SAVE</span></button>

    </div>

    <div className='formcomponent_ tabcompmob' style={{margin:'10px 0px 10px 20px'}}>
 </div>
 <div className="borderrowtags">
    <Row style={{'width':'100%'}} className="tagmob">  

      {/*<div className="webmodules" style={{'font-size':'18px','color':'#1f459e','width':'2%','margin-left':'15px'}}>
      &gt;
    </div>*/}
    <div className='clr_blue webmodules ellipsis tooltiphoverclass' style={{'font-size':'26px','width':'45%',color:'#929191'}}>
    Please Select Your Action & Purpose <div class="tooltip1"><span>?</span>
  <span class="tooltiptext">venue will list out based on your purpose and actions.</span>
</div>
    </div>
    <div className='clr_blue inputdiv width100percent' style={{'font-size':'18px','width':'45%'}}>
   <Popupbox buttonText={this.state.dovalue?this.state.dovalue.venue_act_name:'Please Select Your Action'} sendPopupData={(data)=>this.receivedodrop(data,'dovalue')} dropdown={this.state.doDropdown} buttonColor={'#fff'} buttonTextColor={'#000'} popupColor={'white'} popupTextColor={'black'} />

    </div>
   
  {window.innerWidth<768&&<div onClick={()=>this.loadTooltipPurpose()} class="tooltip1 tooltip1mob"><span>?</span>
</div>}
  

    </Row>

    <div className='tagForm_tag_check'>
    {this.state.whatDropdown.dropdown.length>0&&
    <div className="PurposeClass">Purpose</div>
  }
 {this.state.whatDropdown.dropdown.map((obj,indexwhat)=>{
      return(
      <span style={{marginRight:20}}>    
      <input style={{display:'none'}} onChange={(e)=>this.changeBox(indexwhat,!obj.isChecked)} type="checkbox" id={'tagindexwhat_'+indexwhat} name="ossm"  checked={obj.isChecked}/> 
      <label for={'tagindexwhat_'+indexwhat}>{obj.venue_purpose_name}</label>
      </span>
      )
    })}
    </div>
<Row style={{display:'flex',flexWrap:'wrap'}}>
    {this.state.doDropdown&&this.state.doDropdown.dropdown.map((obj,index)=>{
return this.renderDoData(obj,index)
    })}
    </Row>
    <div class="webmodules" style={{width:'100%',height:'2px','background':'#c3c3c3','margin':'45px 0px'}}></div>
    </div>
  {this.state.tags.map((item,i) => 
    <div className="borderrowtags">
    <Row style={{'width':'100%'}} className="tagmob">  

      {/*<div className="webmodules" style={{'font-size':'18px','color':'#1f459e','width':'2%','margin-left':'15px'}}>
      &gt;
    </div>*/}
    <div className='clr_blue webmodules ellipsis' style={{'font-size':'26px','width':'45%',color:'#929191'}}>
    {item.tag_cat_name}
    </div>
    <div className='clr_blue inputdiv' style={{'font-size':'18px','width':'45%'}}>
    <input onChange={(e)=>this.setState({["custom"+i]:e.target.value})} type='text' class='form-control' placeholder={item.tag_cat_desc} value={this.state['custom'+i]}/>
    </div>

    <div style={{'font-size':'24px','width':'6%','margin-left':'15px'}}>
    <button onClick={(e)=>this.addcustomtags(i,this.state['custom'+i])} className="btn tag_btn" style={{padding:'unset',width:'50px',height:'50px'}}><img src={plus} width='100%' height='auto'/></button>
    </div>

    </Row>

    <div className='tagForm_tag_check'>

    {item.data.map((item2,li) => 
      <span style={{marginRight:20}}>    
      <input style={{display:'none'}} type="checkbox" id={'tag_'+i+li} name="ossm" value={item2.tag_name} onChange={(e) => this.handleChange(i,li,!item2.isChecked)}  checked={item2.isChecked}/> 
      <label for={'tag_'+i+li}>{item2.tag_name}</label>
      </span>
      )}
    </div>

    <div class="webmodules" style={{width:'100%',height:'2px','background':'#c3c3c3','margin':'45px 0px'}}></div>
    </div>
    )}
   </div>
}

   {/*{this.state.loading==false &&
   <div class="webmodules button_change">
   <button type="button" class="btn btn_next btn-lg" onClick={this.onSubmit}>
   NEXT
   </button>
   </div>
 }*/}
 </div>

 </div>
 );
}
componentDidMount(){
// alert(JSON.stringify(this.props.tagsDetails))
  if(this.props.tagsDetails){
    this.setState({FormTags:this.props.tagsDetails.length>0?this.props.tagsDetails.map((obj)=>{return {tag_cat_id:obj.tag_cat_id,tag_details:obj.data.length>0?obj.data.map((obj1)=>obj1.tag_name):[]}}):[],loading:false,activeArrow:true})
    this.ListTags(this.props.tagsDetails);
  }else{
    this.ListTags();
  }
  if(this.props.purposeDatas){
    this.setState({purposes:JSON.parse(JSON.stringify(this.props.purposeDatas.purposes))});
    this.loadActions(JSON.parse(JSON.stringify(this.props.purposeDatas.purposeDropdown)));
  }else{
    this.ListTags();
    this.loadActions();
  }
}
}

export default TagForm;