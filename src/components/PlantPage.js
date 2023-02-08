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

  return (
    <main>
      <NewPlantForm />
      <Search onSearch={setSearch}/>
      <PlantList plants={filteredPlants}/>
    </main>
  );
}

export default PlantPage;
