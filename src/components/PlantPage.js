import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then(response => response.json())
      .then(plantData => setPlants(plantData))
  }, [])
  console.log(plants);

  const filteredPlants = plants.filter(plant => 
    plant.name.toLowerCase().includes(search))

  function handlePlantSubmit(plantObject) {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(plantObject)
    })
      .then(response => response.json())
      .then(newPlant => setPlants([...plants, newPlant]))
  }

  function handlePlantDelete(deletedId){
    fetch(`http://localhost:6001/plants/${deletedId}`, {
      method: "DELETE"
    })
    const updatedPlants = plants.filter(plant => {
      return plant.id !== deletedId
    })
    setPlants(updatedPlants);
  }

  function modifyPlantList(updatedPlantObject){
    const updatedPlants = plants.map(plant => {
      if (plant.id === updatedPlantObject.id) {
        return updatedPlantObject;
      } else {
        return plant;
      }
    })
    setPlants(updatedPlants);
  } 

  function handlePriceEdit(updatedId, newPrice){
    const updatedPrice = parseFloat(newPrice);
    fetch(`http://localhost:6001/plants/${updatedId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({price: updatedPrice})
      })
        .then(response => response.json())
        .then(updatedPlant => modifyPlantList(updatedPlant))
    }

  return (
    <main>
      <NewPlantForm onPlantSubmit={handlePlantSubmit}/>
      <Search onSearch={setSearch}/>
      <PlantList plants={filteredPlants} onPlantDelete={handlePlantDelete} onPriceEdit={handlePriceEdit}/>
    </main>
  );
}

export default PlantPage;
