// NASA Astronomy API
// NASA API key dosenot change the pic//

const apiKey = "8TEfQCY5cLhlc9YyFY2WfMQyrXC54OiOor6mje0m";
const apiUrl = "https://api.nasa.gov/planetary/apod";

const dateInput = document.querySelector("#date");
const searchButton = document.querySelector("#search-btn");
const imageContainer = document.querySelector("#image-container");
const pictureTitle = document.querySelector("#picture-title");
const pictureDate = document.querySelector("#picture-date");
const pictureDescription = document.querySelector("#picture-description");
const statusMessage = document.querySelector("#status");

// Get today's date in local time//
function getToday() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

// Set the date picker
dateInput.max = getToday();
dateInput.min = "1995-06-16";
dateInput.value = getToday();

// Get data from NASA
async function getSpacePicture(date) {

    statusMessage.textContent = "Exploring the universe...";
    searchButton.disabled = true;

    const url = `${apiUrl}?api_key=${apiKey}&date=${date}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to load NASA data.");
        }

        const data = await response.json();

        displayPicture(data);

        statusMessage.textContent = "Discovery loaded successfully!";

    } catch (error) {

        statusMessage.textContent =
            "Something went wrong. Please try another date.";

        console.error(error);

    } finally {
        searchButton.disabled = false;
    }
}

// Display NASA data on the page
function displayPicture(data) {

    imageContainer.innerHTML = "";

    pictureTitle.textContent = data.title;
    pictureDate.textContent = data.date;
    pictureDescription.textContent = data.explanation;

    if (data.media_type === "image") {

        const image = document.createElement("img");

        image.src = data.url;
        image.alt = data.title;

        imageContainer.appendChild(image);

    } else if (data.media_type === "video") {

        const video = document.createElement("iframe");

        video.src = data.url;
        video.title = data.title;
        video.allowFullscreen = true;

        imageContainer.appendChild(video);

    } else {

        imageContainer.textContent =
            "Media is not available for this date.";
    }
}

// Search button interaction
searchButton.addEventListener("click", function () {

    const selectedDate = dateInput.value;

    if (selectedDate) {
        getSpacePicture(selectedDate);
    }

});

// Loadpicture 
getSpacePicture(dateInput.value);


//*Animated Star*//

const heroSection = document.querySelector(".hero");

if (heroSection) {
    const starContainer = document.createElement("div");
    starContainer.className = "starfield";

    heroSection.prepend(starContainer);

    for (let i = 0; i < 200; i++) {
        const star = document.createElement("span");

        star.className = "star";

        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";

        const size = Math.random() * 2.5 + 0.5;
        star.style.width = size + "px";
        star.style.height = size + "px";

        star.style.animationDelay = Math.random() * 5 + "s";
        star.style.animationDuration = (Math.random() * 4 + 2) + "s";

        starContainer.appendChild(star);
    }
}


//Random Shooting Stars

const shootingHero = document.querySelector(".hero");

function createShootingStar() {
    if (!shootingHero) return;

    const star = document.createElement("div");
    star.className = "shooting-star";

    // Random shooting star direction
const direction = Math.random() < 0.5 ? "left" : "right";

if (direction === "left") {
    star.classList.add("shoot-left");
} else {
    star.classList.add("shoot-right");
}

    star.style.top = Math.random() * 50 + "%";

if (direction === "left") {
    star.style.right = "-10%";
} else {
    star.style.left = "-10%";
}

    shootingHero.appendChild(star);

    star.addEventListener("animationend", () => {
        star.remove();
    });

    // Random delay: 3–8 seconds
    setTimeout(createShootingStar, 3000 + Math.random() * 5000);
}

if (shootingHero) {
    setTimeout(createShootingStar, 2000);
}