import styled from "styled-components";
import React, { useState, useEffect } from "react";
import threeDotIcon from "../assets/ellipsis.png";
import userIcon from "../assets/user.svg";
import postImage from "../assets/postImage.jpg";
import thumbsIcon from "../assets/thumbs.png";
import clappingIcon from "../assets/clapping.png";
import likeIcon from "../assets/like.png";
import shareIcon from "../assets/share.png";
import sendIcon from "../assets/send.png";
import videoIconSvg from "../assets/videoIcon.svg";
import photoIconSvg from "../assets/photoIconSvg.svg";
import eventIconSvg from "../assets/eventIconSvg.svg";
import articleIconSvg from "../assets/articleIconSvg.svg";
import loadingSpinner from "../assets/loadingSpinner.svg";
import commentIcon from "../assets/comment.png";
import { connect } from "react-redux";
import PostModal from "./PostModal";
import { getArticlesAPI } from "../actions";
import ReactPlayer from "react-player";
const Main = (props) => {
  const [showModal, setShowModal] = useState("close");

  useEffect(() => {
    props.getArticles();
  }, [props.article]);
  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };
  return (
    <>
      {props.articles.length === 0 ? (
        <h3>There are no articles!</h3>
      ) : (
        <Container>
          <ShareBox>
            <div>
              {props.user && props.user.photoURL ? (
                <img src={props.user.photoURL} alt="" />
              ) : (
                <img src={userIcon} alt="" />
              )}
              <button
                onClick={handleClick}
                disabled={props.loading ? true : false}
                style={{ cursor: "pointer", textAlign: "left" }}
              >
                Start a post
              </button>
            </div>
            <div>
              <button>
                <span>
                  <img src={photoIconSvg} alt="" />
                </span>

                <span>Photo</span>
              </button>
              <button>
                <span>
                  <img src={videoIconSvg} alt="" />
                </span>

                <span>Video</span>
              </button>
              <button>
                <span>
                  <img src={eventIconSvg} alt="" />
                </span>
                <span>Event</span>
              </button>
              <button>
                <span>
                  <img src={articleIconSvg} alt="" />
                </span>
                <span>Article</span>
              </button>
            </div>
          </ShareBox>
          <Content>
            {props.loading && <img src={loadingSpinner} alt="" />}
            {props.articles.length > 0 &&
              props.articles.map((article, key) => (
                <Article key={key}>
                  <SharedActor>
                    <a>
                      <img src={article.actor.image} alt="" />
                      <div>
                        <span>{article.actor.title}</span>
                        <span>{article.actor.description}</span>
                        <span>
                          {article.actor.date.toDate().toLocaleDateString()}
                        </span>
                      </div>
                    </a>
                    <button>
                      <img src={threeDotIcon} alt="" />
                    </button>
                  </SharedActor>
                  <Description>{article.description}</Description>
                  <SharedImage>
                    <a>
                      {article.video ? (
                        <ReactPlayer width={"100%"} url={article.video} />
                      ) : (
                        <img src={article.sharedImg} alt="" />
                      )}
                    </a>
                  </SharedImage>
                  <SocialCounts>
                    <li>
                      <button>
                        <img src={thumbsIcon} alt="" />
                        <img src={clappingIcon} alt="" />
                        <span>75</span>
                      </button>
                    </li>
                    <li>
                      <a>2 comments , 6 shares</a>
                    </li>
                  </SocialCounts>
                  <SocialActions>
                    <button>
                      <img src={likeIcon} alt="" />
                      <span>Like</span>
                    </button>
                    <button>
                      <img src={commentIcon} alt="" />
                      <span>Comments</span>
                    </button>
                    <button>
                      <img src={shareIcon} alt="" />
                      <span>Share</span>
                    </button>
                    <button>
                      <img src={sendIcon} alt="" />
                      <span>Send</span>
                    </button>
                  </SocialActions>
                </Article>
              ))}
          </Content>
          <PostModal showModal={showModal} handleClick={handleClick} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  grid-area: main;
`;
const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;

  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0/ 15%), 0 0 0 rgb(0 0 0 / 20%);
`;
const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 16px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 5px 0;
        flex-grow: 1;
        border-radius: 35px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        padding-left: 16px;
        background-color: white;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;

      justify-content: space-evenly;
      align-items: center;
      padding-bottom: 5px;
      button {
        padding: 8px;
        border-radius: 5px;
        cursor: pointer;
        transition: all ease 0.3s;
        span {
          img {
            margin-right: 10px;
            margin-top: 5px;
          }
        }
      }
      button:hover {
        background: #ebebeb;
      }
      @media (max-width: 500) {
        button {
          transform: scale(0.8);
        }
      }
    }
  }
`;
const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;
const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: wrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  a {
    margin-right: 10px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 19px;
          font-weight: 500;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    outline: none;
    border: none;
    right: 12px;
    top: 0;
    background: transparent;
    img {
      width: 25px;
      height: auto;
    }
  }
`;
const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  text-align: left;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.9);
`;
const SharedImage = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
const SocialCounts = styled.div`
  line-height: 1.3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    a {
      font-size: 16px;
    }
    button {
      background: transparent;
      outline: none;
      border: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 14px;
        height: 14px;
      }
      span {
        margin-left: 10px;
        font-size: 15px;
      }
    }
  }
`;
const SocialActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-height: 40px;
  margin: 0;
  padding: 10px 8px;
  button {
    background-color: transparent;
    outline: none;
    border: none;
    display: inline-flex;
    align-items: center;
    border-radius: 5px;
    padding: 13px 9px;
    color: #0a66c2;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      background: rgba(0, 0, 0, 0.08);
    }
    img {
      width: 15px;
      height: 15px;
    }
    span {
      font-size: 13px;
    }
    @media (min-width: 768px) {
      img {
        width: 18px;
        height: 18px;
      }
      span {
        margin-left: 8px;
        font-size: 18px;
      }
    }
  }
`;
const Content = styled.div`
  text-align: center;
  & > img {
    width: 60px;
  }
`;
const mapStateToProps = (state) => {
  return {
    loading: state.articleState.loading,
    user: state.userState.user,
    articles: state.articleState.articles,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
