import styled from "styled-components";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import {
  getPosts,
  cleanPosts,
  deletePost,
} from "../../redux/reducers/postReducer";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "../LoadingPage";

const Root = styled.div`
  width: 700px;
  margin: 0 auto;
  padding: 30px 0;
`;

const PostContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 15px;
  margin-top: 14px;
  height: 180px;
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

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
`;

const PageBtnGroup = styled.div`
  display: flex;
  width: 120px;
`;

const FirstPage = styled(Link)`
  display: none;
  text-decoration: none;
  color: #3c3c3c;
  font-size: 14px;

  ${(props) =>
    props.$active &&
    `
      display: flex;
    `}
`;
const PreviousPage = styled(Link)`
  display: none;
  text-decoration: none;
  color: #3c3c3c;
  margin-left: 16px;
  font-size: 14px;

  ${(props) =>
    props.$active &&
    `
      display: flex;
    `}
`;
const NextPage = styled(Link)`
  display: none;
  text-decoration: none;
  margin-left: 16px;
  color: #3c3c3c;
  font-size: 14px;

  ${(props) =>
    props.$active &&
    `
      display: flex;
    `}
`;
const LastPage = styled(Link)`
  display: none;
  text-decoration: none;
  margin-left: 16px;
  color: #3c3c3c;
  font-size: 14px;

  ${(props) =>
    props.$active &&
    `
      display: flex;
    `}
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

function Post({ post, dispatch, page, user }) {
  const handleDelete = (id) => {
    dispatch(deletePost(id)).then((res) => {
      dispatch(getPosts(page));
    });
  };

  return (
    <PostContainer>
      <PostTop>
        <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
        <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
      </PostTop>
      <PostContent>
        {user && (
          <ButtonGroup>
            <EditButton to={`/posts/update/${post.id}`}>編輯</EditButton>
            <DeleteButton onClick={() => handleDelete(post.id)}>
              刪除
            </DeleteButton>
          </ButtonGroup>
        )}
        {post.body.slice(0, 200)}
      </PostContent>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default function ArchivePage() {
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.posts.isLoadingPost);
  const posts = useSelector((store) => store.posts.posts);
  const totalPage = useSelector((store) => store.posts.page);
  const user = useSelector((store) => store.users.user);
  let { page } = useParams();
  page = Number(page) || 1;

  useEffect(() => {
    dispatch(getPosts(page));
    return () => dispatch(cleanPosts(null));
  }, [page, dispatch]);

  return (
    <Root>
      {isLoading && <LoadingPage />}
      {posts &&
        posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            dispatch={dispatch}
            page={page}
            user={user}
          />
        ))}
      <Pagination>
        <PageBtnGroup>
          <FirstPage to={`/archives/1`} $active={page !== 1}>
            第一頁
          </FirstPage>
          <PreviousPage to={`/archives/${page - 1}`} $active={page - 1 > 0}>
            上一頁
          </PreviousPage>
        </PageBtnGroup>
        <div>
          第 {page} 頁 / 共 {totalPage} 頁
        </div>
        <PageBtnGroup>
          <NextPage
            to={`/archives/${page + 1}`}
            $active={page + 1 <= totalPage}
          >
            下一頁
          </NextPage>
          <LastPage to={`/archives/${totalPage}`} $active={page !== totalPage}>
            最末頁
          </LastPage>
        </PageBtnGroup>
      </Pagination>
    </Root>
  );
}
