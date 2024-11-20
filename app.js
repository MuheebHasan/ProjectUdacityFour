// API endpoint and keys
const apiKey = '<your_api_key>&units=imperial';
const generateButton = document.getElementById('generate');

// Event listener for the Generate button
generateButton.addEventListener('click', async () => {
  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  // Get weather data from OpenWeatherMap API
  const weatherData = await getWeatherData(zipCode);

  // Get current date
  const date = new Date().toLocaleDateString();

  // Prepare data to send to server
  const postData = {
    temp: weatherData.main.temp,
    feel: feelings,
    date: date,
  };

  // POST data to the server
  await postDataToServer(postData);

  // Retrieve and update data in the UI
  retrieveData();
});

// Function to fetch weather data from OpenWeatherMap API
const getWeatherData = async (zip) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`);
  const data = await response.json();
  return data;
};

// Function to POST data to the server
const postDataToServer = async (data) => {
  const response = await fetch('/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  console.log(responseData.message);  // Confirmation message
};

// Function to retrieve data from the server and update the DOM
const retrieveData = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    console.log(allData);

    // Dynamically update the DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp) + ' degrees';
    document.getElementById('content').innerHTML = allData.feel;
    document.getElementById('date').innerHTML = allData.date;
  } catch (error) {
    console.log("Error:", error);
  }
};
