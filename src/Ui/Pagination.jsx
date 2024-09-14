import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGE_SIZE } from "../Utils/config";
const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
// In this below compoenent, the count is nothing but the total number of bookings coming directly from the server which is in the booking table component
export default function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedPage = Number(searchParams.get("page")) || 1;
  const pageCount = Math.ceil(count / PAGE_SIZE);
  function handlePrevious() {
    const previuosPage = selectedPage === 1 ? selectedPage : selectedPage - 1;
    searchParams.set("page", previuosPage);
    setSearchParams(searchParams);
  }
  function handleNext() {
    const nextPage =
      selectedPage === pageCount ? selectedPage : selectedPage + 1;
    searchParams.set("page", nextPage);
    setSearchParams(searchParams);
  }
  if (count < PAGE_SIZE) return null;
  return (
    <StyledPagination>
      <P>
        Showing <span>{(selectedPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>
          {pageCount === selectedPage ? count : selectedPage * PAGE_SIZE}
        </span>{" "}
        out of <span>{count}</span> results
      </P>
      <Buttons>
        <PaginationButton
          disabled={selectedPage === 1}
          onClick={handlePrevious}
        >
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>
        <PaginationButton
          disabled={selectedPage === pageCount}
          onClick={handleNext}
        >
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}
