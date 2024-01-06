import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Image, Keyboard, Platform, StyleSheet, Text, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, Polyline, LatLng } from 'react-native-maps'
import { mapStyleLight } from '../../utils/mapStyleLight'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { apiKeyAutocomplete } from '../../utils/apikeyautocomplete'
import BottomSheet, { TouchableOpacity } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Geolocation from 'react-native-geolocation-service';
import { arrayRoutes, centerMap, newRegion } from './MapUtils'
import axios from 'axios'

const MapScreen = () => {
  //https://dribbble.com/shots/15978599-Uber-App-Redesign/attachments/7815403?mode=media
  //https://www.figma.com/file/gDvhZu46euencNMc7XxEPR/Uber-App-UI---Free-UI-Kit-(Recreated)-(Community)?type=design&node-id=2-978&mode=design&t=Zdq0du95Vo8tOH5B-0
  const [placeLocation, setPlaceLocation] = useState({
    latitude: 0.0,
    longitude: 0.0
  })
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0.0,
    longitude: 0.0
  })

  const [coordinates, setCoordinates] = useState([])
  const [address, setAddress] = useState("Mi lugar favorito")
  const bottomSheetRef = useRef(null);
  const mapViewRef = useRef(null);

  const [keyboard, setKeyboard] = useState(false)


  useEffect(() => {
    getCurrentLocation()
    setTimeout(() => {
      bottomSheetRef.current?.snapToIndex(0)
    }, 100);
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboard(true)
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboard(false)
    });
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };

  }, [])

  useEffect(() => {
    if (keyboard) {
      bottomSheetRef.current?.snapToIndex(2)
    } else {
      bottomSheetRef.current?.snapToIndex(0)
    }
  }, [keyboard])

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(position => {
      setCurrentLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    })
  }

  const centerTwoPoins = () => {
    mapViewRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: {
        top: 100,
        right: 100,
        bottom: 300,
        left: 100
      }
    })
  }



  const arrayRoutes = async (longitude_start, latitude_start, longitude_end, latitude_end) => {
    try {
      setCoordinates([])
      const resp = await axios.get(`https://api.openroutes
      ervice.org/v2/directions/driving-car?api_key=
      5b3ce3597851110001cf62483e809710dde24d08839059923d94ced4
      &start=${longitude_start},${latitude_start}&end=${longitude_end},${latitude_end}`)
      var coordinatesResp = resp.data.features[0].geometry.coordinates
      var coordinatesObjects = coordinatesResp.map((item) => {
        return { latitude: item[1], longitude: item[0] }
      })
        setCoordinates(JSON.parse(JSON.stringify(coordinatesObjects)))
        centerTwoPoins()
    } catch (error) {
      return []
    }

  }



  return (
    <>

      <GestureHandlerRootView style={styles.containerBS}>
        <MapView
          //mapType='terrain'
          ref={mapViewRef}
          customMapStyle={mapStyleLight}
          zoomControlEnabled={true}
          showsCompass={true}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          style={{ flex: 1 }}
          region={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.025,
            longitudeDelta: 0.0151,
          }}
        >
          {
            (placeLocation.latitude === 0.0 && placeLocation.longitude === 0.0)
              ? <></>
              : <Marker
                identifier='destination'
                title={address}
                coordinate={placeLocation}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require('../../assets/marker_b.png')}
                />
              </Marker>
          }
          {
            (currentLocation.latitude === 0.0 && currentLocation.longitude === 0.0)
              ? <></>
              : <Marker
                identifier='origin'
                title={address}
                coordinate={currentLocation}
              >
                <Image
                  style={{ width: 0, height: 0 }}
                  source={require('../../assets/marker_a.png')}
                />
              </Marker>
          }

          {
            coordinates.length > 0 ?
              <Polyline
                coordinates={coordinates}
                strokeWidth={4}
              />
              : <></>


          }


        </MapView>

        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          //snappoint in 15%
          snapPoints={['25%', '50%', '90%']}
          style={{ paddingHorizontal: 16}}
        >
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#6B6B6B' }}>Find a trip </Text>


          <GooglePlacesAutocomplete
            placeholder='Where do you want to go?'
            fetchDetails={true}
            query={{
              key: apiKeyAutocomplete,
              language: 'es',
              components: 'country:pe',
              types: ['geocode'],
              location: '-8.11599 -79.02998',
              radius: 10000
            }}


            onPress={(data, details = null) => {
              var lat = details.geometry.location.lat
              var lng = details.geometry.location.lng
              arrayRoutes(
                currentLocation.longitude,
                currentLocation.latitude,
                lng,
                lat
              )

          
              setPlaceLocation({
                latitude: lat,
                longitude: lng
              })
              setAddress(data.description)

              if (placeLocation.latitude === 0.0 && placeLocation.latitude === 0.0) {
                const region = newRegion(currentLocation.latitude, currentLocation.longitude)
                mapViewRef.current.animateToRegion(region)
              } else {
                centerTwoPoins()

              }



              //console.log(details.formatted_address)
              // console.log(data.description)
              // console.log(details.geometry.location.lat)
              // console.log(details.geometry.location.lng)

            }}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={1000}
            textInputProps={{
              placeholderTextColor: '#6B6B6B',

            }}
            styles={{
              container: {
                width: "100%"
              },
              textInputContainer: {
                borderRadius: 8,
                backgroundColor: '#EEEEEE',
                marginTop: 6,
                borderWidth: 1,
                borderColor: '#6B6B6B',
              },
              textInput: {
                backgroundColor: '#EEEEEE',
                borderRadius: 8,
                fontSize: 18,
              }
            }}
          />

        </BottomSheet>
        <TouchableOpacity
          onPress={() => {
            if (placeLocation.latitude === 0.0 && placeLocation.latitude === 0.0) {
              const region = newRegion(currentLocation.latitude, currentLocation.longitude)
              mapViewRef.current.animateToRegion(region)
            } else {
              centerTwoPoins()
            }
          }}
          style={{
            backgroundColor: '#3F4CFF',
            borderRadius: 24,
            position: 'absolute',
            bottom: 220,
            right: 10,
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Text style={{ textAlign: 'center', color: 'white' }}>C</Text>
        </TouchableOpacity>
      </GestureHandlerRootView>

    </>
  )
}

export default MapScreen
const styles = StyleSheet.create({

  containerBS: {
    flex: 1
  },

});