import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants}) {
  
  const plantListings = plants.map(plant => {
    return <PlantCard key={plant.id} id={plant.id} name={plant.name} image={plant.image} price={plant.price} />
  })
  
  return (
    <ul className="cards">{plantListings}</ul>
  );
}

export default PlantList;
