import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './searchbox.css';
import Apilink from '../../helpers/apilink';
import { Popover, Button } from 'antd';
import { Spin, Icon,notification } from 'antd';
const antIcon = <Icon type="loading" style={{ fontSize:20 }} spin />;
// import { SmileOutlined } from '@ant-design/icons';
// const antIcon =<SmileOutlined type="loading" style={{ fontSize:20 }} spin />
export default class Searchbox extends React.Component {
	constructor(props) {
		super(props);
		this.state={checked:false,searchText:'',visible: false,loading:null}

	}
handleChange=(data)=>{
	this.setState({
		checked:data 
	});
}
changeSearchText=(data)=>{
	this.setState({
		searchText:data 
	});
}
searchData=(data)=>{
	this.setState({loading:true})
fetch(Apilink.apiurl+'commonSearch', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(data),
    }).then((response)=>response.json())
.then((responsejson)=>{
	this.setState({loading:null})

	// alert(JSON.stringify(responsejson));
	if(responsejson.status==0){
		this.props.sendSearchedData&&this.props.sendSearchedData(responsejson.data);
	}else{
		this.props.sendSearchedData&&this.props.sendSearchedData([]);
	}
})
}
hide = () => {
    this.setState({
      visible: false,
    });
  };

  handleVisibleChange = visible => {
    this.setState({ visible });
  };
submitSearch=()=>{

	 navigator.geolocation.getCurrentPosition(position => {
	var searchObj={searchContent:this.state.searchText,offset:0,lat:position.coords.latitude,long:position.coords.longitude,nearme:this.state.checked};
	// alert(JSON.stringify(searchObj));
	this.searchData(searchObj);

})
}


	render() {
		const antIcon = <Icon type="loading" style={{ fontSize:16,color:'white',marginLeft:5}} spin />;
	
// const antIcon =<SmileOutlined type="loading"  style={{ fontSize:16,color:'white',marginLeft:5}} spin />

		return (
			<div className="searchboxcomp">
			<p >Explore and Book  various venue {window.innerWidth<768?<br/>:''} types instantly  <Popover
			 className="popoverquestionbox"
        content={<p style={{width:150,wordBreak:'break-word',margin:0}}>Search your venue by <br/>Venue Name, Location, Category or Type.</p>}
        placement="right"
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
      >
       <Button className="popover_quest"><i class="fa fa-question-circle" aria-hidden="true"></i></Button>
      </Popover></p>
      <div className="searchdivmainbox">
			<div className="searchinputbox">
			<input onChange={(e)=>this.changeSearchText(e.target.value)}/>
			<SearchIcon/>
			</div>
			<div className="additionalBoxes">
			 <FormControlLabel
        control={
          <Checkbox
            checked={this.state.checked}
            onChange={()=>this.handleChange(!this.state.checked)}
            value="checkedB"
            color="primary"
          />
        }
        label="Near Me"
      />
      	<a>Advance Search</a>
			</div>
			</div>
			<div className="submitBtnClass">
			<button style={{display:'inline-flex',alignItems:'center',outline:0}} onClick={()=>this.submitSearch()}>Search Venue {this.state.loading&&antIcon} </button>
			</div>
			</div>
		);
	}
}
