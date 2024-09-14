import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";
import useDarkMode from "../Features/Context/useDarkMode";
export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}
