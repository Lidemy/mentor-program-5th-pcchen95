import styled from "styled-components";

const Loading = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content center;
`;

export default function LoadingPage() {
  return <Loading>Loading ... </Loading>;
}
