import React, { Component } from 'react';
import { Button, Input, FormGroup, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Icofont from 'react-icofont';
import './SharePage.css';
import Apilink from '../../helpers/apilink';
import CheckSympol from '../../images/SharePage/Yes_Symbol1.png';
import CancelSympol from '../../images/SharePage/No_Symbol1.png';
// const data=[{name:'Any Local training venues near you?',question_id:1,ans_status:null},{name:'Venue needs in your location?',question_id:2,ans_status:null},{name:'Is your neighborhood underserved?',question_id:3,ans_status:null},{name:'Venue needs in your location?',question_id:4,ans_status:null},{name:'Any local training venues near you?',question_id:5,ans_status:null},{name:'Any local training venues near you?',question_id:6,ans_status:null}];

export default class SharePage extends React.Component{
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      signupdata:props.signupdata?props.signupdata:{name:'hell',surname:'world'},
      selected:'',
      loading:false,
      skipbuttonloading:false,
      nextbuttonloading:false,
      data:[]
    };
    this.updateRadioButton = this.updateRadioButton.bind(this);
  }
  updateRadioButton = (value) =>{
    this.setState({ radio:value });
    console.log("radio",value);
  }

  componentWillMount() {
    this.ListQuestion();
  }

  ListQuestion=()=>{
    var obj={'typeId':1};
    fetch(Apilink.apiurl+'questionList', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(obj),
    }).then((response)=>response.json())
    .then((responseJson)=>{

      responseJson.data.map(v => v.ans_status = null);
      this.setState({ data:responseJson.data });

      console.log("questionlist",responseJson.data);
      console.log(this.state);
    })  
  }

  changeState=(state,key)=>{
    var data=this.state.data;
    data[key].ans_status=state;
    this.setState({data});
    console.log("data",data);
  }
  skip=()=>{
    var skipdata=this.props.signupdata;
    skipdata.questionAnswer=[];
    this.setState({loading:true});
    this.setState({skipbuttonloading:true})
    this.props.submitData(skipdata);

  }
  nextSubmit=()=>{
    this.setState({loading:true});
    this.setState({nextbuttonloading:true});
    var skipdata=this.props.signupdata;
    skipdata.questionAnswer=this.state.data;
    this.props.submitData(skipdata);
  }
  render(){
    return(
      <div className="sharemoreabout">
      <ModalHeader toggle={this.toggle} style={{'padding-left':'30px','padding-right':'30px'}}>

      <div style={{}}>
      <div style={{'font-size':'15px','margin-bottom':'2%'}} className="paraheaderstyle"><span className="hello_text">Hello</span> {this.state.signupdata.name+" "+this.state.signupdata.surname},<b></b></div>
      <div className='clr_orange headerstyle' style={{'font-size':'30px',}} >Share more about you</div>
      <div style={{'font-size':'15px','margin-top':'-2%',fontWeight:'normal'}} className="subheaderstyle">and allow us to serve you better!</div>
      </div>

      </ModalHeader>
      <ModalBody style={{'padding-left':'30px','padding-right':'30px'}}>

      <form>
      <table cellPadding='0' className='QuestionModel_tab' style={{'width':'100%'}}>
      {this.state.data.map((item,i) =>   
        <tr style={{'width':'100%'}}>
        <td style={{'width':'80%','font-size':'15px',padding:10}}> {item.question} </td>
        <td style={{'width':'10%',padding:10}}>   

        <div class="inputGroup_check">
        <input id={'radioc-'+i} name={'radio-'+i} type="radio" value="radioc" checked={item.ans_status === 1} onChange={(e) => this.changeState(1,i)}/>
        <label for={'radioc-'+i}><div className="round_back"><img src={CheckSympol} /></div></label>
        </div> 

        </td>
        <td style={{'width':'10%'}}>   

        <div class="inputGroup_close">
        <input id={'radiox-'+i} name={'radio-'+i} type="radio" value="radiox" checked={item.ans_status === 0} onChange={(e) => this.changeState(0,i)}/>
        <label for={'radiox-'+i}><div className="round_back"><img src={CancelSympol} /></div></label>
        </div>

        </td>
        </tr>  
        )}    

      </table>
      <Row style={{'margin-top':'2%'}} className="footerSharepage">
      <Col style={{'justify-content':'right'}}><Button disabled={this.state.loading} loading={this.state.skipbuttonloading} className="btn btn-primary btn-lg mobverify bold-btn-change" style={{'background':'#103eb0',color:'white',height:'auto'}} onClick={this.skip}>SKIP NOW</Button></Col>
      <Col style={{display:'block','text-align':'right'}}><Button disabled={this.state.loading} loading={this.state.nextbuttonloading} className="btn btn-primary btn-lg mobverify bold-btn-change" style={{'background':'#ea5c04',color:'white',width:'57%',height:'auto'}} onClick={this.nextSubmit}>NEXT</Button></Col>
      </Row>

      </form>
      </ModalBody>
      </div>
      )
  }
}
