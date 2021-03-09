import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { Input} from 'antd';
// import Apilink from './apilink';
import './Disclaimer.css';
export default class Disclaimer extends React.Component{
  constructor(props){
    super(props);
    console.log(props);
    this.state={checked:false,signupdata:props.signupdata}
  }
  componentWillReceiveProps(props){
    console.log(props);
    if(props.signupdata){
    this.setState({signupdata:props.signupdata})
    }
  }
  saveData=(data) =>{
    // console.log(data);
//     fetch(Apilink.apiurl+'Signup_details/', {
//      method:'POST',
//   headers:{
//     Accept:'application/json',
//     'Content-Type':'application/json',
//   },
//   body:JSON.stringify(data),
// }).then((response)=>response.json())
//    .then((responseJson)=>{
// // Actions.verify({loginobj});
// if(responseJson.status==0){

// alert("User Added Successfully");
// this.props.closemodal();
// }else{
//   alert("Error in Response");
// }
//    })
  }
  handleDisclaimer=()=>{
    if(this.state.checked==false){
      alert("Please agree to start to Add Venue");
    }else{
      var signupdata=this.state.signupdata;
      signupdata['disclaimer']=this.state.checked==true?1:0;
      var obj={type:'sharepage'};
      // this.saveData(signupdata);
    //   // alert(obj);
      signupdata.type='sharepage';
    this.props.loadsharepage(signupdata);

    }
  }

  disclaimerChange=(e)=>{
    this.setState({checked:!this.state.checked});
  }
  render(){
    return(

      <div  className="disclaimer">
      <ModalHeader toggle={this.toggle} style={{'padding-left':'30px','padding-right':'30px','borderBottomWidth':'0'}}>

      <div >
      <div className='clr_orange headerstyle' style={{'font-size':'30px'}}>Disclaimer</div>
      <div style={{'font-size':'15px'}}><span className='clr_lblack paraheaderstyle' style={{fontWeight:'normal'}}>Welcome</span> <span style={{fontWeight:'normal'}} className='clr_orange paraheaderstyle'>{this.state.signupdata.name+" "+this.state.signupdata.surname+","}</span></div>
      </div>

      </ModalHeader>
      <ModalBody className="disclaimer-content" style={{'padding-left':'30px','padding-right':'30px'}}>
     <p>Information presented on this website, is considered public information (unless otherwise noted). We will make any legally required disclosures of any breach of the security, confidentiality, or integrity of your unencrypted electronically stored "personal data" (as defined in applicable state statutes on security breach. The site governs the manner in which iVNUE collects, uses, maintains and discloses information collected from users of the https://www.iVNUE.com/" website (“Site”). This privacy policy applies to the Site and all products and services offered by iVNUE (collectively referred to as “Applications”).This policy also describes your data protection rights, including a right to object to some of iVNUE processing. The Policy does not apply to information collected by any third party, including through any third-party application or content (including advertising) that links to or is accessible from our Applications or websites.Please note that IVNUE does not control and cannot guarantee the relevance, timeliness, or accuracy of these outside materials.</p>

      <Row>

        <Col> 
        <div>       
        <input id="checkbox-1"  checked={this.state.isChecked} onChange={this.disclaimerChange}  class="checkbox-custom hide-check-box" name="checkbox-1" type="checkbox"/>
        <label for="checkbox-1" class="checkbox-custom-label">I Agree</label>
      </div>
      </Col>

        <div>
           <div style={{display:'block',textAlign:'right'}}> 
         <button onClick={this.handleDisclaimer} type="button" class="btn btn-primary mobverify" style={{'background':'#FF9008',color:'white',width:'166px',}}>Next</button>
         </div>
        </div>

      </Row>

      </ModalBody>
      </div>
      )
  }

}