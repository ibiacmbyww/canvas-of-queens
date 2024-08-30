import { Actor } from "./Actor";

type MapData = {
  actors: Actor[],
  
  map: {
    imgFileName: string,
    displayName: string
  }
}

export default MapData