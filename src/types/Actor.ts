type Actor = {
  id: number;
  displayName: string;
  playerName: string;
  posX: number;
  posY: number;
  color: string;
  moveFt: number;
  moveRadiusFt: number | undefined;
  isPlaced: boolean;
  highlighted: boolean;
  isDeleted: boolean;
}

export default Actor