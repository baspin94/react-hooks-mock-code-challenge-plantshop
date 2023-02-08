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
    const updatedPlants = plants.filter(plant => {
      return plant.id !== deletedId
    })
    setPlants(updatedPlants);
  }

  return (
    <main>
      <NewPlantForm onPlantSubmit={handlePlantSubmit}/>
      <Search onSearch={setSearch}/>
      <PlantList plants={filteredPlants} onPlantDelete={handlePlantDelete}/>
    </main>
  );
}

export default PlantPage;
