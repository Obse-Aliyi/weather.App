
function formatDate(timestamp){
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 0){
    hours = `0${hours}`;
}
let minutes = date.getMinutes();
if(minutes < 0){
    minutes = `0${minutes}`;
}
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`
}

function displayTemperature(response){
    console.log(response.data.main.temp);
    document.querySelector("#temperature").innerHTML =Math.round (celsiusTmeperature);
    document.querySelector("#city").innerHTML = response.data.name
    document.querySelector("#description").innerHTML = response.data.weather[0].description;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML =Math.round (response.data.wind.speed);
    document.querySelector("#date").innerHTML = formatDate(response.data.dt*1000);
    let iconElement =  document.querySelector("#icon");
    celsiusTmeperature = response.data.main.temp;

    iconElement.setAttribute("src", 
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

    iconElement.setAttribute(
        "alt", response.data.weather[0].description
    );

}


function search(city){ 
let apiKey ="1ed27858cc58c0b5dc29f2d3e7adefb1";
let urlKey = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(urlKey).then(displayTemperature); 
}


function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);

}

let form = document.querySelector("#search-form");
form.addEventListener("submit",handleSubmit);
search("Edmonton");
function showFahrenheitTemperature(event){
    event.preventDefault();
    let fahrenheitTemperature = ( celsiusTmeperature *9)/5+32;
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    temperatureElement.innerHTML =Math.round(fahrenheitTemperature);
}
function showcelsiusTemperature(event){
   event.preventDefault();
  let temperatureElement = document.querySelector("#temperature"); 
   temperatureElement.innerHTML =Math.round( celsiusTmeperature);
     celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
}

let celsiusTmeperature = null;


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showcelsiusTemperature);
