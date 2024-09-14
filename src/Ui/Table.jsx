import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  /* overflow-x: scroll; */
  transition: height 0.5s;
  width: 100%;
`;
const CommonRow = styled.div`
  display: grid;
  ${(props) => props.columns && `grid-template-columns: ${props.columns};`}
  column-gap:2.4rem;
  align-items: center;
  transition: none;
`;
const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-100);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;
const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

// We need to test what changes are made if we use StyledBody
const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;
const StyledBody = styled.section`
  margin: 0.4rem 0;
`;
const Footer = styled.footer`
  background-color: var(--color-grey-100);
  display: flex;
  justify-content: center;
  padding: 1.2rem;
  &:not(:has(*)) {
    display: none;
  }
`;
// Creating the table context here
const tableContext = createContext();

function Header({ children }) {
  const { columns } = useContext(tableContext);
  return (
    <StyledHeader columns={columns} as="header">
      {children}
    </StyledHeader>
  );
}
function Row({ children, columns }) {
  return <StyledRow columns={columns}>{children}</StyledRow>;
}
function Body({ render, data }) {
  if (data?.length === 0) return <Empty>No Data Is Available</Empty>;
  return (
    <StyledBody>{data?.map((item, index) => render(item, index))}</StyledBody>
  );
}
function Table({ columns, children }) {
  return (
    <tableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </tableContext.Provider>
  );
}
Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;
export default Table;
