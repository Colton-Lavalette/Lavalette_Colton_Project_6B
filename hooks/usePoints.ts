import { useEffect, useState } from 'react';

export const usePoints = (latitude?: number, longitude?: number) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (latitude === undefined || longitude === undefined) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch point data');
                }
                const json = await response.json();
                setData({
                    office: json.properties.gridId,
                    gridX: json.properties.gridX,
                    gridY: json.properties.gridY,
                    city: json.properties.relativeLocation.properties.city,
                    state: json.properties.relativeLocation.properties.state,
                });
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [latitude, longitude]);

    return { data, loading, error };
};
