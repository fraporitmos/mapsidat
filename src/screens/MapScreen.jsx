import React from 'react'
import { Image, Platform, StyleSheet, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps'
import { mapStyleLight } from '../utils/mapStyleLight'
import { mapStyleNight } from '../utils/mapStyleNight'

const MapScreen = () => {
  return (
    <MapView
      mapType='terrain'
      customMapStyle={mapStyleLight}
      zoomControlEnabled={true}
      showsCompass={true}
      provider={ PROVIDER_GOOGLE }
      style={styles.map}
      region={{
        latitude: -8.111702241469064,
        longitude:  -79.02897325388474,
        latitudeDelta: 0.025,
        longitudeDelta: 0.0151,
      }}
    >

    <Marker 
    title='Mi direccion'
    coordinate={{
        latitude: -8.111806286288122, 
        longitude: -79.02950761793734 
    }}
   >
    <Image 
      style={{width:70, height:70}}
      source={require('../assets/marker_a.png')}
    />
   </Marker>

<Polyline coordinates={
  [
   {latitude: -8.111806286288122, longitude:-79.02950761793734},
   {latitude: -8.112729319184725, longitude:-79.02865414520089},
   {latitude: -8.113649459248057, longitude:-79.02940826087665},

  ]
} 

strokeWidth={4}
/>
    </MapView>
  )
}

export default MapScreen
const styles = StyleSheet.create({
    container: {
        flex:1,

    },
    map: {
        flex:1,

    },
});