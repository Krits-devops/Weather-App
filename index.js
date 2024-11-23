const userTab = document.querySelector("[data-userWeather]");
const searchTab =  document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfo = document.querySelector(".user-info-container");


let oldTab = userTab;
const API_KEY = "3f6faa3c9bdde6b1b4c64dac4f7c9d8e";
oldTab.classList.add("current-tab");

function switchTab(newTab){
    if(newTab != oldTab){
        oldTab.classList.remove("current-tab");
        oldTab = clickedTab;
        oldTab.classList.add("current-tab");

         if(!searchForm.classList.contains("active")){
            userInfo.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.contains("active");
         }
         else{
            searchForm.classList.remove("active");
            userInfo.classList.remove("active");
            getfromSessionStorage();
         }
    }
}


userTab.addEventListener("click",()=>{
    switchTab(userTab);
});

searchTab.addEventListener("click",()=>{
    switchTab(searchTab);
})


function getfromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        grantAccessContainer.classList.add("active");
    }
    else{
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

 async function fetchUserWeatherInfo(coordinates) {
    const {lat , lon} = coordinates;
    grantAccessContainer.classList.remove("active");
    loadingScreen.classList.add("active");

    //API Call

    try{
    const response  = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}
        &appid=${API_KEY}&units=metric`);
    const data = await response.json();
    loadingScreen.classList.remove("active");
    userInfo.classList.add("active")
    renderWeatherInfo(data);
}
    catch(err) {

        loadingScreen.classList.remove("active");
        console.log("error");

    }
}

function renderWeatherInfo(weatherInfo){
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness  = document.querySelector("[data-cloudiness]");

    //fetch values from WeatherInfo Object and put it in UI Elements

    cityName.innerText = weatherInfo?.cityName;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = weatherInfo?.main?.temp;
    windspeed.innerText = weatherInfo?.wind?.speed;
    humidity.innerText = weatherInfo?.main?.humidity;
    cloudiness.innerText = weatherInfo?.clouds?.all;
}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
            //Show alert for no geolocation available.
    }
}

function showPosition(position){
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longtitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

const grantAccessButton = document.querySelector("[data-grantAccess]");

grantAccessButton.addEventListener("click", getLocation);










// console.log("hello!");

// const API_KEY = "3f6faa3c9bdde6b1b4c64dac4f7c9d8e";

// async function showWeather() {
//     // let latitude = 15.3333;
//     // let longtitude = 74.0833;

//     try{

//         let city = "goa";

//     const response  = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
//     const data = await response.json();
//     console.log("Weather data :" , data);

//     let newPara = document.createElement('p');
//     newPara.textContent = data
//     document.body.appendChild(newPara);

//     }catch(err){

// console.log(err,"error found");

//     }
    
// }

// function geoLocation() {
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }
//     else{
//         console.log("No location support , please throw your computer!")
//     }
// }

// function showPosition(position) {
//     let latitude = position.coords.latitude;
//     let longitude = position.coords.longtitude;

//     console.log(latitude);
//     console.log(longitude);
// }