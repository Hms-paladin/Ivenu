import React from 'react';
import { Modal } from 'antd';
import CarouselImages from '../carouselImages';
export default class GridImages extends React.Component {


	constructor(props) {
		super(props);
		this.state={PhotoVisible:null};
	}
loadImages=(images)=>{
	var arrayofimages=[];
	for(var i=0; i< images.length;i++){
		arrayofimages.push({venue_image_path:images[i]})
	}
	this.setState({PhotoVisible:arrayofimages});
}
	render() {
		return (
			<>
			{this.state.PhotoVisible&&
					<Modal  className="photosmodalcarousel" title="" visible={true}  onOk={()=>this.setState({PhotoVisible:null})} onCancel={()=>this.setState({PhotoVisible:null})}>
					<CarouselImages photos={this.state.PhotoVisible}/>
					</Modal>
				}
			{window.innerWidth>767&&
				<>
			{this.props.imgGrid&&this.props.imgGrid.length>0&&(this.props.imgGrid.length==1 || this.props.imgGrid.length==2)&&
				<div className="GridView">
				{
				this.props.imgGrid.map((obj,index)=>{
				return(
					<div className={`colflex colflex_${this.props.imgGrid.length==1?'fullwidth':index+1}`}><img onClick={()=>this.loadImages(this.props.imgGrid)} src={obj}/></div>
					)
			})
			}
			</div>
		}
			
			{this.props.imgGrid&&this.props.imgGrid.length>0&&this.props.imgGrid.length==3&&
				<div className="GridView threeview">
				<div className="colflex first">
				<img onClick={()=>this.loadImages(this.props.imgGrid)} src={this.props.imgGrid[0]}/>
				</div>
				<div className="colflex second">
				<img onClick={()=>this.loadImages(this.props.imgGrid)} src={this.props.imgGrid[1]}/>
				</div>
				<div className="colflex three">
				<img onClick={()=>this.loadImages(this.props.imgGrid)} src={this.props.imgGrid[2]}/>
				</div>
				</div>

			}
			{this.props.imgGrid&&this.props.imgGrid.length>0&&this.props.imgGrid.length>3&&
				<div className="GridView">
				<div className="colflex first">
					<img onClick={()=>this.loadImages(this.props.imgGrid)} src={this.props.imgGrid[0]}/>
				</div>
				<div className="colflex second">
					<img onClick={()=>this.loadImages(this.props.imgGrid)} src={this.props.imgGrid[1]}/>
				</div>
				<div className="colflex coldiv">
				<div className="gridcol">{<img onClick={()=>this.loadImages(this.props.imgGrid)} src={this.props.imgGrid[2]}/>}</div>
				<div className="gridcol">{this.props.imgGrid.length>4&&<div  onClick={()=>this.loadImages(this.props.imgGrid)} className="moreImages">+ {this.props.imgGrid.length-4} more images</div>}{<img onClick={()=>this.loadImages(this.props.imgGrid)} src={this.props.imgGrid[3]}/>}</div>
				</div>
				</div>

			}
			
				</>
			}
			{window.innerWidth<768&&this.props.imgGrid&&this.props.imgGrid.length>0&&
				<div className="GridView">
				<div className="colflex first mobile">
					<img onClick={()=>this.loadImages(this.props.imgGrid)} src={this.props.imgGrid[0]}/>
				</div>
				</div>
			

			}

			</>
		);
	}
}
