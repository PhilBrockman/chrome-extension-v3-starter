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
opacity0.textContent = "show all pieces";
opacity0.addEventListener("click", allOn());
buttonContainer.appendChild(opacity0);

// create a button to set the opacity to 1
const opacity1 = document.createElement("button");
opacity1.textContent = "hide some pieces";
opacity1.addEventListener("click", () => {
  const chosenNodes = chooseNrandomPieces(piecesToHide);
  countDownOnChosenNodes({
    chosenNodes,
    maxTime: timeoutLength,
  });
});
buttonContainer.appendChild(opacity1);

// create an input field to modify the value of "timeoutLength"
const timeoutLengthInput = document.createElement("input");
timeoutLengthInput.type = "number";
timeoutLengthInput.value = timeoutLength;
timeoutLengthInput.addEventListener("change", (e) => {
  timeoutLength = e.target.value;
});
buttonContainer.appendChild(timeoutLengthInput);

// create an input field to modify the value of "piecesToHide"
const piecesToHideInput = document.createElement("input");
piecesToHideInput.type = "number";
piecesToHideInput.value = piecesToHide;
piecesToHideInput.addEventListener("change", (e) => {
  piecesToHide = e.target.value;
});
buttonContainer.appendChild(piecesToHideInput);
