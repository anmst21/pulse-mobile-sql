import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    Easing,
} from "react-native-reanimated";


const RenderSkeleton = ({ name, count }) => {

    const opacity1 = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity1.value,
        };
    });

    useEffect(() => {
        const animation = withRepeat(
            withTiming(1, {
                duration: 1000,
                easing: Easing.linear,
            }),
            -1, // Infinite repeat
            true, // Reverse on each iteration, set to false if you do not want the animation to reverse
        );

        opacity1.value = animation;

        // Cleanup function
        return () => {
            opacity1.value = undefined; // Attempt to halt the animation
            // Alternatively, directly stop the animation if there's a specific method or reset it as needed.
        };
    }, []);

    const widthArray = [80, 100, 130, 80, 80, 130, 130, 130, 90, 70, 80, 80]


    return (
        <>
            {name === "userElement" && <View style={{ marginTop: 20 }}>
                {Array.from({ length: count }, (_, index) => (
                    <Animated.View key={index} style={[styles.userElementLoader, animatedStyle]} />
                ))}
            </View>}
            {name === "genreList" && <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 15,
                marginTop: 15

                // backgroundColor: "blue"
            }}>
                {
                    widthArray.map((width, index) => (
                        <Animated.View
                            key={index}
                            style={[
                                styles.userElement,
                                animatedStyle,
                                { width, borderRadius: 100 }
                            ]}
                        />
                    ))
                }
            </View >}
            {
                name === "postList" && <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 15,


                    // backgroundColor: "blue"
                }}>
                    {

                        Array.from({ length: count }, (_, index) => (
                            <Animated.View
                                key={index}
                                style={[
                                    styles.userElement,
                                    animatedStyle,
                                    {
                                        height: 500, width: "100%", padding: 0, flexShrink: 0
                                    }
                                ]}
                            />
                        ))
                    }
                </View>
            }
            {
                name === "postWindowList" && <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    // gap: 10

                    //   backgroundColor: "blue"
                }}>
                    {

                        Array.from({ length: count }, (_, index) => (
                            <Animated.View
                                key={index}
                                style={[

                                    animatedStyle,
                                    {
                                        height: 250,
                                        marginBottom: 10,
                                        width: 200,
                                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                        borderRadius: 5,
                                        width: '48%',
                                    }
                                ]}
                            />
                        ))
                    }
                </View>
            }

        </>
    );
};

export default RenderSkeleton;

const styles = StyleSheet.create({
    itemsContainer: {
        flexDirection: 'row', // Lay out items in a row
        flexWrap: 'wrap', // Allow items to wrap
    },
    userElementLoader: {
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        marginBottom: 15,
        // marginHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 5
        // paddingTop: 5,

    },
    userElement: {
        // marginRight: 15,
        // marginTop: 15,

        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 10,
        flexShrink: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: 120,
        height: 40
    },
});


// <View style={[styles.userElement, { backgroundColor: isActive ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.15)' }]}>
//     <Text style={styles.itemText}>{item.name}</Text>
// </View>
//     </TouchableOpacity >

//     );
// };

// export default GenreItem;

// const styles = StyleSheet.create({

//     userElement: {
//         marginRight: 15,
//         marginTop: 15,
//         backgroundColor: 'rgba(255, 255, 255, 0.15)',
//         borderRadius: 20,
//         flexShrink: 1,
//         paddingHorizontal: 20,
//         paddingVertical: 10,
//     },
//     itemText: {
//         fontSize: 16,
//         color: "white",
//     },
// });

