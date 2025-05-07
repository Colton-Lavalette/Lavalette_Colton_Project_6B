import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type WeatherDataProps = {
    city: string;
    state: string;
    forecast: {
        shortForecast: string;
        temperature: number;
        temperatureUnit: string;
        windSpeed: string;
        windDirection: string;
        name: string;
        probabilityOfPrecipitation: { value: number | null };
        detailedForecast: string;
    };
    containerWidth: number;
};

export default function WeatherCard({
                                        city,
                                        state,
                                        forecast,
                                        containerWidth,
                                    }: WeatherDataProps) {
    const {
        shortForecast,
        temperature,
        temperatureUnit,
        windSpeed,
        windDirection,
        name: periodName,
        probabilityOfPrecipitation,
        detailedForecast,
    } = forecast;

    const rainChance = probabilityOfPrecipitation?.value ?? 0;

    return (
        <View style={[styles.textContainer, { width: containerWidth }]}>
            <View style={styles.headerSection}>
                <Text style={styles.cityTitle}>{city}, {state}</Text>
                <Text style={styles.weatherTitle}>{periodName}: {shortForecast}</Text>
            </View>
            <View style={styles.forecastBlock}>
                <Text style={styles.text}>Temperature: {temperature} &#176;{temperatureUnit}</Text>
                <Text style={styles.text}>Wind speed: {windSpeed} {windDirection}</Text>
                <Text style={styles.text}>Chance of precipitation: {rainChance}%</Text>
                <Text> </Text>
                <Text> </Text>
                <Text style={styles.text}>Forecast: {detailedForecast}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
        minHeight: 300,
        overflow: 'hidden',
        marginBottom: 20,
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
