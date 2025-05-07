import { useEffect, useState } from 'react';

export const useForecast = (office?: string, gridX?: number, gridY?: number) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (office === undefined || gridX === undefined || gridY === undefined) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://api.weather.gov/gridpoints/${office}/${gridX},${gridY}/forecast`);
                if (!response.ok) {
                    throw new Error('Failed to fetch forecast data');
                }
                const json = await response.json();
                setData({
                    temperature: json.properties.periods[0].temperature,
                    tempUnit: json.properties.periods[0].temperatureUnit,
                    windSpeed: json.properties.periods[0].windSpeed,
                    windDirection: json.properties.periods[0].windDirection,
                    periodName: json.properties.periods[0].name,
                    rainChance: json.properties.periods[0].probabilityOfPrecipitation.value,
                    shortForecast: json.properties.periods[0].shortForecast,
                    detailedForecast: json.properties.periods[0].detailedForecast,
                });
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [office, gridX, gridY]);

    return { data, loading, error };
};
