const generate = document.querySelector('#gen');

generate.addEventListener('click', function() {
  const promptInput = document.querySelector('.form-control');
  const quoteDisplay = document.querySelector('#quoteDisplay');

  // Get the user's prompt from the input field
  const prompt = promptInput.value;

  // Generate a quote based on the prompt
  generateQuote(prompt)
    .then((quote) => {
      // Display the generated quote
      quoteDisplay.textContent = quote;
    })
    .catch((error) => {
      // Display an error message if there was an issue fetching quotes
      quoteDisplay.textContent = "Sorry, an error occurred while fetching quotes.";
      console.error(error);
    });
});

// Function to generate quotes based on the user's prompt
async function generateQuote(prompt) {
  const apiUrl = 'https://api.api-ninjas.com/v1/quotes?category=' + prompt;
  const apiKey = 'mVOmsJfYewqhhBCPMuKG9w==0IiaAxBENyL8dkRj'; // Replace with your actual API key

  try {
    // Make an HTTP GET request to the Quotes API
    const response = await fetch(apiUrl, {
      headers: {
        'X-Api-Key': apiKey
      }
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Check if the response contains quotes
    if (!data || data.length === 0) {
      throw new Error(`No quotes available for the prompt "${prompt}"`);
    }

    // Select a random quote from the response
    const quotes = data;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex].quote; // Access the quote property of the selected quote
  } catch (error) {
    throw new Error(`Failed to fetch quotes: ${error.message}`);
  }
}
