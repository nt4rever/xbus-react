import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { deleteRating } from "../../../../../apis/rating/deleteRating";
import Item from "./Item";

const ListRating = ({ ratings, userId }) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deleteRating, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-statis-rating"]);
      queryClient.invalidateQueries(["get-list-rating"]);
    },
  });
  const handleDeleteRating = async (id) => {
    await deleteMutation.mutateAsync(id, {
      onSuccess: () => message.success("Delete rating success!"),
      onError: (err) => {
        console.log(err);
      },
    });
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
