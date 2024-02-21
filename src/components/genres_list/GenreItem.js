import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from "react-native";
import React, { useState } from "react";
import { toggleGenre } from "../../redux";
import { useDispatch } from "react-redux"

const GenreItem = ({ item, setUserChoice }) => {
    const dispatch = useDispatch()
    const [isActive, setIsActive] = useState(item.active)
    return (<TouchableOpacity onPress={() => { dispatch(toggleGenre({ genreId: item.id })); setIsActive(!isActive) }}>
        <View style={[styles.userElement, { backgroundColor: isActive ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.15)' }]}>
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
