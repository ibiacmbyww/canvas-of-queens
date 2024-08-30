import unsortedPlayers from "../../actors/unsortedPlayers"
import MapData from "../../../types/MapData";

const mapData: MapData = {
  actors: [...unsortedPlayers],
  map: {
    imgFileName: "08-azer-encounter.png",
    displayName: "Azer Encounter"
  }
}

export default mapData