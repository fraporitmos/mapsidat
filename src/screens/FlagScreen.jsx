import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { mapStyleLight } from '../utils/mapStyleLight';
import { newRegion } from './MapScreen/MapUtils';
import Icon from 'react-native-vector-icons/Feather';
import DialogInput from 'react-native-dialog-input';
import { useDispatch } from 'react-redux';
import { savePlace } from '../redux/actions';
import axios from 'axios';
import { apiKeyAutocomplete } from '../utils/apikeyautocomplete';
const FlagScreen = nativeStack => {
    const [showAlert, setShowAlert] = useState(false)
    const dispatch = useDispatch()
    const apiKey = "5b3ce3597851110001cf62483e809710dde24d08839059923d94ced4"
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 0.0,
        longitude: 0.0
    })

    const [customLocation,setCurstonLocation] = useState({
        latitude: 0.0,
        longitude: 0.0
    })


    useEffect(() => {
        getCurrentLocation()
    }, [])
    const mapViewRef = useRef(null);

    const saveNewPlace = objPlace => {
        dispatch(savePlace(objPlace))
      }
    
    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(position => {
            setCurrentLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        })
    }

    const getInfoLocation = async(lat,lng, title) => {
        const resp = await axios.get(`https://api.openrouteservice.org/geocode/reverse?api_key=${apiKey}&point.lon=${lng}&point.lat=${lat}&size=1`);
        const data = await resp.data
        if(data.features[0].properties.label !== undefined){
            const newPlace = {
                title: title,
                description: data.features[0].properties.label,
                lat: lat,
                lng: lng
            }
            saveNewPlace(newPlace)
            nativeStack.navigation.navigate('MapScreen')
        }else{
            const newPlace = {
                title: title,
                description: title,
                lat: lat,
                lng: lng
            }
            saveNewPlace(newPlace)
            nativeStack.navigation.navigate('MapScreen')
        }
    }


    const getInfoLocationByGoogle = async(lat,lng, title) => {
   
        const resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKeyAutocomplete}`);

        if (resp.data.results.length > 0) {
            const address = resp.data.results[0].formatted_address;
            const newPlace = {
                title: title,
                description: address,
                lat: lat,
                lng: lng
            }
            saveNewPlace(newPlace)
            nativeStack.navigation.navigate('MapScreen')
        }
    }


    return (
        <>
            <MapView
             onRegionChangeComplete={(region)=>{
                setCurstonLocation({
                    latitude: region.latitude,
                    longitude: region.longitude
                })
             }}
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
                }}>
                <Image style={{
                    width: 60,
                    height: 60,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginLeft: -30,
                    marginTop: -48

                }}
                    source={require('../assets/marker_a.png')}
                />
            </MapView>
            <DialogInput 
            isDialogVisible={showAlert}
            title={"Guardar ubicacion"}
            hintInput ={"Titulo del lugar"}
            submitText={"Guardar"}
            cancelText={"Cancelar"}
            closeDialog={()=>{setShowAlert(!showAlert)}}
            submitInput={(inputText)=>{
            
                getInfoLocationByGoogle(customLocation.latitude,customLocation.longitude,inputText)
              
            }}
            />
               <TouchableOpacity
                onPress={() => {
                    nativeStack.navigation.navigate('MapScreen')
                }}
                style={{
                    backgroundColor: '#000',
                    borderRadius: 24,
                    position: 'absolute',
                    top: 80,
                    left: 10,
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',

                }}>
                <Icon name="arrow-left" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    const region = newRegion(currentLocation.latitude, currentLocation.longitude)
                    mapViewRef.current.animateToRegion(region)
                }}
                style={{
                    backgroundColor: '#4285F4',
                    borderRadius: 24,
                    position: 'absolute',
                    bottom: 120,
                    right: 10,
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',

                }}>
                <Icon name="compass" size={30} color="#fff" />
            </TouchableOpacity>
            
            <View
                style={{
                    position: 'absolute',
                    bottom: 40,
                    width: '100%',
                    alignItems: 'center'
                }}>
                <TouchableOpacity
                onPress={()=> setShowAlert(true)}
                    style={{
                        backgroundColor: '#000',
                        borderRadius: 20,
                        padding: 16,
                        width: '80%'
                    }} >
                    <Text
                        style={{
                            color: 'white',
                            textAlign: 'center',
                            fontSize: 18,
                            fontWeight: 'bold'
                        }}>
                        Establecer ubicacion</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default FlagScreen