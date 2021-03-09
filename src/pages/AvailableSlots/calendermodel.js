import { Modal, Button } from 'antd';
import React from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioButtonCheckedOutlinedIcon from '@material-ui/icons/RadioButtonCheckedOutlined';
import "./AvailableSlots.css";
import { Input } from 'antd';

const { TextArea } = Input;

class Reasonmodel extends React.Component {
  state = { visible: this.props.modeltrue,slot_type:3 };

  showModal = () => {
    this.props.closemodel && this.props.closemodel()
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.props.closemodel && this.props.closemodel("ok")
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.props.closemodel && this.props.closemodel()
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div >
        {/* <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button> */}
        <Modal
          title={`Are You Sure Want To ${(this.state.slot_type=='3'?'Cancel':'Block')} the event?`}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          className="mr_calendermodel"
        >
            {/*<div className="avail_RadioGroup">
              <RadioGroup   onChange={(e)=>{this.props.sendSlotType&&this.props.sendSlotType(e.target.value);this.setState({slot_type:e.target.value})}} aria-label="gender" name="SlotsType" value={this.state.slot_type?this.state.slot_type:''} >
              <div className="RadioBtns">
        <FormControlLabel
          value="3"
          className={this.state.slot_type=='3'?'checkedRadioBtn':''}
          control={<Radio color="primary" icon={<RadioButtonCheckedOutlinedIcon/>}  />}
          label="Make It Available"
          labelPlacement="end"
        />
        <FormControlLabel
          value="2"
          className={this.state.slot_type=='2'?'checkedRadioBtn':''}
          control={<Radio color="primary" icon={<RadioButtonCheckedOutlinedIcon/>} />}
          label="Block"
          labelPlacement="end"
        />
        
        </div>
        </RadioGroup>
            </div>*/}
            <div className="textreason_cal">
            Reason:
            </div>
            <TextArea rows={4} onChange={(e)=>this.props.sendText&&this.props.sendText(e.target.value)} />
          
        </Modal>
      </div>
    );
  }
}

export default Reasonmodel;