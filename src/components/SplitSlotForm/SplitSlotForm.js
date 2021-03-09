import { Modal, Button } from 'antd';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import React from 'react';
import SlotBox from '../slotBox/SlotBox';
import SlotLegend from '../slotLabel/SlotLable';
import { notification } from 'antd';
import './SplitSlotForm.css';
class SplitSlotFormModal extends React.Component {
  state = { visible:false, hourslots:[],slotName:'',errormsg:null};
componentWillReceiveProps(props){
this.updateData(props);
}
updateData=(props)=>{
  this.setState({visible:props.editvisible});
  if(props.SplitSlots){
    // console.log(props.SplitSlots);
    // console.log(this.state.hourslots);
    var filterdata=[];
    if(this.state.hourslots.length>0){
      var hourslots=this.state.hourslots;
      hourslots.map((obj)=>{obj.visible=true;return obj});
if(props.editSLots){
    this.setState({slotName:props.editSLots.labelName});
  hourslots.map((x,key) => {
   var findIndex=props.editSLots.hourSlots.findIndex((obj)=>obj.label==x.label);
   if(findIndex!=-1){
      if(findIndex!=-1){
         hourslots[key].checked=true;
      }else{
         hourslots[key].checked=false;
      }
   }
 })
var filternonchekedRecords=hourslots.filter((obj)=>obj.checked==false);
hourslots.map((x,key) => {
    var findIndex=props.SplitSlots.filter((selected)=>selected.id!=props.editSLots.id).findIndex((obj)=>obj.label==x.label);
        if(findIndex!=-1){
           hourslots[key].visible=false;
        }else{
           hourslots[key].visible=true;
        }
})
}else{
  hourslots.map((x,key)=>{
        var findIndex=props.SplitSlots.findIndex((obj)=>obj.label==x.label);
        if(findIndex!=-1){
          hourslots[key].visible=false;
          hourslots[key].checked=false;
        }else{
          hourslots[key].visible=true;
          hourslots[key].checked=false;

        }
  })
}
    this.setState({hourslots});
    }
  }
}
  showModal = () => {
    // this.clearSlots();
    this.setState({
      visible:true,
     
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible:false,
    });
  };

  handleCancel = e => {
    // console.log(e);
    this.clearSlots();
    this.setState({
      visible:false,
    });
  };
  clearSlots=()=>{
    if(this.state.hourslots.length>0){
      var hourslots=this.state.hourslots;
      hourslots.map((obj)=>{obj.checked=false;return obj;});
      this.setState({hourslots});
    }
      this.setState({slotName:'',errormsg:null})
      this.props.clearEditData&&this.props.clearEditData();
  }
changeSelectedSlot=(checked,key)=>{
  var hourslots=this.state.hourslots;
  hourslots[key].checked=checked;
  this.setState({hourslots});
}
receiveText=(data)=>{
  // console.log(data);
  data=data.charAt(0)==" "?'':data;
  this.setState({slotName:data})
    this.setState({errormsg:data==''?"Field Required":null})
}
saveSplitForm=()=>{
  // console.log
  if(!this.state.slotName){
    this.setState({errormsg:!this.state.slotName?"Field Required":null})
    return;
  }
  var filterRecords=this.state.hourslots.filter((obj)=>obj.checked==true);
  if(filterRecords.length==0){
      notification.error({
    message:'Error',
    description:'Choose Alteast One Slot'});
    return;
  }
  var obj={id:new Date().getTime(),labelName:this.state.slotName,hourSlots:filterRecords};
  var splitEditSlots=this.props.editSLots?JSON.parse(JSON.stringify(this.props.editSLots)):null;
  this.props.sendSlots&&this.props.sendSlots(obj,splitEditSlots);
  // this.setState({visible:0})
  this.handleCancel();
  // console.log('obj',obj);

}
  render() {
    return (
      <div className="splitSLotFormDiv">
      <div onClick={()=>this.showModal()}>
       <AddBoxOutlinedIcon/>
       </div>
        <Modal
         className="splitSLotFormDivModal"
          width={window.innerWidth}
         
          footer={null}
            
          title={<div className="splitSlotFormHeader"><span>Split Slots</span><SlotLegend legend="Selected Slots" boxColor="#eb5c00"/>

          </div>}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
         <div className="FormBoxDiv">
         <label>Slot Name <span>*</span></label>
         <input value={this.state.slotName} type="text" onChange={(e)=>this.receiveText(e.target.value)}/>
         {this.state.errormsg&&
         <p className="redColor">Field Required</p>
         }
         </div>
         <div className="splitSLotFormDivBox">
         <div className="SlotBoxGrid">
         {this.state.hourslots.filter((obj)=>obj.visible==true).length==0&&
           <p className="redColor">No Slots are available</p>
         }
         {this.state.hourslots.length>0&&this.state.hourslots.map((obj,key)=>{
           return(
             <>
               {obj.visible==true&& <SlotBox SelectedSlot={()=>this.changeSelectedSlot(!obj.checked,key)} selected={obj.checked} textselectedColor={"white"} selctedBoxColor={"#eb5c00"}>{obj.label}</SlotBox>}

             </>
                      
            )
         })}
            </div>
            <div className="next-div">
            <button disabled={this.state.errormsg} onClick={()=>this.saveSplitForm()}  type="button" className={`availablitysave-button ${this.state.errormsg?'disablebtn':''}`}><span className="availabilitysave-span">Submit</span></button>
            </div>
         </div>
        </Modal>
      </div>
    );
  }
  componentDidMount(){
    if(this.props.hourSlots){
      var propshour_slots=this.props.hourSlots.length>0?JSON.parse(JSON.stringify(this.props.hourSlots)).map((obj)=>{obj.checked=false;obj.visible=true; return obj;}):[];
      // console.log('propshour_slots',propshour_slots);
      // alert(JSON.stringify(this.props.SplitSlots));
      this.setState({hourslots:propshour_slots},function(){
        this.updateData(this.props);
      });

    }

  }
}

export default SplitSlotFormModal;