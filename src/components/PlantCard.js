import React, {useState} from "react";

function PlantCard({id, name, image, price, onPlantDelete, onPriceEdit}) {

  const [inStock, setInStock] = useState(true)
  const [updatedPrice, setUpdatedPrice] = useState(price)

  function handleClick() {
    setInStock(inStock => !inStock)
  }

  function handleDelete() {
    onPlantDelete(id);
  }

  function handleChange(event) {
    const newPrice = event.target.value
    setUpdatedPrice(newPrice);
  }

  function handlePriceSubmit(event) {
    event.preventDefault();
    onPriceEdit(id, updatedPrice);
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
      <button>Edit Price 💵</button>
      <form onSubmit={handlePriceSubmit}>
        <label>
          <input type="number" name="price" step="0.01" placeholder="Price" value={updatedPrice} onChange={handleChange}/>
        </label>
        <button type="submit">Update ✅</button>
      </form>
    </li>
  );
}

export default PlantCard;
