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
  initiative: number;
  initiativeModifier: number;
  initiativeTiebreaker: number;
  team: number;
  hp: number;
  currentHP: number;
}

export default Actor