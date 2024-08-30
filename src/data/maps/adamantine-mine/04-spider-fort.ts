import unsortedPlayers from "../../actors/unsortedPlayers"
import MapData from "../../../types/MapData";

const mapData: MapData = {
  actors: [...unsortedPlayers],
  map: {
    imgFileName: "04-spider-fort.png",
    displayName: "Entranceway Guardtowers"
  }
}

export default mapData