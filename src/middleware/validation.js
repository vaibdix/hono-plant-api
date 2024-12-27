export function validatePlant(plant) {
  const errors = [];
  
  if (!plant.name || typeof plant.name !== 'string') {
    errors.push('Name is required and must be a string');
  }
  
  if (!plant.species || typeof plant.species !== 'string') {
    errors.push('Species is required and must be a string');
  }
  
  if (plant.wateringFrequency && typeof plant.wateringFrequency !== 'string') {
    errors.push('Watering frequency must be a string');
  }
  
  return errors;
}