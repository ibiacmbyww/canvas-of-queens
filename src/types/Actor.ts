export type ActorMin = {
  displayName: string,
  playerName: string,
  posX: number,
  posY: number,
  color: string,
  moveFt: number,
  isPlaced: boolean,
  initiativeModifier: number,
  initiativeTiebreaker: number,
  team: number,
  hp: number,
}

export type Actor = ActorMin & {
  id: number,
  moveRemaining: number,
  moveRadiusFt: number | undefined,
  highlighted: boolean,
  isDeleted: boolean,
  initiative: number,
  currentHP: number,
}