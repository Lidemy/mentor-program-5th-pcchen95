import { useState } from 'react';
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/actions';

const TodoInputForm = styled.div`
  display: flex;
`;

const TodoInput = styled.input`
  outline: none;
  border-top: solid 1px transparent;
  border-right: solid 1px transparent;
  border-bottom: solid 1px #eac100;
  border-left: solid 1px transparent;
  margin: 0 auto 20px auto;
  flex: 1;
  height: 40px;
  background: #fff8d7;
  font-size: 24px;
  color: #977c00;
  box-sizing: border-box;
`;

export default function AddTodo() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  return (
    <TodoInputForm>
      <TodoInput
        type="text"
        placeholder="Add todo..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            dispatch(addTodo(value));
            setValue('');
          }
        }}
      ></TodoInput>
    </TodoInputForm>
  );
}
