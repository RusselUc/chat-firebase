import React,{useState} from 'react';
import { EditorState, convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useHistory } from "react-router-dom";
function Editor() {
  let history = useHistory();
  const [userInfo, setuserInfo] = useState({
    title: '',
  });
  const onChangeValue = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]:e.target.value
    });
  } 
  
  let editorState = EditorState.createEmpty();
  const [description, setDescription] = useState(editorState);
  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  }
  
  const [isError, setError] = useState(null);
  
   
return ( 
<>
  <div className="App">
    <div className="container">
      <div className="row"> 
        <form className="update__forms">
          <h3 className="myaccount-content"> Add  </h3>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label className="font-weight-bold"> Title <span className="required"> * </span> </label>
              <input type="text" name="title" value={userInfo.title} onChange={onChangeValue}  className="form-control" placeholder="Title" required />
            </div>
            <div className="form-group col-md-12 editor">
              <label className="font-weight-bold"> Description <span className="required"> * </span> </label>
                <Editor
                  editorState={description}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onEditorStateChange}
                />
              <textarea style={{display:'none'}} disabled ref={(val) => userInfo.description = val} value={draftToHtml(convertToRaw(description.getCurrentContent())) } />
            </div>
            {isError !== null && <div className="errors"> {isError} </div>}
            <div className="form-group col-sm-12 text-right">
              <button type="submit" className="btn btn__theme"> Submit  </button>
            </div> 
          </div> 
        </form>
      </div>
    </div>
  </div>
</>
)
}
export default Editor