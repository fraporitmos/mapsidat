import axios from "axios"

export const newRegion = (lat, lng) => {
    const region = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.025,
      longitudeDelta: 0.0151,
    }
    return region
}
