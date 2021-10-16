import styled from "styled-components";
import { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  getPost,
  cleanPost,
  deletePost,
} from "../../redux/reducers/postReducer";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "../LoadingPage";

const Root = styled.div`
  width: 700px;
  margin: 0 auto;
`;

const PostContainer = styled.div`
  border-radius: 5px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;
const PostTitle = styled.div`
  margin: 16px 0;
  font-size: 24px;
  color: #333;
`;

const PostDate = styled.div`
  text-align: right;
  width: 100%;
  color: rgba(0, 0, 0, 0.8);
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

const PostContent = styled.div`
  padding: 30px;
  line-height: 1.5rem;
  color: #5f5f5f;
`;

const ButtonGroup = styled.div`
  display: flex;
`;

const EditButton = styled(Link)`
  border: 1px solid grey;
  background: white;
  text-decoration: none;
  color: grey;
  padding: 5px 10px;
`;

const DeleteButton = styled.div`
  border: 1px solid grey;
  background: white;
  color: grey;
  padding: 5px 10px;
  margin-left: 10px;
  cursor: pointer;
`;

export default function PostPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((store) => store.posts.isLoadingPost);
  const post = useSelector((store) => store.posts.post);
  const user = useSelector((store) => store.users.user);

  useEffect(() => {
    dispatch(getPost(id));
    return () => dispatch(cleanPost(null));
  }, [id, dispatch]);

  const handleDelete = () => {
    dispatch(deletePost(id)).then((res) => {
      history.push("/");
    });
  };

  return (
    <Root>
      {isLoading && <LoadingPage />}
      {post && (
        <PostContainer>
          <PostTitle>{post.title}</PostTitle>
          <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
          {user && (
            <ButtonGroup>
              <EditButton to={`/posts/update/${id}`}>編輯</EditButton>
              <DeleteButton onClick={handleDelete}>刪除</DeleteButton>
            </ButtonGroup>
          )}
          <PostContent>{post.body}</PostContent>
        </PostContainer>
      )}
    </Root>
  );
}
