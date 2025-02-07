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

    // Username validation
    if (!user.username) {
        errors.push("Username is required");
    } else if (user.username.length < 3) {
        errors.push("Username must be at least 3 characters long");
    }

    // Email validation
    if (!user.email) {
        errors.push("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
        errors.push("Invalid email format");
    }

    // Password validation
    if (!user.password) {
        errors.push("Password is required");
    } else if (user.password.length < 6) {
        errors.push("Password must be at least 6 characters long");
    }

    // Role validation
    if (user.role && !['admin', 'user'].includes(user.role)) {
        errors.push("Role must be either 'admin' or 'user'");
    }

    // Contact number validation
    if (user.contactNumber && !/^\+?[\d\s-]{10,}$/.test(user.contactNumber)) {
        errors.push("Invalid contact number format");
    }

    return errors;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}