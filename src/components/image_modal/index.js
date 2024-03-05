import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from '../text'
import Icon from '../icon'
import { useDispatch, useSelector } from 'react-redux'
import { manipulateAsync } from 'expo-image-manipulator';
import * as ImagePicker from "expo-image-picker";
import { deleteImage, uploadImage, setImageLoader, setImageStatus, setImageMenuOpen } from "../../redux";


const ImageModal = ({ imageLink }) => {
    const dispatch = useDispatch()
    const img = useSelector((state) => state.user.userInfo?.image_link);
    // const { small, medium, large } = useSelector((state) => state.user.userInfo?.image_link);

    const pickImage = async () => {
        dispatch(setImageMenuOpen(false))

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });


        if (!result.canceled) {
            const sizes = [
                { width: 500, height: 500, key: 'large' },
                { width: 150, height: 150, key: 'medium' },
                { width: 100, height: 100, key: 'small' },
            ];

            // Initialize the uploadObject with keys for each size, starting with null values
            let uploadObject = {
                small: null,
                medium: null,
                large: null,
            };

            // Resize and process images
            for (const size of sizes) {
                const resizedImage = await manipulateAsync(
                    result.assets[0].uri,
                    [{ resize: { width: size.width, height: size.height } }],
                    { compress: 1, format: 'jpeg' }
                );
                const response = await fetch(resizedImage.uri);
                const fileContent = await response.arrayBuffer();

                // Assign the file content directly to the corresponding key in uploadObject
                uploadObject[size.key] = fileContent;
            }
            function removeBaseUrl(link) {
                if (img) {
                    const baseUrl =
                        "https://my-photo-bucket-111.s3.us-east-2.amazonaws.com/";
                    return link.replace(baseUrl, "");
                }
            }
            if (img) {
                dispatch(deleteImage({
                    keys: {
                        small: removeBaseUrl(img?.small),
                        medium: removeBaseUrl(img?.medium),
                        large: removeBaseUrl(img?.large),
                    }
                }));
            }
            //   setImage(result.assets[0].uri);
            dispatch(
                uploadImage({
                    blob: uploadObject,
                    callback: (value) => dispatch(setImageStatus(value)),
                })
            );
        }

    };

    const deleteImageAction = () => {
        dispatch(setImageMenuOpen(false))
        function removeBaseUrl(link) {
            if (link) {
                const baseUrl =
                    "https://my-photo-bucket-111.s3.us-east-2.amazonaws.com/";
                return link.replace(baseUrl, "");
            }
        }
        if (img) {
            dispatch(deleteImage({
                keys: {
                    small: removeBaseUrl(img?.small),
                    medium: removeBaseUrl(img?.medium),
                    large: removeBaseUrl(img?.large),
                }
            }));
        }
    }



    return (
        <View style={styles.modal}>
            <TouchableOpacity onPress={pickImage}>
                <View style={styles.modalItem}>
                    <Icon name="changeProfileIcon" style={{ width: 20 }} />
                    <CustomText style={{
                        fontSize: 14
                    }}>Change Profile Image</CustomText>
                </View>
            </TouchableOpacity>
            {img &&
                <TouchableOpacity onPress={deleteImageAction}>
                    <View style={styles.modalItem}>
                        <Icon
                            name="trashIcon"
                            style={{
                                color: "#F25219",
                                width: 20
                            }}
                        />
                        <CustomText style={{
                            fontSize: 14
                        }}>Delete Profile Image</CustomText>
                    </View>
                </TouchableOpacity>}
        </View>
    )
}

export default ImageModal

const styles = StyleSheet.create({
    modalItem: {
        flexDirection: "row",
        gap: 7,
        backgroundColor: "grey",
        paddingHorizontal: 5,
        paddingRight: 15,
        paddingVertical: 5,
        borderRadius: 3,
        alignItems: "center"
    },
    modal: {
        backgroundColor: "rgba(31, 32, 34, 1)",
        position: "absolute",
        bottom: -95,
        zIndex: 9999,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        gap: 5

    },
})