import React, { useEffect, useRef, useState } from 'react'
import { Image, Keyboard, StyleSheet, Text, View } from 'react-native'
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps'
import { mapStyleLight } from '../../utils/mapStyleLight'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { apiKeyAutocomplete } from '../../utils/apikeyautocomplete'
import BottomSheet, { TouchableOpacity } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Geolocation from 'react-native-geolocation-service';
import { newRegion } from './MapUtils'
import axios from 'axios'
import Icon from 'react-native-vector-icons/Feather';
import TypeCar from '../../components/TypeCar'
import { useDispatch, useSelector } from 'react-redux'
import { savePlace } from '../../redux/actions'
import PlaceItem from '../../components/PlaceItem'


const MapScreen = nativeStack => {
  const { places } = useSelector(state => state.places)
  const dispatch = useDispatch()
  const [placeLocation, setPlaceLocation] = useState({
    latitude: 0.0,
    longitude: 0.0
  })
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0.0,
    longitude: 0.0
  })

  const [typeView, setTypeView] = useState('cars')
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

  const saveNewPlace = objPlace => {
    dispatch(savePlace(objPlace))
  }

  const arrayRoutes = async (longitude_start, latitude_start, longitude_end, latitude_end) => {
    try {
      setCoordinates([])
      const resp = await axios.get(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62483e809710dde24d08839059923d94ced4&start=${longitude_start},${latitude_start}&end=${longitude_end},${latitude_end}`)
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
          }}  >
          {
            (placeLocation.latitude === 0.0 && placeLocation.longitude === 0.0)
              ? <></>
              : <Marker
                identifier='destination'
                title={address}
                coordinate={placeLocation}
                opacity={1}
                stopPropagation={true}
                rotation={0}
                tracksViewChanges={true}
                flat={true}
              >
                <Callout
                  style={{
                    borderRadius:40,
                    elevation: 10,
                    padding: 10,
                    backgroundColor:'transparent',
                    width: 200,
                  }}
                >
                  <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}
                  >Este es tu destino:</Text>

                  <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '600',
                    color:'#4285F4'
                  }}
                  >
                    {address}
                  </Text>
                </Callout>
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
          snapPoints={['25%', '50%', '90%']}
          style={{ paddingHorizontal: 16 }}
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
              var newPlace = {
                title: details.formatted_address,
                description: data.description,
                lat,
                lng
              }
              saveNewPlace(newPlace)
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
            }}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={1000}
            textInputProps={{
              placeholderTextColor: '#6B6B6B',
            }}

            styles={{
              container: {
                width: "100%",
                position: 'absolute',
                top: 24,
                zIndex: 100
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

          <View style={{ marginTop: 68, flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => setTypeView('cars')}
              style={{
                backgroundColor: typeView === 'cars' ? '#000' : 'gray',
                borderRadius: 20
              }}>
              <Text style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                color: 'white',
                fontSize: 14,
                fontWeight: 'bold'
              }}>
                Type car
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTypeView('places')}
              style={{
                marginStart: 6,
                backgroundColor: typeView === 'places' ? '#000' : 'gray',
                borderRadius: 20
              }}>
              <Text
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 'bold'
                }}>
                My places
              </Text>
            </TouchableOpacity>
          </View>
          {
            typeView === 'cars' ?
              <View style={{ flex: 1, marginTop: 10 }}>
                <TypeCar
                  name="UberX"
                  image="https://links.papareact.com/3pn"
                  description="Economy"
                  price="15"
                />
                <View style={{ backgroundColor: '#EDEEF0', height: 1, marginTop: 16 }} />

                <TypeCar
                  name="UberXL"
                  image="https://links.papareact.com/5w8"
                  description="Comfort"
                  price="22" />
                <View style={{ backgroundColor: '#EDEEF0', height: 1, marginTop: 16 }} />

                <TypeCar
                  name="Uber LUX"
                  image="https://links.papareact.com/7pf"
                  description="Luxury"
                  price="27" />
                <View style={{ backgroundColor: '#EDEEF0', height: 1, marginTop: 16 }} />

                <TypeCar
                  name="UberX"
                  image="https://links.papareact.com/3pn"
                  description="Economy"
                  price="15" />
              </View> : <></>
          }
          {
            typeView === 'places' ?
              <View style={{ marginTop: 18 }}>
                {
                  places.map((item, index) => {
                    return (
                      <PlaceItem
                        key={index}
                        objPlace={item}
                        onClickPlace={(objPlace) => {

                          bottomSheetRef.current?.snapToIndex(0)

                          arrayRoutes(
                            currentLocation.longitude,
                            currentLocation.latitude,
                            objPlace.lng,
                            objPlace.lat
                          )
                          setPlaceLocation({
                            latitude: objPlace.lat,
                            longitude: objPlace.lng
                          })
                          setAddress(objPlace.title)

                          centerTwoPoins()


                        }}
                      />
                    )
                  })
                }
              </View>
              : <></>
          }
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
            backgroundColor: '#4285F4',
            borderRadius: 24,
            position: 'absolute',
            bottom: 220,
            right: 10,
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',

          }}>
          <Icon name="compass" size={30} color="#fff" />
        </TouchableOpacity>
      <TouchableOpacity
          onPress={() => {
            nativeStack.navigation.navigate('FlagScreen')
          }}
          style={{
            backgroundColor: '#4285F4',
            borderRadius: 24,
            position: 'absolute',
            bottom: 280,
            right: 10,
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',

          }}>
          <Icon name="flag" size={30} color="#fff" />
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