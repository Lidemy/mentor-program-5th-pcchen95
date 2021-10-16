import styled from "styled-components";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { register, cleanErrMessage } from "../../redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

const Root = styled.div`
  width: 700px;
  margin: 0 auto;
  text-align: center;
`;

const Field = styled.div`
  margin-top: 16px;
`;

const Input = styled.input`
  width: 200px;
  padding: 8px;
  font-size: 14px;
`;

const Button = styled.button`
  cursor: pointer;
  width: 80px;
  height: 40px;
  border: 1px solid grey;
  margin-top: 20px;
`;

const Error = styled.div`
  margin-top: 16px;
  color: red;
`;

export default function RegisterPage() {
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const errMessage = useSelector((store) => store.users.errMessage);

  const handleSubmit = (e) => {
    dispatch(register(nickname, username, password)).then((user) => {
      if (user && user.id) {
        history.push("/");
      }
    });
  };

  useEffect(() => {
    return () => dispatch(cleanErrMessage());
  }, [dispatch]);

  return (
    <Root>
      <form onSubmit={handleSubmit}>
        <Field>
          NICKNAME:{" "}
          <Input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </Field>
        <Field>
          USERNAME:{" "}
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Field>
        <Field>
          PASSWORD:{" "}
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        <Button type="submit">註冊</Button>
        {errMessage && (
          <Error>
            {errMessage.includes("required")
              ? "請填入所有欄位"
              : errMessage.includes("exists")
              ? "此帳號已存在"
              : errMessage}
          </Error>
        )}
      </form>
    </Root>
  );
}
