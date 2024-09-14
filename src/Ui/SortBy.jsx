import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortyBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  // Since it is a select field so it will react on changes the value
  function handleChange(e) {
    searchParams.set("sort", e.target.value);
    setSearchParams(searchParams);
  }
  return <Select options={options} type="white" onChange={handleChange} />;
}
