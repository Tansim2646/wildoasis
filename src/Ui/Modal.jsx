import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import useClickOutiside from "../Hooks/useClickOutside";
const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;
const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;
  &:hover {
    background-color: var(--color-grey-100);
  }
  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
    fill: var(--color-grey-500);
    stroke: var(--color-grey-500);
  }
`;
const modalContext = createContext();
function Modal({ children }) {
  const [openNamedModal, setOpenNamedModal] = useState("");
  const close = () => setOpenNamedModal("");
  const open = (name) => setOpenNamedModal(name);
  return (
    <modalContext.Provider value={{ open, openNamedModal, close }}>
      {children}
    </modalContext.Provider>
  );
}
function Window({ children, name }) {
  const { openNamedModal, close } = useContext(modalContext);
  const { ref } = useClickOutiside(close);
  if (openNamedModal !== name) return null;
  return createPortal(
    <StyledOverlay>
      <StyledModal ref={ref}>
        <StyledButton onClick={close}>
          <HiXMark />
        </StyledButton>
        <div>{cloneElement(children, { onClose: close })}</div>
      </StyledModal>
    </StyledOverlay>,
    document.body
  );
}
function Button({ children, opens: openWindowName }) {
  const { open } = useContext(modalContext);
  return cloneElement(children, { onClick: () => open(openWindowName) });
}

Modal.Button = Button;
Modal.Window = Window;
export default Modal;
