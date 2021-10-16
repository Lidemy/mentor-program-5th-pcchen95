import styled from "styled-components";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { newPost, cleanErrMessage } from "../../redux/reducers/postReducer";
import { useDispatch, useSelector } from "react-redux";

const Root = styled.div`
  width: 700px;
  margin: 0 auto;
  text-align: center;
`;

const PostContainer = styled.div`
  width: 500px;
  margin: 0 auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const PostTitle = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 10px;
  color: #333;
  margin-bottom: 24px;
  margin-top: 14px;
`;

const PostContent = styled.textarea`
  height: 500px;
  width: 100%;
  margin-bottom: 24px;
  margin-top: 14px;
  padding: 10px;
  white-space: ;
`;

const Button = styled.button`
  width: 80px;
  height: 40px;
  background: grey;
  color: white;
  border: none;
  text-align: center;
  cursor: pointer;
`;

const Error = styled.div`
  color: red;
`;

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const errMessage = useSelector((store) => store.posts.errMessage);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    dispatch(
      newPost({
        title,
        body,
      })
    ).then((newPostResponse) => {
      if (newPostResponse && newPostResponse.id) {
        history.push(`/posts/${newPostResponse.id}`);
      }
    });
  };

  useEffect(() => {
    return () => dispatch(cleanErrMessage());
  }, [dispatch]);

  return (
    <Root>
      <form onSubmit={handleSubmit}>
        {errMessage && (
          <Error>
            {errMessage.includes("title")
              ? "請輸入標題"
              : errMessage.includes("body")
              ? "請輸入文章內容"
              : errMessage}
          </Error>
        )}
        <PostContainer>
          標題
          <PostTitle
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></PostTitle>
          內容
          <PostContent
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></PostContent>
          <Button type="submit">送出</Button>
        </PostContainer>
      </form>
    </Root>
  );
}
