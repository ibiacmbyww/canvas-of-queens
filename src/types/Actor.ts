type Actor = {
  id: number;
  displayName: string;
  playerName: string;
  posX: number;
  posY: number;
  color: string;
  moveFt: number;
  radiusFt: number | false;
  isPlaced: boolean;
  highlighted: boolean;
  isDeleted: boolean;
}

export default Actor