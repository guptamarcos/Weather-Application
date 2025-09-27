const contentBox = document.querySelector(".content-box");
const errorBox = document.querySelector(".error-box");
const searchBtn = document.querySelector("#search-btn");
const inputText = document.querySelector("#input-text");
const humidityVal = document.querySelector("#Humidity-val");
const windSpeedVal = document.querySelector("#windSpeed-val");
const temperature = document.querySelector(".temperature");
const weatherImage = document.querySelector("#Weather-Image");


const weather = {
    "Clear": "./assets/Clear.png",
    "Clouds": "./assets/Cloud.png",
    "Mist": "./assets/Mist.png",
    "Rain": "./assets/Rain.png",
    "Snow": "./assets/Snow.png",
}

function setWeather(city){
    const api_key = "860bbfd24bc57fcba394fde34a723b2f";;
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
        weatherImage.src = weather[data.weather[0].main];
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
