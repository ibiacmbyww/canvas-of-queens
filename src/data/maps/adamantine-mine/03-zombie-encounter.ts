import unsortedPlayers from "../../actors/unsortedPlayers"
import MapData from "../../../types/MapData";

const mapData: MapData = {
  actors: [...unsortedPlayers],
  map: {
    imgFileName: "03-zombie-encounter.png",
    displayName: "Ruby Mine"
  }
}

export default mapData