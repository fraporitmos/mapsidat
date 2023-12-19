import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Image, Keyboard, Platform, StyleSheet, Text, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, Polyline, LatLng } from 'react-native-maps'
import { mapStyleLight } from '../utils/mapStyleLight'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { apiKeyAutocomplete } from '../utils/apikeyautocomplete'
import BottomSheet, { TouchableOpacity } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const MapScreen = () => {
  //https://dribbble.com/shots/15978599-Uber-App-Redesign/attachments/7815403?mode=media
  //https://www.figma.com/file/gDvhZu46euencNMc7XxEPR/Uber-App-UI---Free-UI-Kit-(Recreated)-(Community)?type=design&node-id=2-978&mode=design&t=Zdq0du95Vo8tOH5B-0

  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);
  const bottomSheetRef = useRef(null);
  const mapViewRef = useRef(null);
  
  const [keyboard, setKeyboard] = useState(false)

  useEffect(() => {
    bottomSheetRef.current?.snapToIndex(0)
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
  } , [keyboard])



  const centerMap = (lat, lng) => {
    const region = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.025,
      longitudeDelta: 0.0151,
    }
    mapViewRef.current.animateToRegion(region)
  }

  const [place, setPlace] = useState({
    latitude: -8.111806286288122,
    longitude: -79.02950761793734
  })

  const [address, setAddress] = useState("Mi lugar favorito")


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
          style={{ flex: 1 }}
          region={{
            latitude: -8.111702241469064,
            longitude: -79.02897325388474,
            latitudeDelta: 0.025,
            longitudeDelta: 0.0151,
          }}
        >
          <Marker
            title={address}
            coordinate={place}
          >
            <Image
              style={{ width: 70, height: 70 }}
              source={require('../assets/marker_a.png')}
            />
          </Marker>

          {/*
        <Polyline coordinates={
          [
            { latitude: -8.111806286288122, longitude: -79.02950761793734 },
            { latitude: -8.112729319184725, longitude: -79.02865414520089 },
            { latitude: -8.113649459248057, longitude: -79.02940826087665 },

          ]
        }

          strokeWidth={4}
        />
       */}
        </MapView>

        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
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
              setPlace({
                latitude: lat,
                longitude: lng
              })
              setAddress(data.description)
              centerMap(lat, lng)
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