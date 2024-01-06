import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const TypeCar = ({ name, image, description, price }) => {
    return (
        <TouchableOpacity style={{ flexDirection: 'row', height: '8%', marginTop: 16 }}>
            <Image
                style={{ width: 70, height: 70, objectFit: 'contain', marginTop: -10 }}
                source={{ uri: image }}

            />

            <View style={{ justifyContent: 'space-between', marginStart: 12 }}>
                <Text style={{ color: '#1F2837', fontSize: 18, fontWeight: 'bold' }}>{name}</Text>
                <Text style={{ color: '#1F2837', fontSize: 13, fontWeight: '400' }}>{description} </Text>

            </View>
            <View style={{ alignItems: 'flex-end', flex: 1 }}>
                <Text style={{ color: '#9DA2AF', fontSize: 14, fontWeight: 'bold' }}>
                    {`$${price}`}
                </Text>
            </View>


        </TouchableOpacity>
    )
}

export default TypeCar