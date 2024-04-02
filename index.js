const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

const swipcities = ['Marseille', 'New York', 'Tokyo', 'Bergen'];

let currentCityIndex = 0; // Indice de la ville actuelle dans le tableau des villes

// Fonction pour détecter le swipe gauche
function detectSwipeLeft(el, handler) {
    let touchstartX = 0;
    let touchendX = 0;
    let touchstartY = 0;
    let touchendY = 0;
    el.addEventListener('touchstart', function(event) {
        touchstartX = event.changedTouches[0].screenX;
        touchstartY = event.changedTouches[0].screenY;
    }, false);
    el.addEventListener('touchend', function(event) {
        touchendX = event.changedTouches[0].screenX;
        touchendY = event.changedTouches[0].screenY;
        handleSwipe();
    }, false);

    function handleSwipe() {
        if (touchendX < touchstartX && Math.abs(touchendX - touchstartX) > Math.abs(touchendY - touchstartY)) {
            handler();
        }
    }
}

// Appeler la fonction pour détecter le swipe gauche
detectSwipeLeft(document.body, () => {
    currentCityIndex = (currentCityIndex + 1) % swipcities.length;
    showCurrentCityWeather();
    updatePaginationIndicator(currentCityIndex);
});

// Appeler la fonction pour détecter le swipe droit
detectSwipeRight(document.body, () => {
    currentCityIndex = (currentCityIndex - 1 + swipcities.length) % swipcities.length;
    showCurrentCityWeather();
    updatePaginationIndicator(currentCityIndex);
});

// Fonction pour détecter le swipe droit
function detectSwipeRight(el, handler) {
    let touchstartX = 0;
    let touchendX = 0;
    let touchstartY = 0;
    let touchendY = 0;
    el.addEventListener('touchstart', function(event) {
        touchstartX = event.changedTouches[0].screenX;
        touchstartY = event.changedTouches[0].screenY;
    }, false);
    el.addEventListener('touchend', function(event) {
        touchendX = event.changedTouches[0].screenX;
        touchendY = event.changedTouches[0].screenY;
        handleSwipe();
    }, false);

    function handleSwipe() {
        if (touchendX > touchstartX && Math.abs(touchendX - touchstartX) > Math.abs(touchendY - touchstartY)) {
            handler();
        }
    }
}

// Fonction pour rechercher la météo
function searchWeather(city) {
    const APIKey = '449617b922c4e10aa802c200f98db360';

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                // Gérer l'erreur 404
                return;
            }

            const image = document.querySelector('.weather-box img');
            const fond = document.querySelector('#fond');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            const clouds = document.querySelector('.weather-details .clou span');
            const mains = document.querySelector('.weather-details .basse span');
            const main = document.querySelector('.weather-details .haute span');
            const color_times = document.querySelector('.weather-box');
            const color_daily = document.querySelector('.weather-daily');
            const color_humidity = document.querySelector('.humidity');
            const color_wind = document.querySelector('.weather-details .wind');
            const color_clou = document.querySelector('.weather-details .clou');
            const color_temp_diff = document.querySelector('.weather-details .temp_diff');
            const color_map = document.querySelector('.weather-map');
            const color_box = document.querySelector('.search-box');
            const color_text = document.querySelector('#recherche');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    fond.src = 'images/ensoleil.png';
                    color_times.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_daily.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_humidity.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_wind.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_clou.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_temp_diff.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_map.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_box.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_text.style.backgroundColor = 'rgba(7,28,49,255)';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    fond.src = 'images/blue-rain.png';
                    color_times.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_daily.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_humidity.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_wind.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_clou.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_temp_diff.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_map.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_box.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_text.style.backgroundColor = 'rgba(7,28,49,255)';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    video.src = 'images/snowy.jpg';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    fond.src = 'images/cloudy.jpg';
                    color_times.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_daily.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_humidity.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_wind.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_clou.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_temp_diff.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_map.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_box.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_text.style.backgroundColor = 'rgba(7,28,49,255)';
                    break;

                case 'Mist':
                    image.src = 'images/mist.png';
                    fond.src = 'images/misty.jpg';
                    color_times.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_daily.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_humidity.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_wind.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_clou.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_temp_diff.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_map.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_box.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_text.style.backgroundColor = 'rgba(7,28,49,255)';
                    break;

                case 'Thunder':
                    image.src = 'images/thunderstorm.png';
                    fond.src = 'images/thunder.jpeg';
                    color_times.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_daily.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_humidity.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_wind.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_clou.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_temp_diff.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_map.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_box.style.backgroundColor = 'rgba(7,28,49,255)';
                    color_text.style.backgroundColor = 'rgba(7,28,49,255)';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
            clouds.innerHTML = `${parseInt(json.clouds.all)}%`;
            mains.innerHTML = `${parseInt(json.main.temp_min)}°C`;
            main.innerHTML = `${parseInt(json.main.temp_max)}°C`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherDaily.style.display = '';
            weatherMap.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            weatherDaily.classList.add('fadeIn');
            weatherMap.classList.add('fadeIn');
        });
}