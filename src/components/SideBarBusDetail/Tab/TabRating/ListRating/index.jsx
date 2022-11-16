import Item from "./Item";

const ListRating = ({ ratings }) => {
  return (
    <div>
      {ratings
        .sort((a, b) => Number(b.time) - Number(a.time))
        .map((item, index) => (
          <Item key={index} data={item} />
        ))}
    </div>
  );
};

export default ListRating;
