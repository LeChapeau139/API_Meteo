const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const weatherDaily = document.querySelector('.weather-daily');
const weatherMap = document.querySelector('.weather-map');
const error404 = document.querySelector('.not-found');
let map;

// const cities = document.querySelectorAll('.city'); // Sélectionnez tous les éléments de ville

// // Fonction pour récupérer les villes sauvegardées dans le stockage local
// function getCitiesFromLocalStorage() {
//     return JSON.parse(localStorage.getItem('cities')) || [];
// }

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

// Fonction pour afficher la météo de la ville actuelle
function showCurrentCityWeather(city = null) {
    const currentCity = city ? city : swipcities[currentCityIndex];
    searchWeather(currentCity);
    if (!city) {
        document.querySelector('.search-box input').value = currentCity;
    }
}

// Fonction pour mettre à jour l'indicateur actif
function updatePaginationIndicator(currentCityIndex) {
    const dots = document.querySelectorAll('.pagination .dot');
    dots.forEach((dot, index) => {
        if (index === currentCityIndex) {
            dot.style.backgroundColor = '#1B1B1B'; // Changer la couleur du fond du point
            dot.style.borderRadius = '50%'; // Rendre le point circulaire si nécessaire
        } else {
            dot.style.backgroundColor = '#bbb'; // Réinitialiser la couleur du fond
            dot.style.color = 'black'; // Réinitialiser la couleur du texte
            dot.style.border = 'none'; // Retirer la bordure
        }
    });
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

// Afficher la météo de la première ville au chargement de la page
showCurrentCityWeather();

// Événement de clic sur le bouton de recherche
search.addEventListener('click', () => {
    const city = document.querySelector('.search-box input').value;
    showCurrentCityWeather(city); // Afficher la météo de la ville saisie
    showWeatherForecast(city); // Afficher les prévisions météorologiques pour la nouvelle ville
    updatePaginationIndicator(currentCityIndex);
});


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

            const latitude = json.coord.lat;
            const longitude = json.coord.lon;

            // Vérifier si la carte est déjà initialisée
            if (map) {
                // Si oui, mettre à jour la vue de la carte avec les nouvelles coordonnées
                map.setView([latitude, longitude]);

                // Vérifier si le marqueur existe déjà sur la carte
                if (marker) {
                    // Si oui, déplacer le marqueur vers les nouvelles coordonnées
                    marker.setLatLng([latitude, longitude]);
                } else {
                    // Sinon, créer un nouveau marqueur aux nouvelles coordonnées
                    marker = L.marker([latitude, longitude]).addTo(map);
                }
            } else {
                // Sinon, initialiser la carte et créer le marqueur aux nouvelles coordonnées
                map = L.map("map").setView([latitude, longitude], 13);

                // Ajouter le calque de tuiles Stadia
                var Stadia_OSMBright = L.tileLayer(
                    "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png",
                    {
                        maxZoom: 20,
                        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
                    }
                );
                Stadia_OSMBright.addTo(map);

                // Créer le marqueur aux nouvelles coordonnées
                marker = L.marker([latitude, longitude]).addTo(map);
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


