import unsortedPlayers from "../../actors/unsortedPlayers"
import MapData from "../../../types/MapData";

const mapData: MapData = {
  actors: [...unsortedPlayers],
  map: {
    imgFileName: "05-vip-entrance-back-route.png",
    displayName: "Secret route to RTJ5"
  }
}

export default mapData