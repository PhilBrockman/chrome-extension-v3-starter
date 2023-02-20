const getPieces = () => Array.from(document.querySelectorAll(".piece"));

function getPieceLocations() {
  const pieceList = [];

  const colorPieceTypePattern = /([wb])([pnbrqk])/;
  const locationPattern = /square-(\d+)/;

  getPieces().forEach((piece) => {
    const pieceTypeMatch = piece.className.match(colorPieceTypePattern);
    const locationMatch = piece.className.match(locationPattern);

    if (pieceTypeMatch && locationMatch) {
      const color = pieceTypeMatch[1];
      const pieceType = pieceTypeMatch[2];
      const location = parseInt(locationMatch[1]);

      pieceList.push({
        className: piece.className,
        color: color === "w" ? "white" : "black",
        piece:
          pieceType === "p"
            ? "pawn"
            : pieceType === "r"
            ? "rook"
            : pieceType === "n"
            ? "knight"
            : pieceType === "b"
            ? "bishop"
            : pieceType === "q"
            ? "queen"
            : "king",
        location: location,
        url: `https://www.chess.com/chess-themes/pieces/neo/150/${
          color + pieceType
        }.png`,
      });
    }
  });

  return pieceList;
}
function chooseNrandomPieces(n) {
  const pieces = getPieces();
  const randomPieces = [];
  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * pieces.length);
    randomPieces.push(pieces[randomIndex]);
    pieces.splice(randomIndex, 1);
  }
  return randomPieces;
}
function setGlobalOpacity(quantity, opacity) {
  const chosenPieces =
    quantity > 0 ? chooseNrandomPieces(quantity) : getPieces();

  for (let i = 0; i < chosenPieces.length; i++) {
    const piece = chosenPieces[i];
    piece.style.opacity = opacity;
  }
}
function setPieceLocationData() {
  const pieces = getPieceLocations();
  // create a new div to hold the pieces and their locations
  const pieceContainer = document.createElement("div");
  pieceContainer.id = PIECE_CONTAINER_ID;
  pieceContainer.style.backgroundColor = "rgba(215, 215, 215, 1)";
  pieceContainer.style.padding = "10px";
  pieceContainer.style.borderRadius = "5px";
  pieceContainer.style.fontSize = "20px";
  pieceContainer.style.maxHeight = "100vh";
  pieceContainer.style.overflowY = "scroll";

  for (let i = 0; i < pieces.length; i++) {
    const piece = pieces[i];
    const pieceNode = document.createElement("div");
    pieceNode.style.display = "flex";
    pieceNode.style.alignItems = "center";
    pieceNode.style.marginBottom = "5px";

    const pieceImage = document.createElement("img");
    pieceImage.src = piece.url;
    pieceImage.style.width = "45px";
    pieceImage.style.height = "45px";
    pieceImage.style.marginRight = "10px";
    pieceNode.appendChild(pieceImage);

    const pieceInfo = document.createElement("div");
    // map location to chess board notation (11 --> A1, 88 --> H8)
    const rawFile = String(piece.location).charAt(0);
    const rawRank = String(piece.location).charAt(1);
    const file = String.fromCharCode(97 + parseInt(rawFile) - 1);
    const rank = parseInt(rawRank);
    pieceInfo.textContent = `${piece.color} ${piece.piece} at ${file}${rank}`;
    pieceNode.appendChild(pieceInfo);

    pieceContainer.appendChild(pieceNode);
  }

  // remove the old container if it exists
  const oldPieceContainer = document.getElementById(PIECE_CONTAINER_ID);
  if (oldPieceContainer) {
    oldPieceContainer.remove();
  }
  // add the container to the body
  HUD.appendChild(pieceContainer);
}
