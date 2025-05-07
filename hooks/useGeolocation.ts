import { useState, useEffect } from "react";
import * as Location from 'expo-location';

export const useGeolocation = () => {
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setError('Permission to access location was denied');
                    return;
                }

                const { coords } = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High,
                });

                setLocation({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                });
            } catch (error) {
                setError('Failed to fetch location');
                console.error(error);
            }
        };

        fetchLocation();
    }, []);

    return { location, error };
}
