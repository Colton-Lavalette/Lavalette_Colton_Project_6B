import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useGeolocation } from '@/hooks/useGeolocation';
import { usePoints } from '@/hooks/usePoints';
import { useForecast } from '@/hooks/useForecast';
import WeatherCard from '@/components/WeatherCard'; // Import the WeatherCard component

export default function HomeScreen() {
    const { location, error: geolocationError } = useGeolocation();

    const { data: pointsData, loading: isLoadingPoints, error: pointsError } = usePoints(
        location?.latitude,
        location?.longitude
    );

    const { data: forecastData, loading: isLoadingForecast, error: forecastError } = useForecast(
        pointsData?.office,
        pointsData?.gridX,
        pointsData?.gridY
    );

    const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
    const [windowHeight, setWindowHeight] = useState(Dimensions.get('window').height);

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', () => {
            setWindowWidth(Dimensions.get('window').width);
            setWindowHeight(Dimensions.get('window').height);
        });

        return () => {
            subscription.remove(); // Correct way to clean up
        };
    }, []);

    if (geolocationError) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{geolocationError}</Text>
            </View>
        );
    }

    if (pointsError) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{pointsError}</Text>
            </View>
        );
    }

    if (forecastError) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{forecastError}</Text>
            </View>
        );
    }

    if (isLoadingPoints || !pointsData) {
        return (
            <View style={styles.container}>
                <Text>Loading point data...</Text>
            </View>
        );
    }

    if (isLoadingForecast || !forecastData) {
        return (
            <View style={styles.container}>
                <Text>Loading forecast data...</Text>
            </View>
        );
    }

    const {
        temperature,
        tempUnit,
        windSpeed,
        windDirection,
        periodName,
        rainChance,
        shortForecast,
        detailedForecast
    } = forecastData || {};

    const containerWidth = windowWidth > 600 ? windowWidth * 0.5 : windowWidth * 0.9;
    const containerHeight = windowWidth > 600 ? windowHeight * 0.45 : windowHeight * 0.5;

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <WeatherCard
                city={pointsData.city}
                state={pointsData.state}
                shortForecast={shortForecast}
                temperature={temperature}
                tempUnit={tempUnit}
                windSpeed={windSpeed}
                windDirection={windDirection}
                rainChance={rainChance}
                detailedForecast={detailedForecast}
                periodName={periodName}
                containerWidth={containerWidth}
                containerHeight={containerHeight}
            />
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
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
});
