const container = document.querySelector("#container");
const slider = document.querySelector("#slider");
const sliderValue = document.querySelector("#sliderValue");

const monochromeBtn = document.querySelector("#monochromeBtn");
const colourBtn = document.querySelector("#colourBtn");
const eraseBtn = document.querySelector("#eraseBtn");
const clearBtn = document.querySelector("#clearBtn");
const colourPickerBtn = document.querySelector("#colourPicker");


let userInput = 16;
let numOfSquares = Math.pow(userInput, 2);
let containerWidth = container.offsetWidth;
let cellColour = "black";
let colourMode = "monochrome";

createGrid();
addEventListeners();

function addEventListeners(){
    slider.addEventListener("input", () =>{
        clearGrid();
    
        userInput = slider.value;
        sliderValue.textContent = `${slider.value}x${slider.value}`;
        numOfSquares = Math.pow(userInput, 2);
        createGrid();
    });
    
    clearBtn.addEventListener("click", () => {
        clearGrid();
        createGrid();
    });

    colourBtn.onclick = () => colourMode = "colour";
    eraseBtn.onclick = () => colourMode = "erase";
    monochromeBtn.onclick = () => colourMode = "monochrome";
    colourPickerBtn.oninput = () => colourMode = colourPickerBtn.value;
}

const gridItems = document.querySelectorAll("div");

let isMouseDown = false;

document.onmousedown = () => isMouseDown = true;
document.onmouseup = () => isMouseDown = false;

gridItems.forEach((gridItem) => {
    gridItem.addEventListener("mouseover", () =>{   
        if(isMouseDown){
        gridItem.style.background = generateColour(colourMode);

        let computedStyle = window.getComputedStyle(gridItem);
        let currentOpacity = parseFloat(computedStyle.getPropertyValue("opacity"));
        let newOpacity = currentOpacity + 0.3;
        gridItem.style.opacity = `${newOpacity}`;
        }
    })
});

function createGrid(){
    for(let i = 0; i < numOfSquares; i++){
        let cell = document.createElement("div");
        cell.classList.toggle("square");
        cell.style.width = `${100 / userInput}%`;
        cell.style.height = `${100/ userInput}%`;

        container.appendChild(cell);
    }

    const gridItems = document.querySelectorAll("div");

    gridItems.forEach((gridItem) => {
        gridItem.addEventListener("mouseenter", () =>{    
            gridItem.style.background = generateColour(colourMode); //Repeated from above (improve)

            let computedStyle = window.getComputedStyle(gridItem);
            let currentOpacity = parseFloat(computedStyle.getPropertyValue("opacity"));
            let newOpacity = currentOpacity + 0.3;
            gridItem.style.opacity = `${newOpacity}`;
        })
    });
}


    
function clearGrid(){
    const gridItems = document.querySelectorAll("div");
    gridItems.forEach((gridItem) =>{
        gridItem.remove();
    })
}
function generateColour(colourMode){
    switch (colourMode){
        case "monochrome":
            return "black";
        case "colour":
            let randomColour1 = (Math.random() * 255);
            let randomColour2 = (Math.random() * 255);
            let randomColour3 = (Math.random() * 255);
    
            return `rgb(${randomColour1}, ${randomColour2}, ${randomColour3})`; 
        case "erase":
            return "white";
        default:
            return colourMode;

    }
}