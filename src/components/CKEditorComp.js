import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
class CkEditorComp extends Component {
    render() {
        return (
            <div className="CalendarBox">
                <CKEditor style={{height: 170}}
                      config={  { removePlugins: [  'MediaEmbed','ImageUpload',"Link" ]}}
                    editor={ ClassicEditor }
                    data={this.props.moreDetails&&this.props.moreDetails}
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        this.props.sendEditorData&&this.props.sendEditorData(data);
                        // console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
            </div>
        );
    }
}

export default CkEditorComp;