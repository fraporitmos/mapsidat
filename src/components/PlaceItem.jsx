import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';

const PlaceItem = ({ objPlace , onClickPlace}) => {
    const { title, description, lat, lng } = objPlace
    return (
        <TouchableOpacity
            onPress={() => onClickPlace(objPlace)}
            style={{
                flexDirection: 'row',
                marginTop: 12,
                alignItems: 'center',
                justifyContent: 'space-around'
            }}>

            <View style={{ backgroundColor: '#333333', borderRadius: 50, padding: 6 }}>
                <Icon name="map-pin" size={28} color="#fff" />
            </View>
            <View>
                <Text style={{ fontSize: 14, fontWeight: 'bold', width: 220, }}>{title} </Text>
                <Text style={{ fontSize: 10, fontWeight: '300', width: 220, }}>{description} </Text>
            </View>
            <Icon2 name="trash" size={22} color="#000" />

        </TouchableOpacity>
    )
}

export default PlaceItem