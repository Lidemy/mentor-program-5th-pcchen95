import styled from "styled-components";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getPosts, cleanPosts } from "../../redux/reducers/postReducer";
import { useDispatch, useSelector } from 'react-redux'
import LoadingPage from '../LoadingPage'

const Root = styled.div`
  width: 700px;
  margin: 0 auto;
  padding: 30px 0;
`;

const PostContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 15px;
  margin-top: 14px;
`;

const PostTop = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;
const PostTitle = styled(Link)`
  font-size: 22px;
  color: #333;
  text-decoration: none;
  flex: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const PostContent = styled.div`
  width: 100%;
  padding: 15px 0;
  font-size: 14px;
  color: #5f5f5f;
  word-break: break-all;
`;

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.8);
  font-size: 14px;
  margin-left: 16px;
`;

function Post({ post }) {
  return (
    <PostContainer>
      <PostTop>
        <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
        <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
      </PostTop>
      <PostContent>{post.body.slice(0, 300)}</PostContent>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default function HomePage() {
  const dispatch = useDispatch()
  const isLoading = useSelector(store => store.posts.isLoadingPost)
  const posts = useSelector(store => store.posts.posts)
  useEffect(() => {
    dispatch(getPosts(1))
    return () => dispatch(cleanPosts(null))
  },[dispatch]);

  return (
    <Root>
      {isLoading && <LoadingPage />}
      <h1>最新文章</h1>
      {posts && posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Root>
  );
}
