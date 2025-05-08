import React, {useState, useEffect, useCallback} from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View, } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useForecast } from '@/hooks/useForecast';
import WeatherCard from '@/components/WeatherCard';

export default function SearchScreen() {
    const [selectedValue, setSelectedValue] = useState('Burlington, VT');
    const [open, setOpen] = useState(false);
    const [cityData, setCityData] = useState<any>(null);

    const items = [
        { label: 'Burlington, VT', value: 'Burlington, VT' },
        { label: 'New York, NY', value: 'New York, NY' },
        { label: 'Boston, MA', value: 'Boston, MA' },
        { label: 'Orlando, FL', value: 'Orlando, FL' },
        { label: 'Chicago, IL', value: 'Chicago, IL' },
        { label: 'Washington, DC', value: 'Washington, DC' },
        { label: 'Atlanta, GA', value: 'Atlanta, GA' },
        { label: 'Seattle, WA', value: 'Seattle, WA' },
        { label: 'San Francisco, CA', value: 'San Francisco, CA' },
        { label: 'Los Angeles, CA', value: 'Los Angeles, CA' },
    ];

    const getCityData = useCallback((city: string) => {
        const cityGridData = [
            { city: "Burlington", office: "BTV", gridX: 89, gridY: 56, state: "VT" },
            { city: "New York", office: "OKX", gridX: 33, gridY: 35, state: "NY" },
            { city: "Boston", office: "BOX", gridX: 71, gridY: 90, state: "MA" },
            { city: "Orlando", office: "MLB", gridX: 26, gridY: 68, state: "FL" },
            { city: "Chicago", office: "LOT", gridX: 76, gridY: 73, state: "IL" },
            { city: "Washington", office: "LWX", gridX: 96, gridY: 72, state: "DC" },
            { city: "Atlanta", office: "FFC", gridX: 51, gridY: 87, state: "GA" },
            { city: "Seattle", office: "SEW", gridX: 125, gridY: 68, state: "WA" },
            { city: "San Francisco", office: "MTR", gridX: 85, gridY: 105, state: "CA" },
            { city: "Los Angeles", office: "LOX", gridX: 155, gridY: 45, state: "CA" },
        ];
        return cityGridData.find(item => item.city === city);
    }, []);

    useEffect(() => {
        const cityName = selectedValue.split(',')[0];
        const data = getCityData(cityName);
        setCityData(data);
    }, [selectedValue, getCityData]);

    const {
        data: forecastData,
        loading: isLoadingForecast,
        error: forecastError,
    } = useForecast(
        cityData?.office,
        cityData?.gridX,
        cityData?.gridY
    );

    const [windowWidth, setWindowWidth] = useState(
        Dimensions.get('window').width
    );

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', () => {
            setWindowWidth(Dimensions.get('window').width);
        });

        return () => {
            subscription.remove();
        };
    }, []);

    if (forecastError) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{forecastError}</Text>
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

    const containerWidth =
        windowWidth > 600 ? windowWidth * 0.5 : windowWidth * 0.9;

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.dropdownSection}>
                <Text style={styles.label}>Choose a city:</Text>
                <DropDownPicker<string>
                    open={open}
                    value={selectedValue}
                    items={items}
                    setOpen={setOpen}
                    setValue={setSelectedValue}
                    onChangeValue={(val) => val && setSelectedValue(val)}
                    containerStyle={styles.dropdownContainer}
                    style={styles.dropdown}
                    placeholder="Select a city"
                    zIndex={1000}
                    zIndexInverse={1000}
                />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {forecastData.map((forecast: any, index: number) => (
                    <WeatherCard
                        key={index}
                        city={cityData.city}
                        state={cityData.state}
                        forecast={forecast}
                        containerWidth={containerWidth}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    dropdownSection: {
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: '#fff',
        zIndex: 1000,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        padding: 5,
    },
    dropdownContainer: {
        marginBottom: 20,
        zIndex: 1000,
    },
    dropdown: {
        backgroundColor: '#fafafa',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 100,
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
});