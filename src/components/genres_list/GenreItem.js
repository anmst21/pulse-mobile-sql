import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from "react-native";
import React, { useState } from "react";

const GenreItem = ({ item }) => {
    const [active, setActive] = useState(false)
    return (<TouchableOpacity onPress={() => setActive(!active)}>
        <View style={[styles.userElement, { backgroundColor: active ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.15)' }]}>
            <Text style={styles.itemText}>{item.name}</Text>
        </View>
    </TouchableOpacity>

    );
};

export default GenreItem;

const styles = StyleSheet.create({

    userElement: {
        marginRight: 15,
        marginTop: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 20,
        flexShrink: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    itemText: {
        fontSize: 16,
        color: "white",
    },
});
