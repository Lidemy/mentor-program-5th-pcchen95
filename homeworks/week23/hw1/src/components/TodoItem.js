import { useDispatch } from 'react-redux';
import { deleteTodo, toggleTodo, updateTodo } from '../redux/actions';
import styled from "styled-components";
import { useState } from 'react';

const TodoItemWrapper = styled.div`
  width: 100%;
  height: 50px;
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
  position: relative;
  box-sizing: border-box;

  ${(props) =>
    props.isCompleted &&
    `
    ${TodoContentWrapper} {
      & ${TodoContent} {
        text-decoration: line-through;
        color: #dbc665;
        transition: all 0.2s;
      }

      & ${Checkbox} {
        border-color: #dbc665;
        transition: all 0.2s;

        &:before, &:after {
          content: ''; 
          display: block;
          position: absolute;
          border-radius: 2px; 
          transform-origin: center center;
        }

        &:before{
          width: 2px;
          height: 10px;
          top: 22px;
          left: 8px;
          transform: rotate(-45deg);
          background: #dbc665;
          z-index: 20;
        }

        &:after {
          width: 2px;
          height: 25px;
          top: 9.5px;
          left: 19.5px;
          transform: translate(0, 0) rotate(-140deg);
          background: #dbc665;
          box-shadow: 0 0 0 3px #FFF8D7;
          z-index: 10;
        }
      }
    }

    & ${ButtonDelete} {
      &:after,
      &:before {
        background: #dbc665;
      }
    }
  `}
`;
const TodoContentWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 600px;
`;

const Checkbox = styled.div`
  width: 20px;
  height: 20px;
  border: solid 2px #977c00;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 16px;
`;

let TodoContent = styled.div`
  color: #977c00;
  flex: 1;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
`;

let TodoContentInput = styled.input`
  outline: none;
  border-top: solid 1px transparent;
  border-right: solid 1px transparent;
  border-bottom: solid 1px #eac100;
  border-left: solid 1px transparent;
  flex: 1;
  height: 40px;
  background: #fff8d7;
  font-size: 28px;
  color: #67655c;
  box-sizing: border-box;
`;

const ButtonDelete = styled.div`
  & {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 0;
    cursor: pointer;
  }

  &:after,
  &:before {
    content: "";
    position: absolute;
    right: 0px;
    height: 20px;
    width: 2px;
    background: #977c00;
    transition: all 0.2s;
  }

  &:after {
    transform: translate(-10px, 0) rotate(-45deg);
    transition: all 0.2s;
  }

  &:before {
    transform: translate(-10px, 0) rotate(45deg);
    transition: all 0.2s;
  }
`;

export default function TodoItem({todo}) {
  const [value, setValue] = useState(todo.name);
  const [inputToggle, setInputToggle] = useState(true);
  const dispatch = useDispatch()

  return (
    <TodoItemWrapper data-todo-id={todo.id} isCompleted={todo.isCompleted}>
      <TodoContentWrapper>
        <Checkbox onClick={() => {
          dispatch(toggleTodo(todo.id));
        }} />
        {inputToggle ? (
          <TodoContent onDoubleClick={() => {
            setInputToggle(false)
          }}>
            {todo.name}
          </TodoContent>
        ) : (
          <TodoContentInput
            value={value}
            type="text"
            onChange={(e) => setValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                dispatch(updateTodo(todo.id, value));
                setInputToggle(true);
              }
            }}
          ></TodoContentInput>
        )}
      </TodoContentWrapper>
      <ButtonDelete onClick={() => {
          dispatch(deleteTodo(todo.id));
        }}></ButtonDelete>
    </TodoItemWrapper>
  );
}
