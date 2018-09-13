function day() {
    document.documentElement.classList.remove("night");
    var accents = document.getElementsByClassName("accent");

    for (var i = 0; i < accents.length; i++) {
        accents[i].classList.remove("night");
    };

    var hrefs = document.getElementsByTagName("a");

    for (var i = 0; i < hrefs.length; i++) {
        hrefs[i].classList.remove("night");
    }

    document.getElementById("sun").style.display = "none";
    document.getElementById("moon").style.display = "inline";
}

function night() {
    document.documentElement.classList.add("night");
    var accents = document.getElementsByClassName("accent");

    for (var i = 0; i < accents.length; i++) {
        accents[i].classList.add("night");
    };

    var hrefs = document.getElementsByTagName("a");

    for (var i = 0; i < hrefs.length; i++) {
        hrefs[i].classList.add("night");
    }
    
    document.getElementById("moon").style.display = "none";
    document.getElementById("sun").style.display = "inline";
}

function autoDayNight() {
    var hour = new Date().getHours();

    console.log(hour);

    if (hour < 6 || hour >= 19) {
        night();
    } else {
        day();
    }
}

window.addEventListener("load", autoDayNight());