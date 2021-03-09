import React from 'react';
import './uploadphotos.css';
// import plus from '../../images/+.png';
import Upload_popup from '../../components/upload_popup/upload_popup';
import Second_popup_style from '../../components/second-popup-style/second-popup-style';
import Greyright from '../../images/greyright.png';

import { Upload, Icon, Modal } from 'antd';
import Bindname from '../bindname/bindname';
import Choosediv from '../choosediv/choosediv';
// import { Checkbox } from 'antd';

var playarray={value:'id',name:'name',dropdown:[{id:1,name:'play'},{id:2,name:'work'},{id:3,name:'enjoty'}]}
const HeaderContent=<div className="choose-text1">Please Add<span className="choose-text2"> Photos</span> </div>;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


export default class Uploadphotos extends React.Component {




	constructor(props) {
		super(props);

		this.state=
		{
			 previewVisible:false,
    previewImage:'',
    fileList:[],
    imageData:[]
};
	}

	onSave=()=>{
this.props.uploadImageCallback(this.state.fileList,this.state.imageData);
	}


  handleCancel = () => this.setState({ previewVisible:false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage:file.url || file.preview,
      previewVisible:true,
    });
  };

  handleChange = ({ fileList }) =>{
  	console.log("fiellist",fileList);
 var imageData=fileList.filter(obj=>!obj.exist).map(value => value.originFileObj?value.originFileObj:value)
  this.setState({ fileList,imageData:imageData});
  if(window.innerWidth<768){
  	this.props.uploadImageCallback(fileList,imageData);
  }

}
sendUploadClick=()=>{
	document.querySelector(".ant-upload input").click();
}
	render() {
		const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
		return (
			<div className="uploadform-maindiv">
			<Bindname text="Photos"/>
			<Choosediv  content={HeaderContent} changeActive={(data,action)=>this.props.changeActive(data,action)} prev={6} next={8}/>

			{window.innerWidth>767&&
			<div className="uploadform-div">
			<div className="popup-div">
			<Second_popup_style sendUploadClick={this.sendUploadClick}/>
			</div>

			<div className="uploadsave-div">
			<button type="button" className="uploadsave-button" onClick={()=>this.onSave()}><span className="uploadsave-span">SAVE</span></button>
			</div>
			
			</div>
		}
			<div className="photos">
			<div className="clearfix">
			<Upload
			// action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
			listType="picture-card"
			fileList={fileList}
			onPreview={this.handlePreview}
			onChange={this.handleChange}
			multiple
			>
			{fileList.length >= 15 ? null :uploadButton}
			</Upload>
				
			<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
			<img alt="example" style={{ width:'100%' }} src={previewImage} />
			</Modal>
			</div>
			</div>
{window.innerWidth<768&&
			<div className="popup-div">
			<Second_popup_style sendUploadClick={this.sendUploadClick}/>
			</div>
		}
			</div>			
			
			);
	}

	componentDidMount(){

		if(this.props.fileListData && this.props.imageData){
			this.setState({fileList:this.props.fileListData,imageData:this.props.imageData})
		}

}
}