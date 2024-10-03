import styled from "styled-components";
const StyledDashBoardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
export default function DashBoardLayout({ children }) {
  return (
    <StyledDashBoardLayout>
      {children}
    </StyledDashBoardLayout>
  );
}
