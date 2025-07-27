const contentBox = document.querySelector(".content-box");
const errorBox = document.querySelector(".error-box");
const searchBtn = document.querySelector("#search-btn");
const inputText = document.querySelector("#input-text");
const humidityVal = document.querySelector("#Humidity-val");
const windSpeedVal = document.querySelector("#windSpeed-val");
const temperature = document.querySelector(".temperature");
const weather = document.querySelector(".Weather");
const weatherImage = document.querySelector("#Weather-Image");

function setWeatherImage(weatherVal){
    if(weatherVal === "Clear"){
        weatherImage.src = "/assets/Clear.png";
    }
    else if(weatherVal === "Clouds"){
        weatherImage.src = "/assets/Cloud.png";
    }
    else if(weatherVal === "Mist"){
        weatherImage.src = "/assets/Mist.png";
    }
    else if(weatherVal === "Rain"){
        weatherImage.src = "/assets/Rain.png";
    }
    else if(weatherVal === "Snow"){
        weatherImage.src = "/assets/Snow.png";
    }
    weather.textContent = weatherVal;
}

function setWeather(city){
    const api_key = "860bbfd24bc57fcba394fde34a723b2f";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    fetch(url)
    .then((res)=> {
        if(!res.ok){
            throw new Error("HTTP error");
        }
        return res.json();
    })
    .then((data)=>{
        temperature.innerHTML = `${Math.round(data.main.temp-273)}<sup>.</sup>C`;
        windSpeedVal.textContent = `${data.wind.speed}Km/h`;
        humidityVal.textContent = `${data.main.humidity}%`
        errorBox.classList.add("hide");
        contentBox.classList.remove("hide");
        setWeatherImage(data.weather[0].main);
    })
    .catch((err)=> {
        contentBox.classList.add("hide");
        errorBox.classList.remove("hide");
    });

}
searchBtn.addEventListener("click",()=>{
    const city = inputText.value;
    setWeather(city);
});