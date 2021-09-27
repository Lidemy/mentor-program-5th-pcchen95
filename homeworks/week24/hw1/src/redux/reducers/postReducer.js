import { createSlice } from "@reduxjs/toolkit";
import {
  getSinglePost as getPostAPI,
  addPost,
  getPosts as getPostsAPI,
  updatePost as updatePostApi,
  deletePost as deletePostApi,
} from "../../WebAPI";

const initialState = {
  isLoadingPost: false,
  post: null,
  posts: null,
  page: null,
  errMessage: null,
};

export const postReducer = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setIsLoadingPost: (state, action) => {
      state.isLoadingPost = action.payload;
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setErrMessage: (state, action) => {
      state.errMessage = action.payload;
    },
  },
});

export const { setIsLoadingPost, setPosts, setPage, setPost, setErrMessage } =
  postReducer.actions;

export const getPosts = (page) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  getPostsAPI(page)
    .then((res) => {
      dispatch(setPage(Math.ceil(res.headers.get("x-total-count") / 5)));
      return res.json();
    })
    .then((posts) => {
      dispatch(setPosts(posts));
      dispatch(setIsLoadingPost(false));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getPost = (id) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  getPostAPI(id)
    .then((res) => {
      dispatch(setPost(res));
      dispatch(setIsLoadingPost(false));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const cleanPost = () => (dispatch) => {
  dispatch(setPost(null));
};

export const cleanPosts = () => (dispatch) => {
  dispatch(setPosts(null));
};

export const newPost = (data) => (dispatch) => {
  return addPost(data).then((res) => {
    if (!res.id) {
      return dispatch(setErrMessage(res.message));
    }
    return res;
  });
};

export const updatePost = (data) => (dispatch) => {
  return updatePostApi(data).then((res) => {
    return res;
  });
};

export const deletePost = (id) => (dispatch) => {
  return deletePostApi(id).then((res) => {
    return res;
  });
};

export const cleanErrMessage = () => (dispatch) => {
  dispatch(setErrMessage(null));
};

export default postReducer.reducer;
