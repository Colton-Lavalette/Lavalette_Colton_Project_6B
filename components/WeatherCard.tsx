import React from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';

export type WeatherDataProps = {
    city: string;
    state: string;
    shortForecast: string;
    temperature: number;
    tempUnit: string;
    windSpeed: string;
    windDirection: string;
    periodName: string;
    rainChance: string;
    detailedForecast: string;
};

export default function WeatherCard({
    city,
    state,
    shortForecast,
    temperature,
    tempUnit,
    windSpeed,
    windDirection,
    periodName,
    rainChance,
    detailedForecast,
    }: WeatherDataProps)

{
    const screenWidth = Dimensions.get('window').width;
    const containerWidth = screenWidth > 600 ? '50%' : '90%';
    const containerHeight = screenWidth > 600 ? '45%' : '50%';

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={[styles.textContainer, { width: containerWidth, height: containerHeight }]}>
                <View style={styles.headerSection}>
                    <Text style={styles.cityTitle}>{city}, {state}</Text>
                    <Text style={styles.weatherTitle}>{periodName}: {shortForecast}</Text>
                </View>
                <View style={styles.forecastBlock}>
                    <Text style={styles.text}>Temperature: {temperature} &#176;{tempUnit}</Text>
                    <Text style={styles.text}>Wind speed: {windSpeed} {windDirection}</Text>
                    <Text style={styles.text}>Chance of precipitation: {rainChance}</Text>
                    <Text style={styles.text}>Forecast: {detailedForecast}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        width: '100%',
        padding: 20,
        paddingTop: 40,
        margin: 0,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    cityTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    weatherTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    forecastBlock: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
});
