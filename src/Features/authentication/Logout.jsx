import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../Ui/ButtonIcon";
import useLogout from "./useLogout";
import SpinnerMini from "../../Ui/SpinnerMini";
export default function Logout() {
  const { logout, isLoggingout } = useLogout();
  return (
    <ButtonIcon onClick={logout}>
      {!isLoggingout ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}
