import React from 'react';
import styled from "styled-components";
import { useSelector } from 'react-redux';
import { selectTodos, selectFilter } from './redux/selectors';
import AddTodo from './components/AddTodo';
import TodoItem from './components/TodoItem';
import FilterButton from './components/FilterButton';

const Main = styled.main`
  width: 700px;
  height: auto;
  margin: 80px auto;
  background: #fff8d7;
  text-align: center;
  border: solid 1px #eac100;
  border-radius: 10px;
  box-shadow: 1.8px 2.4px 5px 0 rgb(0 0 0 / 30%);
  box-sizing: border-box;
  padding: 50px 30px;
`;

const TodoTitle = styled.div`
  width: 100%;
  font-size: 55px;
  box-sizing: border-box;
  color: #5b4b00;
`;

const RemarkWord = styled.div`
  text-align: left;
  color: #6d6a5c;
  margin-top: 20px;
`;

function writeTodosToLocalStorage(todoData) {
  window.localStorage.setItem("todos", JSON.stringify(todoData));
}

function App() {
  const todos = useSelector(selectTodos);
  const filter = useSelector(selectFilter);

  React.useEffect(() => {
    writeTodosToLocalStorage({ todos, visibilityFilter: filter });
  }, [todos, filter]);

  return (
    <Main>
      <TodoTitle>Todo List</TodoTitle>
      <AddTodo />
      {
        filter === 'all' ? todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
            />
          );
          // eslint-disable-next-line 
        }) : (filter === 'active' ? todos.map((todo) => {
          if (todo.isCompleted === false)
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
              />
            );
            // eslint-disable-next-line   
        }) : todos.map((todo) => {
          if (todo.isCompleted === true)
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
              />
            );   
        })) 
      }
      <FilterButton filter={filter} />
      <RemarkWord>Double click to edit.</RemarkWord>
    </Main>
  );
}

export default App;
