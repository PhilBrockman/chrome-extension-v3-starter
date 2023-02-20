const HUD = document.createElement("div");
HUD.id = HUD_ID;
HUD.style.position = "fixed";
HUD.style.top = "0";
HUD.style.right = "0";
document.body.appendChild(HUD);

// create a new div to hold the button
const buttonContainer = document.createElement("div");
buttonContainer.id = buttonContainer_ID;
buttonContainer.style.backgroundColor = "rgba(215, 215, 215, 1)";
buttonContainer.style.padding = "10px";
buttonContainer.style.borderRadius = "5px";
buttonContainer.style.fontSize = "20px";
HUD.appendChild(buttonContainer);

// create a button to set the opacity to 0
const opacity0 = document.createElement("button");
opacity0.textContent = "Opacity 0";
// opacity0.addEventListener("click", toggleOpacityOff);
buttonContainer.appendChild(opacity0);

// create a button to set the opacity to 1
const opacity1 = document.createElement("button");
opacity1.textContent = "Opacity 1";
opacity1.addEventListener("click", () => {
  const chosenNodes = chooseNrandomPieces(8);
  countDownOnChosenNodes({
    chosenNodes,
    maxTime: 5 * 1000,
  });
});
buttonContainer.appendChild(opacity1);
