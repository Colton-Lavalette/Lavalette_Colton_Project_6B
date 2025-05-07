import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useGeolocation } from '@/hooks/useGeolocation';
import { usePoints } from '@/hooks/usePoints';
import { useForecast } from '@/hooks/useForecast';
import WeatherCard from '@/components/WeatherCard';

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

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', () => {
            setWindowWidth(Dimensions.get('window').width);
        });

        return () => {
            subscription.remove();
        };
    }, []);

    if (geolocationError || pointsError || forecastError) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>
                    {geolocationError || pointsError || forecastError}
                </Text>
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

    const containerWidth = windowWidth > 600 ? windowWidth * 0.5 : windowWidth * 0.9;
    const paddingTop = windowWidth < 600 ? 75 : 20;

    return (
        <ScrollView contentContainerStyle={[styles.scrollContainer, { paddingTop }]}>
            {forecastData.map((forecast: any, index: number) => (
                <WeatherCard
                    key={index}
                    city={pointsData.city}
                    state={pointsData.state}
                    forecast={forecast}
                    containerWidth={containerWidth}
                />
            ))}
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
        alignItems: 'center',
        paddingVertical: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
});
