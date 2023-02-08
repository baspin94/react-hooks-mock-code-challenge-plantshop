import React, {useState} from "react";

function PlantCard({id, name, image, price, onPlantDelete}) {

  const [inStock, setInStock] = useState(true)

  function handleClick() {
    setInStock(inStock => !inStock)
  }

  function handleDelete() {
    onPlantDelete(id);
  }

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {inStock ? (
        <button className="primary" onClick={handleClick}>In Stock</button>
      ) : (
        <button onClick={handleClick}>Out of Stock</button>
      )}
      <button onClick={handleDelete}>Delete 🗑️</button>
    </li>
  );
}

export default PlantCard;
