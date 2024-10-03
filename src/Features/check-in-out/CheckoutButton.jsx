import Button from "../../Ui/Button";
import useCheckout from "./useCheckout";
import SpinnerMini from "../../Ui/SpinnerMini";

function CheckoutButton({ bookingId }) {
  const {checkout,isCheckingOut} = useCheckout();
  return (
    <Button variation="secondary" size="small" onClick={()=>checkout(bookingId)} disabled={isCheckingOut}>
      {isCheckingOut ? <SpinnerMini /> : "Check Out"}
    </Button>
  );
}

export default CheckoutButton;
