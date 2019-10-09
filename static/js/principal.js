let cube = document.querySelector(".cube");
let success = true;
let messageClass = "";

cube.addEventListener("click", e => {
    cube.classList.add("cube-ani");
    cube.classList.toggle("show-success");
});

cube.addEventListener("animationend", e => {
    if (e.animationName === "show-top") {
        cube.classList.remove("cube-ani");
    } else if (e.animationName === "spin-up") {
        cube.classList.remove("spin");
    }
});