import styled from "styled-components";
import { useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import HomePage from "../../pages/HomePage";
import ArchivePage from "../../pages/ArchivePage";
import AboutPage from "../../pages/AboutPage";
import PostPage from "../../pages/Post";
import NewPost from "../../pages/NewPost";
import UpdatePost from "../../pages/UpdatePost";
import Header from "../Header";
import { getMe } from "../../redux/reducers/userReducer";

const Root = styled.div`
  padding-top: 64px;
`;

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getMe());
  }, [dispatch]);

  return (
    <Root>
      <Router basename={process.env.PUBLIC_URL}>
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/archives/:page">
            <ArchivePage />
          </Route>
          <Route exact path="/about">
            <AboutPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/posts/:id">
            <PostPage />
          </Route>
          <Route exact path="/new-post">
            <NewPost />
          </Route>
          <Route exact path="/posts/update/:id">
            <UpdatePost />
          </Route>
        </Switch>
      </Router>
    </Root>
  );
}
