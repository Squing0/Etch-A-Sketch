const container = document.querySelector("#container");

for(let i = 0; i < 16; i++){
    container.appendChild(document.createElement("div"));
}

const gridItems = document.querySelectorAll("div");

gridItems.forEach((gridItem) => {
    gridItem.style.border = "1px solid black";
    gridItem.style.margin = "2rem";
});