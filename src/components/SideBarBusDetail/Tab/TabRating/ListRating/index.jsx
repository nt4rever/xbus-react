import { message } from "antd";
import { deleteRating } from "../../../../../apis/rating/deleteRating";
import Item from "./Item";

const ListRating = ({ ratings, userId }) => {
  const handleDeleteRating = async (id) => {
    try {
      await deleteRating(id);
      message.success("Delete rating success!");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {ratings.map((item, index) => (
        <Item
          key={index}
          data={item}
          isOwn={item.userId === userId ? true : false}
          handleDeleteRating={handleDeleteRating}
        />
      ))}
    </div>
  );
};

export default ListRating;
