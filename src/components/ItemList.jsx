import Item from "./Item";

export default function ItemList({ foodDetails, isLoading }) {
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        foodDetails.extendedIngredients.map((item) => (
          <Item key={Item.id} item={item} />
        ))
      )}
    </div>
  );
}
