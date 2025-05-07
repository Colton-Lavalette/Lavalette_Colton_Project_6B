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
                if (!response.ok) throw new Error('Failed to fetch forecast data');

                const json = await response.json();
                const periods = json.properties.periods;
                const sliceEnd = periods[0].name === 'Tonight' ? 3 : 4;
                const forecastSlice = periods.slice(0, sliceEnd);
                setData(forecastSlice);
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
