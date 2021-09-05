import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

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

const TodoTitle = styled.div`
  width: 100%;
  font-size: 55px;
  box-sizing: border-box;
  color: #5b4b00;
`;

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
    props.isDone &&
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

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const StateButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StateButton = styled.div`
  border: 1px solid #977c00;
  border-radius: 3px;
  padding: 5px 8px;
  box-sizing: border-box;
  color: #977c00;
  cursor: pointer;

  & + & {
    margin-left: 5px;
  }

  ${(props) =>
    props.$active &&
    `
      background: #977c00;
      color: white;
    `}
`;

const DeleteAllButton = styled.div`
  cursor: pointer;
  color: #8c8c8c;
  font-size: 18px;
`;

const RemarkWord = styled.div`
  text-align: left;
  color: #6d6a5c;
  margin-top: 20px;
`;

function writeTodosToLocalStorage(todos) {
  window.localStorage.setItem("todos", JSON.stringify(todos));
}

function TodoItem({
  todo,
  handleDeleteTodo,
  handleToogleIsDone,
  handleUpdateTodo,
}) {
  const [value, setValue] = useState(todo.content);
  const [inputToggle, setInputToggle] = useState(true);

  const handleToggleClick = () => {
    handleToogleIsDone(todo.id);
  };

  const handleDeleteClick = () => {
    handleDeleteTodo(todo.id);
  };

  const handleContentChange = (e) => {
    setValue(e.target.value);
  };

  const handleDoubleClick = (e) => {
    setInputToggle(!inputToggle);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleUpdateTodo(todo.id, value);
      setInputToggle(true);
    }
  };

  return (
    <TodoItemWrapper data-todo-id={todo.id} isDone={todo.isDone}>
      <TodoContentWrapper>
        <Checkbox onClick={handleToggleClick} />
        {inputToggle ? (
          <TodoContent onDoubleClick={handleDoubleClick}>
            {todo.content}
          </TodoContent>
        ) : (
          <TodoContentInput
            value={value}
            onChange={handleContentChange}
            onKeyPress={handleKeyPress}
            type="text"
          ></TodoContentInput>
        )}
      </TodoContentWrapper>
      <ButtonDelete onClick={handleDeleteClick}></ButtonDelete>
    </TodoItemWrapper>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object,
  handleDeleteTodo: PropTypes.func,
  handleToogleIsDone: PropTypes.func,
  handleUpdateTodo: PropTypes.func,
};

function App() {
  const id = useRef(1);
  const [todos, setTodos] = useState(() => {
    let todoData = window.localStorage.getItem("todos") || "";
    if (todoData && JSON.parse(todoData).length > 0) {
      todoData = JSON.parse(todoData);
      id.current = todoData[0].id + 1;
    } else {
      todoData = [];
    }
    return todoData;
  });
  const [value, setValue] = useState("");
  const [isDoneFilter, setIsDoneFilter] = useState("");

  useEffect(() => {
    writeTodosToLocalStorage(todos);
  }, [todos]);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && value !== "") {
      setTodos([
        {
          id: id.current,
          content: value,
          isDone: false,
        },
        ...todos,
      ]);
      setValue("");
      id.current++;
    }
  };

  const handleToogleIsDone = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  };

  const handleUpdateTodo = (id, content) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          content,
        };
      })
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDeleteAll = () => {
    setTodos([]);
    writeTodosToLocalStorage();
  };

  const handleAllButtonClick = () => {
    setIsDoneFilter("");
  };

  const handleActiveButtonClick = () => {
    setIsDoneFilter(true);
  };

  const handleCompleteButtonClick = () => {
    setIsDoneFilter(false);
  };

  return (
    <Main>
      <TodoTitle>Todo List</TodoTitle>
      <TodoInputForm>
        <TodoInput
          type="text"
          placeholder="Add todo..."
          value={value}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        ></TodoInput>
      </TodoInputForm>
      {
        // eslint-disable-next-line
        todos.map((todo) => {
          if (todo.isDone !== isDoneFilter) {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                handleDeleteTodo={handleDeleteTodo}
                handleToogleIsDone={handleToogleIsDone}
                handleUpdateTodo={handleUpdateTodo}
              />
            );
          }
        })
      }
      <BottomWrapper>
        <StateButtonWrapper>
          <StateButton
            onClick={handleAllButtonClick}
            $active={isDoneFilter === ""}
          >
            All
          </StateButton>
          <StateButton
            onClick={handleActiveButtonClick}
            $active={isDoneFilter === true}
          >
            Active
          </StateButton>
          <StateButton
            onClick={handleCompleteButtonClick}
            $active={isDoneFilter === false}
          >
            Complete
          </StateButton>
        </StateButtonWrapper>
        <DeleteAllButton onClick={handleDeleteAll}> Clear All</DeleteAllButton>
      </BottomWrapper>
      <RemarkWord>Double click to edit.</RemarkWord>
    </Main>
  );
}

export default App;
