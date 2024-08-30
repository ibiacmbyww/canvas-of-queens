import unsortedPlayers from "../../actors/unsortedPlayers"
import MapData from "../../../types/MapData";

const mapData: MapData = {
  actors: [...unsortedPlayers],
  map: {
    imgFileName: "02-kobold-town.png",
    displayName: "Kobold Town"
  }
}

export default mapData