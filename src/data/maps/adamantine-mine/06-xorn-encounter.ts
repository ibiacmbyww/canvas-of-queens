import unsortedPlayers from "../../actors/unsortedPlayers"
import MapData from "../../../types/MapData";

const mapData: MapData = {
  actors: [...unsortedPlayers],
  map: {
    imgFileName: "06-xorn-encounter.png",
    displayName: "Site RTJ5"
  }
}

export default mapData