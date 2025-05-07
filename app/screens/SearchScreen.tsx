import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function SearchScreen() {
    const [selectedValue, setSelectedValue] = useState('Burlington, VT');
    const [open, setOpen] = useState(false);

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

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.label}>Choose an option:</Text>

                <DropDownPicker
                    open={open}
                    value={selectedValue}
                    items={items}
                    setOpen={setOpen}
                    setValue={setSelectedValue}
                    containerStyle={styles.dropdownContainer}
                    style={styles.dropdown}
                    placeholder="Select a city"
                />

                <Text style={styles.result}>You selected: {selectedValue}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        padding: 20,
        margin: 10,
        marginTop: 5,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    dropdownContainer: {
        marginBottom: 20,
    },
    dropdown: {
        backgroundColor: '#fafafa',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        zIndex: 1,
    },
    dropdownList: {
        backgroundColor: '#fafafa',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    result: {
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
    },
});
