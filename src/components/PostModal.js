import React,{useState} from 'react'
import styled from "styled-components";
import closeIcon from "../assets/closeIcon.svg";
import userSvg from "../assets/user.svg";
import videoIcon from "../assets/video.svg";
import imageIcon from "../assets/image.png";
import commentIcon from "../assets/postComment.png";
import ReactPlayer from "react-player";
import {connect} from 'react-redux';
import {Timestamp} from "firebase/firestore";
import { postArticleAPI } from '../actions';
const PostModal = (props) => {
    const [editorText,setEditorText]= useState("");
    const [sharedImage,setSharedImage] = useState("");
    const [videoLink,setVideoLink] = useState("");
    const [assetArea,setAssetArea] = useState('');

    let displayName='';
    let userNameArray = props.user ? props.user.displayName : "";
    let userName = props.user ? userNameArray.split(' '):"";
  
    for(let i = 0; i < userName.length;i++){
        userName[i] = userName[i][0].toUpperCase() + userName[i].substr(1).toLowerCase();
    }
    displayName = userName.join(" ");

    const handleChange = (e)=> {
        const image = e.target.files[0];
        if(image === "" ||  image === undefined){
            alert(`Not an image, file is of ${typeof image}`);
            return;
        }
        setSharedImage(image);
    }

    const switchAssetArea = (area) =>{
        setSharedImage('');
        setVideoLink('');
        setAssetArea(area);

    }
    const postArticle = (e) => {
        e.preventDefault();
        if(e.target !== e.currentTarget){
            return;
        }
        const payload= {
            image : sharedImage,
            video: videoLink,
            user: props.user,
            description: editorText,
            timestamp: Timestamp.now(),
        }
        props.postArticle(payload);
        reset(e);
    }
    const reset = (e) => {
        e.preventDefault();
        setVideoLink('');
        setSharedImage('');
        setAssetArea('');
        setEditorText("");
        props.handleClick(e);
    }

  return (
    <>
    {props.showModal === 'open' && 
    <Container>
        <Content>
            <Header>
                <h2>Create a Post</h2>
                <button onClick = {(event)=> reset(event)}><img src={closeIcon} alt=""/></button>
            </Header>
            <SharedContent>
                <UserInfo>
                    {props.user.photoURL ? (<img src={props.user.photoURL} alt=""/> ):(<img src={userSvg} alt=""/>)}
                    <span>{displayName}</span>
                </UserInfo>
                <Editor>
                    
                <textarea value={editorText} onChange={(e)=>setEditorText(e.target.value)}
                placeholder="What do you want to talk about?" autoFocus={true}></textarea>
                 {assetArea === 'image' ?
                (<UploadImage >
                    <input type="file" accept = 'image/gif,image/jpeg,image/png' name ='image' id='file'
                    style={{display:"none"}}
                    onChange={handleChange}/>
                    <p><label htmlFor="file">Select an image to share</label></p>
                    {sharedImage && <img src={URL.createObjectURL(sharedImage)} alt=""/>}
                </UploadImage>)
                :( assetArea === 'media' && (
                    <>
                        <input type='text' placeholder = "Please enter a video link" value={videoLink} 
                        onChange={(e)=>setVideoLink(e.target.value)} style={{marginTop:'10px' , paddingLeft:'5px'}}/>
                        {videoLink && (
                            <ReactPlayer width={"100%"} url={videoLink}/>
                        )}
                    </>
                    )
                    )}
                </Editor>
            </SharedContent>
            <ShareCreation>
                <AttachAssets>
                    <AssetButton onClick={e=>switchAssetArea("image")}>
                        <img src = {imageIcon} alt =""/>
                    </AssetButton>
                    <AssetButton onClick={e=>switchAssetArea("media")}>
                        <img src={videoIcon} alt=""/>
                    </AssetButton>
                </AttachAssets>
                <SharedComment>
                    <AssetButton>
                        <img src={commentIcon} alt=""/>Anyone
                    </AssetButton>
                </SharedComment>
                <PostButton disabled={!editorText ? true : false} onClick = {(event)=>postArticle(event)}>
                    Post
                </PostButton>
            </ShareCreation>
        </Content>
    </Container>
}
    </>
  )
}
const Container = styled.div`
position:fixed;
top:0;
left:0;
right:0;
bottom:0;
z-index:1000;
color:black;
background:rgba(0,0,0,0.7);
animation: fadeIn 1s;
`;

const Content = styled.div`
width: 100%;
max-width:552px;
background:white;
max-height: 90%;
overflow:initial;
border-radius:5px;
position:relative;
display:flex;
flex-direction:column;
top:32px;
margin: 0 auto;
`;
const Header = styled.div`
display:block;
padding:16px 20px;
border-bottom: 1px solid rgba(0,0,0,0.15);
font-size: 16px;
line-height: 1.5;
color:rgba(0,0,0,0.6);
font-weight:400;
display:flex;
justify-content:space-between;
align-items:center;
button{
    height:40px;
    width:40px;
    min-width:auto;
    cursor:pointer;
    color:rgba(0,0,0,0.15);
    svg,img{
        height:30px;
        width:30px;
        pointer-events:none;
        color:color:rgba(0,0,0,0.5);
    }
}
`;
const SharedContent = styled.div`
display:flex;
flex-direction:column;
flex-grow: 1;
overflow-y:auto;
vertical-align:baseline;
background:transparent;
padding: 8px 12px;
`;
const UserInfo = styled.div`
display:flex;
align-items: center;
padding:12px 24px;
svg,img{
    width:48px;
    height:48px;
    background-clip:content-box;
    border:2px solid transparent;
    border-radius:50%;
    cursor:pointer;
}
span{
    font-weight: 600;
    font-size:1rem;
    line-height: 1.5;
    margin-left:5px;
}

`;
const ShareCreation = styled.div`
display:flex;
justify-content:space-between;
padding:12px 24px 12px 16px;
`
;

const AssetButton = styled.button`
display:flex;
align-items:center;
justify-content:center;
height: 40px;
min-width:auto;
color:rgba(0,0,0,0.5);
cursor:pointer;
img{
    width:32px;
    height:30px;


}
`;

const AttachAssets = styled.div`
display:flex;
align-items:center;
padding-right:8px;
${AssetButton} {
    width:40px;
}
`;
const SharedComment = styled.div`
padding-left: 8px;
margin-right:auto;
border-left:1px solid rgba(0,0,0,0.15);
${AssetButton}{
    svg,img{
        
    }
}
`;
const PostButton = styled.button`
min-width:60px;
border-radius:20px;
padding-left :16px;
padding-right: 16px;
background:${(props) => (props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2")};
color:${(props) => (props.disabled ? "rgba(255,255,255,0.5)" : "white")};
outline:none;
cursor:pointer;
border:none;
&:hover{
    background:${(props) => (props.disabled ? "rgba(0,0,0,0.3   )" : "#004182")};
}
`;
const Editor = styled.div`
padding:12px 24px;
textarea{
    width:100%;
    min-height:100px;
    resize:none;
    padding:5px;
}
input{
    width:100%;
    height:35px;
    font-size:16px;
    margin-bottom:20px;
    
}
`;
const UploadImage = styled.div`
text-align:center;
margin:0.9rem 0;

label,input{
    padding:8px;
border-radius:5px;
transition: all ease 0.2s ;
cursor:pointer;
outline:none;
border:1px solid rgba(0,0,0,0.5);
}
img{
    
    width:100%;
}

`;

const mapStateToProps = (state) => {return {
    user: state.userState.user,
};}
const mapDispatchToProps = (dispatch) => ({
 postArticle : (payload)=> dispatch(postArticleAPI(payload))
});
export default connect(mapStateToProps,mapDispatchToProps)(PostModal);