import React, {Component} from 'react';
import './modal.css';
import { Modal, Button } from 'antd';
import google from '../../images/google.png';
import insta from '../../images/insta.png';
import fb from '../../images/fb.png';
import  Modal_login_1 from '../modal_login_1/modal_login_1';
import  Modal_login_2 from '../modal_login_2/modal_login_2';


class Modalview extends Component
{
	
render()
{

  return(
    <div className="modalview">
   
    <Modal_login_1/>
    {/*<Modal_login_2/>*/}

    </div>
    );
}
}
export default Modalview;