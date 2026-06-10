let useFahrenheit = false; // default is Celsius
let currentWeatherData = null;
let forecastData = null;

// Convert functions
function toF(c) {
    return (c * 9/5) + 32;
}

function formatTemp(c) {
    return useFahrenheit ? `${toF(c).toFixed(1)}°F` : `${c.toFixed(1)}°C`;
}
function getCoordinates(city) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`;
    return fetch(url)
        .then(res => res.json())
        .then(data => {
            if (!data.results || data.results.length === 0) {
                throw new Error("City not found");
            }
            const place = data.results[0];
            return {
                name: place.name,
                lat: place.latitude,
                lon: place.longitude
            };
        })
        .catch(err => {
            console.error("Error fetching coordinates:", err);
            throw err;
        });
            }

// Render Current Weather
function renderCurrentWeather() {
    if (!currentWeatherData) return;

    const w = currentWeatherData.current_weather;

    document.getElementById("data-container").innerHTML = `
        <h3>Current Weather</h3>
        <p>Temperature: ${formatTemp(w.temperature)}</p>
        <p>Wind Speed: ${w.windspeed} km/h</p>
        <p>Weather Code: ${w.weathercode}</p>
    `;
}

// Render Forecast
function renderForecast() {
    if (!forecastData) return;

    const days = forecastData.daily.time;
    const highs = forecastData.daily.temperature_2m_max;
    const lows = forecastData.daily.temperature_2m_min;

    let html = "<h3>7-Day Forecast</h3><ul>";

    for (let i = 0; i < days.length; i++) {
        html += `
            <li>
                ${days[i]} — 
                High: ${formatTemp(highs[i])}, 
                Low: ${formatTemp(lows[i])}
            </li>
        `;
    }

    html += "</ul>";

    document.getElementById("data-container-2").innerHTML = html;
}

function loadWeather(lat, lon) {
    // Current weather
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`)
        .then(res => res.json())
        .then(data => {
            currentWeatherData = data;
            renderCurrentWeather();
        })
        .catch(err => {
            document.getElementById("data-container").innerHTML =
                "<p style='color:red;'>Failed to load current weather.</p>";
        });

    // Forecast
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`)
        .then(res => res.json())
        .then(data => {
            forecastData = data;
            renderForecast();
        })
        .catch(err => {
            document.getElementById("data-container-2").innerHTML =
                "<p style='color:red;'>Failed to load forecast.</p>";
        });
}


// Toggle Button
document.getElementById("temp-toggle").addEventListener("click", () => {
    useFahrenheit = !useFahrenheit;

    document.getElementById("temp-toggle").textContent =
        useFahrenheit ? "Switch to °C" : "Switch to °F";

    renderCurrentWeather();
    renderForecast();
});

// Search Button
document.getElementById("search-btn").addEventListener("click", () => {
    const city = document.getElementById("city-input").value;
    if (!city) return;

    getCoordinates(city)
        .then(({ lat, lon }) => {
            loadWeather(lat, lon);
        })
        .catch(err => {
            document.getElementById("data-container").innerHTML =
                "<p style='color:red;'>City not found.</p>";
            document.getElementById("data-container-2").innerHTML =
                "<p style='color:red;'>City not found.</p>";
        });
});
