import { StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import PulsePlayer from './pulsePostPlayer'
import { Audio } from "expo-av";



const PostPlayer = ({ audio }) => {
    const [sound, setSound] = useState();
    const [playingStatus, setPlayingStatus] = useState({});
    const [playingNow, setPlayingNow] = useState(null);
    const [playbackPosition, setPlaybackPosition] = useState(0);


    const setPlayer = async () => {
        await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            staysActiveInBackground: true,
        });
    };

    useEffect(() => {
        setPlayer();
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]);

    useEffect(() => {
        const onPlaybackStatusUpdate = async (status) => {
            if (status.didJustFinish) {
                setPlaybackPosition(0);
                await sound.setPositionAsync(0);
                // setPlayingStatus(false);
            } else {
                setPlaybackPosition(status.positionMillis);
            }
        };

        if (sound) {
            sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        }
    }, [sound]);


    async function toggleSound(id, url) {
        const isCurrentlyPlaying = playingStatus[id] || false;
        if (isCurrentlyPlaying) {
            await stopSound();
        } else {
            if (sound) {
                await stopSound();
            }
            await playSound(id, url);
        }
        setPlayingStatus((prevState) => ({
            ...prevState,
            [id]: !isCurrentlyPlaying,
        }));
    }

    const onPostSliderValueChange = async (id, position) => {
        setPlaybackPosition(position);
        if (sound) {
            await sound.setPositionAsync(position);
        }
    };

    async function playSound(id, url) {
        setPlaybackPosition(0);
        if (sound) {
            await sound.unloadAsync(); // Make sure to unload any previously loaded sound
        }
        const { sound: newSound } = await Audio.Sound.createAsync({ uri: url });
        setSound(newSound);
        setPlayingStatus((prevState) => ({
            ...prevState,
            [id]: true,
        }));

        await newSound.playAsync();
    }

    async function stopSound() {
        await sound.stopAsync();
        setSound(null);
        setPlayingStatus((prevState) => {
            const newState = { ...prevState };
            Object.keys(newState).forEach((key) => (newState[key] = false));
            return newState;
        });
    }
    return (
        <View key={audio.id} style={styles.postComponent}>
            <PulsePlayer
                data={audio}
                toggleSound={toggleSound}
                playbackPosition={playbackPosition}
                onPostSliderValueChange={onPostSliderValueChange}
                sound={sound}
                isPlaying={playingStatus[audio.id]}
                playingNow={playingNow}
                id={audio.id}
            />
        </View>
    )
}

export default PostPlayer

const styles = StyleSheet.create({
    postComponent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
})