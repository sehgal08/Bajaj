const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Helper function to check if a string is a number
const isNumber = (str) => /^\d+$/.test(str);

// Helper function to check if a string is an alphabet (single or multiple characters)
const isAlphabet = (str) => /^[a-zA-Z]+$/.test(str);

// Helper function to check if a string is a special character
const isSpecialChar = (str) => /[^a-zA-Z0-9]/.test(str);

// Helper function to create alternating case string in reverse order
const createAlternatingCaseString = (alphabets) => {
  // Flatten and reverse all alphabetic characters
  const chars = alphabets.join('').split('').reverse();
  return chars
    .map((char, index) => 
      index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
    )
    .join('');
};

// POST endpoint for /bfhl
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    // Input validation
    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: 'Input must be an array'
      });
    }

    // Process the input array
    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;

    data.forEach(item => {
      if (typeof item !== 'string') {
        return; // Skip non-string items
      }

      if (isNumber(item)) {
        const num = parseInt(item);
        sum += num;
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
      } else if (isAlphabet(item)) {
        alphabets.push(item.toUpperCase());
      } else if (isSpecialChar(item)) {
        special_characters.push(item);
      }
    });

    // Create response
    const response = {
      is_success: true,
      user_id: 'john_doe_17091999',
      email: 'john@xyz.com',
      roll_number: 'ABCD123',
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string: createAlternatingCaseString(alphabets)
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      is_success: false,
      error: 'Internal server error'
    });
  }
});

// Start the server (not needed for Vercel, but useful for local development)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;