import Item from "./Item";

const ListRating = ({ ratings }) => {
  return (
    <div>
      {ratings.map((item, index) => (
        <Item key={index} data={item} />
      ))}
    </div>
  );
};

export default ListRating;
