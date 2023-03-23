

const tabcontainer= document.querySelector(".tabcantainer");
const userweather= document.querySelector("[data-userweather]");
const searchweather= document.querySelector("[searchweather]");

const weatherContainer= document.querySelector(".weather-container");
const  grantAccessContainer= document.querySelector(".grant-location-container");

const grantaccess= document.querySelector("[data-grantaccess]");

const searchfrom= document.querySelector("[data-searchaform]");
// const searchInput= document.querySelector("[data-searchInput]");
const lodingContainer= document.querySelector(".loding-container");
const  userInformationContainer= document.querySelector(".user-info-container");
  






let currentTab= userweather;
let API_KEY="a552ad5ee1c7003e2194aaa397e1587a";
currentTab.classList.add("current-tab");
getfromsessionStorange();



function switchTab(clickTab){
    if(clickTab!=currentTab){
        currentTab.classList.remove("current-tab");
        currentTab = clickTab;
        currentTab.classList.add("current-tab")

        if(!searchfrom.classList.contains("active")){
            userInformationContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchfrom.classList.add("active");

        }
        else {
            searchfrom.classList.remove("active");
            userInformationContainer.classList.remove("active");
            getfromsessionStorange();

        }
    }

}

userweather.addEventListener("click", ()=>{
    switchTab(userweather);
    
})

searchweather.addEventListener("click", ()=>{
    switchTab(searchweather);
    
})

function getfromsessionStorange(){
    const localCoordinates=sessionStorage.getItem("user-coordinates");
    if (!localCoordinates) {
        grantAccessContainer.classList.add("active");
        
    }
    else {
        const coordinates =JSON.parse(localCoordinates);
        fetchUserweatherInfo(coordinates);

    }
}

async function  fetchUserweatherInfo(coordinates){
    const {lat, lon}=coordinates;

    grantAccessContainer.classList.remove("active");

    lodingContainer.classList.add("active")

    try {
       const response= await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      


       );
       const data = await response.json();

       lodingContainer.classList.remove("active");
       userInformationContainer.classList.add("active");
       renderweatherInfo(data);
       
    } catch (err) {
        // lodingContainer.classList.remove("active");
        // lodingContainer.classList.remove("active");
        // userInformationContainer.classList.remove("active")
        // // weatherContainer.innerHTML=("data is not found");
        
    }

}

function renderweatherInfo(weatherInfo){
    
    const cityName= document.querySelector("[data-city]");
    const countyIcon= document.querySelector("[data-counttryIcon]");
    const desc= document.querySelector("[data-weatherDesc]");
    const weatherIcon= document.querySelector("[data-weatherIcon]");
    const temp= document.querySelector("[data-temp]");
    const windspeed= document.querySelector("[data-windspeed]");
    const humidity= document.querySelector("[data-humidity]");
    const cloud= document.querySelector("[data-cloud]");

    console.log(weatherInfo);
    
   
    // optintinal channeing method
    
        cityName.innerText = weatherInfo?.name;
        countyIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
        desc.innerText = weatherInfo?.weather?.[0]?.description;
        weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
        temp.innerText =`${ weatherInfo?.main?.temp}℃`;
        windspeed.innerText =`${weatherInfo?.wind?.speed}m/s`;
        humidity.innerText =`${weatherInfo?.main?.humidity}%`;
       cloud.innerText =`${weatherInfo?.clouds?.all}%`;
        
    


    // cityName.innerText = weatherInfo?.name;
    // countyIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    // desc.innerText = weatherInfo?.weather?.[0]?.description;
    // weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    // temp.innerText =`${ weatherInfo?.main?.temp}℃`;
    // windspeed.innerText =`${weatherInfo?.wind?.speed}m/s`;
    // humidity.innerText =`${weatherInfo?.main?.humidity}%`;
    // cloud.innerText =`${weatherInfo?.clouds?.all}%`;

} 

function getlocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        // hw
        searchweather.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position){

    const usercoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    sessionStorage.setItem("user-coordinates" , JSON.stringify(usercoordinates));
    fetchSearchWeatherInfo(usercoordinates);
}

const grantaccessBtn=document.querySelector("[data-grantaccess]");
grantaccessBtn.addEventListener("click", getlocation);

const searchInput=document.querySelector("[data-searchInput]");

searchfrom.addEventListener("submit", (e)=>{
    e.preventDefault();
    let cityName = searchInput.value;
    if(cityName=== "" ) 
      return;
    else
      fetchSearchWeatherInfo(cityName);



})

// let city="goa"
// console.log(city);

async function fetchSearchWeatherInfo(city){

    console.log(city);
    lodingContainer.classList.add("active");
    userInformationContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response= await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            
            );
         
        const data = await response.json();
        
        lodingContainer.classList.remove("active");
        userInformationContainer.classList.add("active")
        renderweatherInfo(data);
        
    } catch (err) {
       
        weatherContainer.innerHTML=("data is not found");
        
        
    }
}





