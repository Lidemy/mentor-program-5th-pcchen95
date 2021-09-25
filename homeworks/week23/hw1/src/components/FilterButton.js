import { useDispatch } from 'react-redux';
import { setFilter, deleteAllTodo } from '../redux/actions';
import styled from "styled-components";

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

export default function FilterButton({filter}) {
  const dispatch = useDispatch()
  return (
    <BottomWrapper>
      <StateButtonWrapper>
        <StateButton
          $active={filter==='all'}
          onClick={() => {
            dispatch(setFilter('all'))
          }}
        >
          All
        </StateButton>
        <StateButton
          $active={filter==='active'}
          onClick={() => {
            dispatch(setFilter('active'))
          }}
        >
          Active
        </StateButton>
        <StateButton
          $active={filter==='completed'}
          onClick={() => {
            dispatch(setFilter('completed'))
          }}
        >
          Complete
        </StateButton>
      </StateButtonWrapper>
      <DeleteAllButton onClick={() => {
        dispatch(deleteAllTodo())
      }}> Clear All</DeleteAllButton>
    </BottomWrapper>
  );
}
