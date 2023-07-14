

console.log("this is the weather api");


let input1 = document.querySelector('.input_search');
let btn = document.querySelector('button');

const key = '7ce3b3145a000b5a45368dc8532ede19';


btn.addEventListener("click", (e) => {
    console.log("Button Clicked");
    e.preventDefault();
    let city = input1.value;
    getweather(city);
    
    document.body.style.backgroundImage = `url('https://source.unsplash.com/random/1920x1080/?${city}')`;

});

window.addEventListener("load", () => {

    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=7ce3b3145a000b5a45368dc8532ede19`;
            fetch(api)
                .then(response => response.json())
                .then(data => {

                    const { name } = data;
                    const { id } = data.weather;
                    const { description } = data.weather[0];
                    const { icon } = data.weather[0];
                    const { temp, humidity, pressure } = data.main;
                    const { speed } = data.wind;

                    document.querySelector(".city").innerText = "Weather in " + name;
                    document.querySelector(".temp").innerHTML = Math.round(temp - 273) + "°C";
                    document.querySelector(".desc").innerHTML = description;
                    document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + ".png";
                    document.querySelector(".humidity").innerHTML = "Humidity : " + humidity + " %";
                    document.querySelector(".wind").innerHTML = "Wind Speed : " + speed + " km/h";
                    document.querySelector(".pressure").innerHTML = "Pressure : " + pressure;

                    //this is for showing bg image for the current location
                    document.body.style.backgroundImage = `url('https://source.unsplash.com/random/1920x1080/?${name}')`;
                })

                .catch(err => console.log("Wrong city name."));
        })
    } else
        console.log("Position not detected.");

});

const getweather = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`);
        const data = await response.json();
        const { name } = data;
        const { id } = data.weather;
        const { description } = data.weather[0];
        const { icon } = data.weather[0];
        const { temp, humidity, pressure } = data.main;
        const { speed } = data.wind;

        document.body.style.backgroundImage = `url('https://source.unsplash.com/random/1920x1080/?${name}')`;


        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".temp").innerHTML = Math.round(temp - 273) + "°C";
        document.querySelector(".desc").innerHTML = description;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".humidity").innerHTML = "Humidity : " + humidity + " %";
        document.querySelector(".wind").innerHTML = "Wind Speed : " + speed + " km/h";
        document.querySelector(".pressure").innerHTML = "Pressure : " + pressure;



        console.log(data);
        console.log("city : " + name + "\n"
            + "temperature : " + temp + "\n"
            + "description : " + description + "\n"
            + "icon : " + icon + "\n"
            + "pressure : " + pressure + "\n"
            + "humidity : " + humidity + "\n"
            + "Wind Speed : " + speed + "\n");
    }
    catch (error) {
        alert("city not found");
    }
}

