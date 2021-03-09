import React, { Component } from 'react';
import {notification,Progress} from 'antd';
import ReactDOM from 'react-dom';
class LoadAPIPost extends Component {

LoadApi=(formdata,url,upload,callback)=>{
		var progressBar={};
				if(upload){
var bodydocument=document.getElementsByTagName('body');
	var elementdiv=document.createElement('div');
	var elementdiv1=document.createElement('div');
	elementdiv.setAttribute('id','loadinprogressbar');
         if(window.innerWidth>767){

	document.body.appendChild(elementdiv);
	}
}
			  var xhr = new XMLHttpRequest();
xhr.open("POST",url, true);
xhr.onreadystatechange = function() {
    
  }
  xhr.onerror = function() {
    // console.log("There was an error");
    	callback("networkerror",null);

};
xhr.upload.onprogress = function (e) {
	if(upload){
       
    if (e.lengthComputable) {
        progressBar.max = e.total;
        progressBar.value = e.loaded;
        var percentage= Math.round((e.loaded / e.total) * 100);
        console.log('percentage',percentage);
        if(window.innerWidth>767){
        ReactDOM.render(<div className="divprogressbar"><Progress type="circle" percent={percentage} />
		<span id="progressText">File Uploading Please Wait ...</span>
		</div>,document.getElementById('loadinprogressbar'));
            }
        // self.setState({percent:(e.loaded/e.total)*100})
    console.log("progressBar.loading",e.loaded);
    console.log("progressBar.total",e.total);

    }
}else{

}
}
xhr.upload.onloadstart = function (e) {
    // progressBar.value = 0;
    // this.removeRenderLoading();
    // console.log("progressBar.start",progressBar.value);

}
xhr.upload.onloadend = function (e) {
	 if(upload){
         if(window.innerWidth>767){
	document.getElementById('progressText').innerHTML=window.innerWidth>768?"Uploading Done Please Wait ...":'Processing plese wait...'
}

	// setTimeout(()=>{
 //    // document.body.removeChild(document.getElementById('loadinprogressbar'));
	// },4000)
	}
    // progressBar.value = e.loaded;
    // console.log("progressBar.done",progressBar.value);
}
xhr.onload=function(){
	if (xhr.status === 200) {
      if(upload){
         if(window.innerWidth>767){

    	document.body.removeChild(document.getElementById('loadinprogressbar'));
    }
    	callback(null,xhr.response);

	}else{
    	callback(null,xhr.response);

	}
}
}
xhr.send(formdata)
	}
}
export default new LoadAPIPost();