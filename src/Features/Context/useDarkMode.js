import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("userDarkMode must be used withing DarkModeProvider");
  }
  return context;
}
export default useDarkMode;
