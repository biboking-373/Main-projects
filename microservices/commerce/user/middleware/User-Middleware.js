/*
    1. Validate registration
    2. Validate Login and jwt
*/

const validateRegister = (req, res, next) => {
  const { username, email, password } = req.body;

  // 1. Check if fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // 2. Check field lengths
  if (username.trim().length < 2) {
    return res.status(400).json({ message: 'Name must be at least 2 characters.' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters.' });
  }

  // 4. Validate email format (regex)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  next();
};


//2 Login
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters.' });
  }

  next();
};


module.exports = { validateRegister, validateLogin }