import { useContext } from "react";
import { BusDetailContext } from "../../../../../contexts/busDetailContext";
import Item from "./Item";

const ListRating = ({ ratings }) => {
  const { currentList } = useContext(BusDetailContext);
  return (
    <div>
      {ratings
        .sort((a, b) => Number(b.time) - Number(a.time))
        .slice(0, currentList)
        .map((item, index) => (
          <Item key={index} data={item} />
        ))}
    </div>
  );
};

export default ListRating;
