function day() {
    document.documentElement.id = "";
    document.getElementById("sun").style.display = "none";
    document.getElementById("moon").style.display = "inline";
}

function night() {
    document.documentElement.id = "night";
    document.getElementById("moon").style.display = "none";
    document.getElementById("sun").style.display = "inline";
}

window.addEventListener("load", day());