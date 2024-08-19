const rollDice = (sides: number): number => {
  return 1 + Math.round(Math.random() * (sides - 1))
}

export default rollDice