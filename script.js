const apiKey = "a4a143eea7cc42429eb91042252408"; // Replace with your free API key

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    displayWeather(data);
    displayForecast(data.forecast.forecastday);

  } catch (error) {
    alert("Couldn't fetch weather data. Please try again!");
    console.error(error);
  }
}

function displayWeather(data) {
  const cityName = document.getElementById("cityName");
  const temperature = document.getElementById("temperature");
  const condition = document.getElementById("condition");
  const outfit = document.getElementById("outfit");
  const weatherIcon = document.getElementById("weatherIcon");

  cityName.textContent = data.location.name;
  temperature.textContent = `Temperature: ${data.current.temp_c}°C`;
  condition.textContent = `Condition: ${data.current.condition.text}`;
  weatherIcon.src = data.current.condition.icon;
  weatherIcon.classList.remove("hidden");

  outfit.textContent = suggestOutfit(data.current.temp_c, data.current.condition.text);
  document.getElementById("weatherResult").classList.remove("hidden");
}

function displayForecast(forecast) {
  const forecastContainer = document.getElementById("forecast");
  forecastContainer.innerHTML = "";
  document.getElementById("forecastTitle").classList.remove("hidden");

  forecast.forEach(day => {
    const div = document.createElement("div");
    div.classList.add("forecast-day");

    div.innerHTML = `
      <h4>${day.date}</h4>
      <img src="${day.day.condition.icon}" alt="icon">
      <p>${day.day.avgtemp_c}°C</p>
      <p>${day.day.condition.text}</p>
    `;
    forecastContainer.appendChild(div);
  });
}

function suggestOutfit(temp, condition) {
  if (temp >= 30) return "It's hot! Wear light cotton clothes.";
  if (temp >= 20) return "Pleasant weather! A T-shirt and jeans are fine.";
  if (temp >= 10) return "It's cool, wear a jacket.";
  return "It's cold! Wear warm clothes.";
}
