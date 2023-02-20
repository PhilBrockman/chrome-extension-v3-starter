const allOn = () => {
  setGlobalOpacity(0, 1);
};

const convertTimeToOpacity = ({ elapsedTime, maxTime, chosenNodes }) => {
  const allPieces = getPieces();
  const percentageRemaining = (maxTime - elapsedTime) / maxTime;
  const opacity =
    percentageRemaining > 0.9 ? 0.7 : percentageRemaining > 0.3 ? 0.3 : 0.01;

  for (let i = 0; i < allPieces.length; i++) {
    // if the piece is not in the chosenNodes, set opacity to 1
    if (!chosenNodes.includes(allPieces[i])) {
      allPieces[i].style.opacity = 1;
    } else {
      allPieces[i].style.opacity = opacity;
    }
  }
};

const countDownOnChosenNodes = ({ chosenNodes, maxTime }) => {
  const currentPuzzleCount = puzzleCount;
  let elapsedTime = 0;
  const countdownInterval = setInterval(() => {
    console.log("running on puzzle", currentPuzzleCount);
    elapsedTime += increment;
    if (currentPuzzleCount !== puzzleCount || elapsedTime > maxTime) {
      clearInterval(countdownInterval);
      return;
    }
    convertTimeToOpacity({
      elapsedTime,
      maxTime,
      chosenNodes,
    });
  }, increment);
};

document.addEventListener("click", function (event) {
  if (
    event.target.getAttribute("aria-label") === "Next Puzzle" ||
    // if it is a span with class "arrow-right"
    (event.target.tagName === "SPAN" &&
      event.target.classList.contains("arrow-right"))
  ) {
    allOn();
    const chosenNodes = chooseNrandomPieces(piecesToHide);
    puzzleCount++;
    countDownOnChosenNodes({
      chosenNodes,
      maxTime: timeoutLength,
    });
  }
});
