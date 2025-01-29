export function validatePlant(plant) {
  // const errors = [];

  // if (!plant.name || typeof plant.name !== 'string') {
  //   errors.push('Name is required and must be a string');
  // }

  // if (!plant.species || typeof plant.species !== 'string') {
  //   errors.push('Species is required and must be a string');
  // }

  // if (plant.wateringFrequency && typeof plant.wateringFrequency !== 'string') {
  //   errors.push('Watering frequency must be a string');
  // }

  // return errors;
}

export function validateUser(user) {
  const errors = [];

  if (!user.email || typeof user.email !== 'string') {
    errors.push('Email is required and must be a string');
  } else if (!isValidEmail(user.email)) {
    errors.push('Invalid email format');
  }

  if (!user.password || typeof user.password !== 'string') {
    errors.push('Password is required and must be a string');
  } else if (user.password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  return errors;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}