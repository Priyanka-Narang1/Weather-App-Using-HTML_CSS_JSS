const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weatherImg = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const locationNotFound = document.querySelector(".location-not-found");
const weatherBody = document.querySelector(".weather-body");

async function checkWeather(city) {
    const apiKey = "3d0d2fddfe9ccf62005ce04e201b02ea";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&units=metric&appid=${apiKey}`;


    try {
        const response = await fetch(url);
        const data = await response.json();

        // City not found
        if (data.cod !== 200) {
            locationNotFound.style.display = "flex";
            weatherBody.style.display = "none";
            return;
        }

        // Show weather
        locationNotFound.style.display = "none";
        weatherBody.style.display = "flex";

        temperature.innerHTML = `${Math.round(data.main.temp)}<sup>°C</sup>`;
        description.innerHTML = data.weather[0].description;
        humidity.innerHTML = `${data.main.humidity}%`;
        windSpeed.innerHTML = `${data.wind.speed} Km/H`;

        // Weather images (FROM assets folder)
        switch (data.weather[0].main) {
            case "Clouds":
                weatherImg.src = "assets/cloud.png";
                break;
            case "Clear":
                weatherImg.src = "assets/clear.png";
                break;
            case "Rain":
                weatherImg.src = "assets/rain.png";
                break;
            case "Mist":
                weatherImg.src = "assets/mist.png";
                break;
            case "Snow":
                weatherImg.src = "assets/snow.png";
                break;
            default:
                weatherImg.src = "assets/clear.png";
        }

    } catch (error) {
        console.error(error);
    }
}

// Button click
searchBtn.addEventListener("click", () => {
    const city = inputBox.value.trim();
    if (city !== "") {
        checkWeather(city);
    }
});

// Enter key support
inputBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const city = inputBox.value.trim();
        if (city !== "") {
            checkWeather(city);
        }
    }
});
