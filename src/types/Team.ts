import Colors from "./Colors"

export enum TeamNames {
  TheParty = "The Party",
  NodianSoldiers = "Nodian Soldiers",
  Civilians = "Civilians",
  Tarrasques = "Tarrasques",
}

export type Team = {
  name: TeamNames,
  color: Colors
}