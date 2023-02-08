import React, {useState} from "react";

function NewPlantForm({onPlantSubmit}) {

  const initialFormObject = {
    name: "",
    image: "",
    price: "",
  }

  const [formData, setFormData] = useState(initialFormObject);

  function handleChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    const updatedFormObject = {
      ...formData,
      [key]: value
    }
    setFormData(updatedFormObject);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onPlantSubmit(formData);
    setFormData(initialFormObject);
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" value={formData.name} onChange={handleChange}/>
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange}/>
        <input type="number" name="price" step="0.01" placeholder="Price" value={formData.price} onChange={handleChange}/>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
