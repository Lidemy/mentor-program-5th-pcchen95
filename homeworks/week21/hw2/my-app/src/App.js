import styled from "styled-components";
import { useState, useEffect, useRef, useContext, createContext } from "react";
import PropTypes from "prop-types";

const valueContext = createContext();
const isNextContext = createContext();
const winnerContext = createContext();
const stepContext = createContext();
const size = 19;
const squareWidth = 30;

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  margin: 0;
  padding: 30px;
`;

const Player = styled.div`
  text-align: center;
  font-size: 36px;
  color: #6f3c0f;
  margin-bottom: 14px;
`;

const Main = styled.div`
  width: 900px;
  height: ${(size - 1) * squareWidth + (size - 2) + 60}px;
  display: flex;
  justify-content: center:
  align-items: flex-start;
  margin: 0 auto;
`;

const RecordListWrapper = styled.div`
  width: 100px;
  height: 100%;
  border: 1px solid black;
  margin-right: 30px;

  ${(props) =>
    props.isNext &&
    `
      border: 3px solid yellow;
    `}
`;

const RecordList = styled.div`
  width: 100px;
  height: calc(100% - 55px);
  background: #e8e8e8;
  overflow-y: scroll;
`;

const RecordListHead = styled.div`
  width: 100%;
  height: 30px;
  padding: 12px 0;
  font-size: 16px;
  text-align: center;
  border-bottom: 1px solid black;

  ${(props) =>
    props.player === "black"
      ? `
      background: black;
      color: white;
    `
      : `
      background: white;
      color: black;
    `}
`;

const EachRecord = styled.div`
  width: 100%;
  border-bottom: 1px dotted grey;
  background: #fbf6e1;
  padding: 8px 16px;
  cursor: pointer;
`;

const BoardOuter = styled.div`
  width: ${(size - 1) * squareWidth + (size - 2)}px;
  height: ${(size - 1) * squareWidth + (size - 2)}px;
  background: #ab825e;
  border: 1.5px solid black;
  padding: 30px;
`;

const BoardWrapper = styled.div`
  width: ${(size - 1) * squareWidth + (size - 2)}px;
  height: ${(size - 1) * squareWidth + (size - 2)}px;
  box-sizing: border-box;
  position: relative;
`;

const FakeSqaure = styled.div`
  position: relative;
  width: ${squareWidth}px;
  height: ${squareWidth}px;
  border: 1px solid black;
  background: #transparent;
  margin-left: -1px;
`;

const Square = styled.div`
  position: absolute;
  width: ${squareWidth * 0.8}px;
  height: ${squareWidth * 0.8}px;
  border-radius: 50%;
  z-index: 1;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  background: transparent;

  ${(props) =>
    props.isLastColumn
      ? props.isLastRow
        ? `
        bottom: 0;
        right: 0;
        transform: translate(50%, 50%);
      `
        : `
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
    `
      : props.isLastRow
      ? `
        bottom: 0;
        left: 0;
        transform: translate(-50%, 50%);
      `
      : `
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
    `}
`;

const BoardColumn = styled.div`
  display: flex;
  margin-top: -1px;
`;

const NumberRowForEach = styled.div`
  position: absolute;
  width: 16px;
  height: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  left: -30px;
  font-size: 14px;
  transform-origin: center left;

  ${(props) =>
    props.isLast
      ? `
      transform: translate(0, 50%);
    `
      : `
      transform: translate(0, -50%);
    `}
`;

const NumberColumnForEach = styled.div`
  position: absolute;
  width: 30px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  top: -30px;
  font-size: 14px;

  ${(props) =>
    props.isLast
      ? `
      transform: translate(50%, 0);
    `
      : `
      transform: translate(-50%, 0);
    `}
`;

const BlackPiece = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: black;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
`;

const WhitePiece = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: white;
  box-shadow: 1.8px 2.4px 3px 0 rgba(0, 0, 0, 0.3);
`;

const Result = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 42px;
  color: #d6ca72;
  z-index: 2;
`;

const PlayAgainBtn = styled.div`
  width: 100px;
  height: 50px;
  background: #b5adad;
  border: 1px solid black;
  border-radius: 8px;
  font-size: 18px;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const directionSet = [
  [
    [1, 0],
    [-1, 0],
  ],
  [
    [1, 1],
    [-1, -1],
  ],
  [
    [0, 1],
    [0, -1],
  ],
  [
    [-1, 1],
    [1, -1],
  ],
];

function NumberRow({ row, isLast }) {
  return (
    <NumberRowForEach isLast={isLast}>
      <div>{row + 1}</div>
    </NumberRowForEach>
  );
}

NumberColumn.propTypes = {
  n: PropTypes.number,
  isLast: PropTypes.bool,
};

function NumberColumn({ n, isLast }) {
  return (
    <NumberColumnForEach isLast={isLast}>
      <div>{String.fromCharCode(n + 65)}</div>
    </NumberColumnForEach>
  );
}

NumberColumn.propTypes = {
  n: PropTypes.number,
  isLast: PropTypes.bool,
};

function PrintSquare({ row, i, isLastColumn, isLastRow }) {
  const [value, setValue] = useContext(valueContext);
  const [isNext, setIsNext] = useContext(isNextContext);
  const winner = useContext(winnerContext);
  const steps = useContext(stepContext);

  function isWinInSingleDirection(squares, [originY, originX], direction) {
    let count = 1;
    for (let i = 0; i < 2; i++) {
      let isEnd = false;
      let y = originY;
      let x = originX;
      // 往同一個方向找到底，直到找不到連續的再換另一個方向
      while (isEnd === false) {
        const newY = y + direction[i][0];
        const newX = x + direction[i][1];
        if (newX < 0 || newX >= size || newY < 0 || newY >= size) {
          break;
        }

        if (squares[newY][newX] === squares[y][x]) {
          count++;
          y = newY;
          x = newX;
          continue;
        }
        isEnd = true;
      }
    }
    if (count >= 5) return true;
    return false;
  }

  function calculateWinner(squares, [y, x]) {
    // 判斷四組方向中是否有任一方向符合獲勝條件
    for (let i = 0; i < directionSet.length; i++) {
      const isWin = isWinInSingleDirection(squares, [y, x], directionSet[i]);
      if (!isWin) {
        continue;
      }
      return squares[y][x];
    }
    return "";
  }

  const handleClickSquare = ([y, x]) => {
    if (value.squares[y][x] !== null) return; // 不能選已經被下過的格子

    let squares = value.squares.slice();
    squares[y][x] = isNext ? "White" : "Black";
    winner.current = calculateWinner(squares, [y, x]);
    setValue({ squares });

    if (isNext) {
      steps.current[steps.current.length - 1].white = [y, x];
    } else {
      steps.current.push({ black: [y, x], white: "" });
    }
    setIsNext(!isNext);
  };

  return (
    <Square
      onClick={() => handleClickSquare([row, i])}
      isLastColumn={isLastColumn}
      isLastRow={isLastRow}
    >
      {value.squares[row][i] === "Black" && <BlackPiece />}
      {value.squares[row][i] === "White" && <WhitePiece />}
    </Square>
  );
}

PrintSquare.propTypes = {
  row: PropTypes.number,
  i: PropTypes.number,
  isLastColumn: PropTypes.bool,
  isLastRow: PropTypes.bool,
};

function BoardRow({ row }) {
  let rows = [];
  for (let i = 0; i < size - 1; i++) {
    rows[i] = (
      <FakeSqaure key={Math.random()}>
        {row === 0 && (
          <div>
            <NumberColumn n={i} isLast={false} />
            {i === size - 2 && <NumberColumn n={i + 1} isLast={true} />}
          </div>
        )}
        <PrintSquare
          key={Math.random()}
          row={row}
          i={i}
          isLastColumn={false}
          isLastRow={false}
        />
        {i === size - 2 && (
          <PrintSquare
            key={Math.random()}
            row={row}
            i={i + 1}
            isLastColumn={true}
            isLastRow={false}
          />
        )}
        {row === size - 2 && (
          <div>
            <PrintSquare
              key={Math.random()}
              row={row + 1}
              i={i}
              isLastColumn={false}
              isLastRow={true}
            />
            {i === size - 2 && (
              <PrintSquare
                key={Math.random()}
                row={row + 1}
                i={i + 1}
                isLastColumn={true}
                isLastRow={true}
              />
            )}
          </div>
        )}
      </FakeSqaure>
    );
  }

  return (
    <BoardColumn>
      <NumberRow row={row} isLast={false} />
      {row === size - 2 && <NumberRow row={row + 1} isLast={true} />}
      {rows}
    </BoardColumn>
  );
}

BoardRow.propTypes = {
  row: PropTypes.number,
};

function Board() {
  let rows = [];
  for (let i = 0; i < size - 1; i++) {
    rows[i] = <BoardRow key={Math.random()} row={i} />;
  }
  return rows;
}

function Record({ player }) {
  const [value, setValue] = useContext(valueContext);
  const [isNext, setIsNext] = useContext(isNextContext);
  const steps = useContext(stepContext);
  let reverseSteps = JSON.stringify(steps);
  reverseSteps = JSON.parse(reverseSteps).current.reverse();

  function handleClickStepBtn(player, index) {
    let squares = value.squares.slice();
    let target;
    let startIndex = player === "black" ? index : index + 1;

    if (player === "white") {
      target = steps.current[index];
      squares[target.white[0]][target.white[1]] = null;
      steps.current[index].white = "";
    }

    for (let i = startIndex; i < steps.current.length; i++) {
      target = steps.current[i];
      squares[target.black[0]][target.black[1]] = null;
      if (target.white) {
        squares[target.white[0]][target.white[1]] = null;
      }
      setValue({ squares });
    }
    steps.current = steps.current.slice(0, startIndex);
    player === "black" ? setIsNext(false) : setIsNext(true);
  }

  return (
    <RecordList>
      {reverseSteps.map((step, index) => {
        const position = player === "black" ? step.black : step.white;
        if (!position) return "";
        const coordinateX = String.fromCharCode(position[1] + 65);
        const coordinateY = position[0] + 1;
        const n = reverseSteps.length - index - 1;
        return (
          <EachRecord
            key={Math.random()}
            onClick={() => handleClickStepBtn(player, n)}
          >
            <span>{reverseSteps.length - index}</span>.{" "}
            {coordinateX + coordinateY}
          </EachRecord>
        );
      })}
    </RecordList>
  );
}

Record.propTypes = {
  player: PropTypes.string,
};

function App() {
  const winner = useRef("");
  const steps = useRef([]);
  const [isNext, setIsNext] = useState(false);
  const [result, setResult] = useState({ over: false, winner: "" });
  const [value, setValue] = useState(() => {
    let arr1 = [];
    for (let i = 0; i < size; i++) {
      let arr2 = [];
      for (let j = 0; j < size; j++) {
        arr2.push(null);
      }
      arr1.push(arr2);
    }
    return { squares: arr1 };
  });

  useEffect(() => {
    if (winner.current !== "") {
      setResult({ over: true, winner: winner.current });
    }
  }, [value]);

  function handleClickPlayAgain() {
    setIsNext(false);
    setValue(() => {
      let arr1 = [];
      for (let i = 0; i < size; i++) {
        let arr2 = [];
        for (let j = 0; j < size; j++) {
          arr2.push(null);
        }
        arr1.push(arr2);
      }
      return { squares: arr1 };
    });
    winner.current = "";
    steps.current = [];
    setResult({ over: false, winner: "" });
  }

  return (
    <isNextContext.Provider value={[isNext, setIsNext]}>
      <valueContext.Provider value={[value, setValue]}>
        <winnerContext.Provider value={winner}>
          <stepContext.Provider value={steps}>
            {result.over && (
              <Result>
                <h1>{result.winner} Wins! </h1>
                <PlayAgainBtn onClick={handleClickPlayAgain}>
                  Play Again
                </PlayAgainBtn>
              </Result>
            )}
            <Wrapper>
              <Player>Next Player: {isNext ? "White" : "Black"}</Player>
              <Main>
                <RecordListWrapper>
                  <RecordListHead player={"black"}>Black</RecordListHead>
                  <Record player={"black"} />
                </RecordListWrapper>
                <RecordListWrapper>
                  <RecordListHead player={"white"}>White</RecordListHead>
                  <Record player={"white"} />
                </RecordListWrapper>
                <BoardOuter>
                  <BoardWrapper>
                    <Board />
                  </BoardWrapper>
                </BoardOuter>
              </Main>
            </Wrapper>
          </stepContext.Provider>
        </winnerContext.Provider>
      </valueContext.Provider>
    </isNextContext.Provider>
  );
}

export default App;
