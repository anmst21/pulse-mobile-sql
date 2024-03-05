import { StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback, Text, ScrollView, TextInput, Linking } from "react-native";
import React, { useState, useEffect } from "react";
import ProfilePicture from "../../components/profile_picture";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../components/text";
import sqlApi from "../../redux/axios/sqlApi"
import Icon from "../../components/icon"
import Button from "../../components/button";
import { useDispatch, useSelector } from "react-redux";
import * as Clipboard from "expo-clipboard";
import LineLoader from "../../components/line_loader"

import {
    editLink,
    closeLink,
    editBio,
    closeBio,
    editUserName,
    closeUserName,
    updateBio,
    updateUsername,
    updateLink,
    setImageMenuOpen
} from "../../redux"

import ImageModal from "../../components/image_modal";


const ChangeProfileImg = ({ userAudios, userInfo, userId, storedUserInfo }) => {
    const { id, image_link, username, bio, link: stateLink } = useSelector((state) => state.user.userInfo);
    const { imageStatus, isLoadingImage } = useSelector((state) => state.user);
    console.log("imageStatusimageStatusimageStatus", imageStatus)
    const initialLinkState = stateLink?.link === undefined ? "" : stateLink?.link
    const initialLinkNameState = stateLink?.linkName === undefined ? "" : stateLink?.linkName
    const initialBioState = bio === null ? "" : bio
    const { imageMenuOpen } = useSelector((state) => state.settings);

    const [userName, setUserName] = useState(username)
    const [linkName, setLinkName] = useState(initialLinkNameState)
    const [link, setLink] = useState(initialLinkState)
    const [userBio, setUserBio] = useState(initialBioState)
    const [error, setError] = useState(false)

    useEffect(() => {
        let timer;
        if (error) {
            timer = setTimeout(() => {
                setError(false);
            }, 3000);
        }


        return () => clearTimeout(timer);
    }, [error]);

    const { userNameEdit, linkEdit, bioEdit } = useSelector((state) => state.settings.profileEditState);

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            if (userNameEdit) {
                dispatch(closeUserName());
            }
            if (linkEdit) {
                dispatch(closeLink());
            }
            if (bioEdit) {
                dispatch(closeBio());
            }
        }
    }, [])

    const updateUserBio = (bioValue) => {
        if (bioValue !== bio) {
            dispatch(updateBio({ bio: bioValue }))
            console.log("Updated bio!")
        } else {
            setError("Everything is up to date")
        }
    }
    const updateUserName = (nameValue) => {
        if (nameValue !== username) {
            dispatch(updateUsername({ username: nameValue }))
            console.log("Updated bio!")
        } else {
            setError("Everything is up to date")
        }
    }
    const updateUserLink = (linkValue, linkNameValue) => {
        if (linkValue !== stateLink?.link && linkNameValue !== stateLink?.linkName) {
            Linking.canOpenURL(linkValue)
                .then((supported) => {
                    if (supported) {
                        dispatch(updateLink({
                            link: {
                                link: linkValue,
                                linkName: linkNameValue
                            }
                        }));
                        console.log("updateLink")
                    } else {
                        setError("Cannot open link");
                    }
                })
                .catch((err) => {
                    console.log("An error occurred", err);
                    setError("Invalid link format");
                });
        } else {
            setError("Everything is up to date");
        }
    };

    const handlePress = async () => {
        const link = await Clipboard.getStringAsync()
        setLink(link)
    }

    return (

        <View style={styles.container}>
            {isLoadingImage &&
                <LineLoader status={imageStatus} name="imgSettings" />

            }
            <View style={{
                marginHorizontal: 20,
                gap: 40,

            }}>

                <View style={{
                    flexDirection: "row",
                    //  backgroundColor: "blue",
                    alignItems: "center",
                    gap: 10,
                    zIndex: 9999
                }}>

                    <ProfilePicture userId={id} imageLink={image_link?.medium} width={70} />

                    {imageMenuOpen && <ImageModal imageLink={image_link?.medium} />}

                    <View style={[styles.commentContainer, { flex: 1 }]}>
                        <CustomText style={styles.inputLabel}>
                            User Name
                        </CustomText>
                        <TextInput
                            style={styles.input}
                            placeholder="User Name..."
                            value={userName}
                            onChangeText={text => setUserName(text)} // Update the state on input change
                            placeholderTextColor="gray"
                            multiline
                            maxLength={16}
                            editable={userNameEdit}

                        />
                        <CustomText style={styles.counter}>
                            {userName.length} / 16
                        </CustomText>
                    </View>
                    <TouchableOpacity onPress={() => {
                        userNameEdit ? dispatch(closeUserName()) : dispatch(editUserName())
                    }}>
                        <Icon name="pencilEdit" style={{ fill: userNameEdit ? "#fff" : "transparent", width: 16 }} />
                    </TouchableOpacity>

                </View>

                <View style={styles.link}>
                    <View style={{
                        flexDirection: "row",
                        //  backgroundColor: "blue",
                        alignItems: "center",
                        gap: 10,
                        flex: 2.5,

                    }}>

                        <Icon name="linkIcon" style={{ color: "#ABABAB", width: 20, }} />
                        <View style={{ flexDirection: "row", flex: 1, }}>
                            <View style={[styles.commentContainer, {
                                borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRightWidth: 1, flex: 1,
                            }]}>
                                <CustomText style={styles.inputLabel}>
                                    Link
                                </CustomText>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Title..."
                                    value={linkName}
                                    onChangeText={text => setLinkName(text)} // Update the state on input change
                                    placeholderTextColor="gray"
                                    multiline
                                    maxLength={14}
                                    editable={linkEdit}
                                />
                                <CustomText style={styles.counter}>
                                    {linkName.length} / 14
                                </CustomText>
                            </View>
                            <TouchableOpacity disabled={!linkEdit} onPress={handlePress} style={[styles.commentContainer, { flex: 1, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, paddingRight: 0 }]}>


                                <TextInput
                                    style={[styles.input, { width: "100%", top: 5, textDecorationLine: 'underline' }]}
                                    placeholder="URL..."
                                    value={link.replace(/^https?:\/\//, 'www.')}
                                    onChangeText={text => setLink(text)} // Update the state on input change
                                    placeholderTextColor="gray"
                                    maxLength={100}
                                    editable={false}
                                />

                                <CustomText style={styles.counter}>
                                    {link.length} / 100
                                </CustomText>
                            </TouchableOpacity>

                        </View>
                        <TouchableOpacity onPress={() => {
                            linkEdit ? dispatch(closeLink()) : dispatch(editLink())
                        }}>
                            <Icon name="pencilEdit" style={{ fill: linkEdit ? "#fff" : "transparent", width: 16 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    flexDirection: "row",
                    //  backgroundColor: "blue",
                    alignItems: "center",
                    gap: 10

                }}>
                    <Icon name="zapIcon" style={{ color: "#ABABAB", width: 20, }} />
                    <View style={[styles.commentContainer, { height: 100, flex: 1 }]}>
                        <CustomText style={styles.inputLabel}>
                            Bio
                        </CustomText>
                        <TextInput
                            style={[styles.input, { flex: 1 }]}
                            placeholder="Bio..."
                            value={userBio}
                            onChangeText={text => setUserBio(text)} // Update the state on input change
                            placeholderTextColor="gray"
                            multiline
                            maxLength={90}
                            editable={bioEdit}
                        />
                        {error &&
                            <CustomText style={styles.error}>
                                {error}
                            </CustomText>
                        }

                        <CustomText style={styles.counter}>
                            {userBio.length} / 90
                        </CustomText>
                    </View>
                    <TouchableOpacity onPress={() => {
                        bioEdit ? dispatch(closeBio()) : dispatch(editBio())
                    }}>
                        <Icon name="pencilEdit" style={{ fill: bioEdit ? "#fff" : "transparent", width: 16 }} />
                    </TouchableOpacity>

                </View>
                {(bioEdit || linkEdit || userNameEdit) &&
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        paddingHorizontal: 20,
                        zIndex: 1000
                        //   backgroundColor: "blue"
                    }}>
                        <Button
                            label={"Undo"}

                            onPressIn={() => {
                                dispatch(closeBio())
                                dispatch(closeLink())
                                dispatch(closeUserName())
                                setUserName(username)
                                setLinkName(initialLinkNameState)
                                setLink(initialLinkState)
                                setUserBio(initialBioState)
                            }}
                        />
                        <Button
                            label={"Save"}
                            grey
                            onPressIn={() => {

                                bioEdit && updateUserBio(userBio)
                                linkEdit && updateUserLink(link, linkName)
                                userNameEdit && updateUserName(userName)

                                dispatch(closeBio())
                                dispatch(closeLink())
                                dispatch(closeUserName())



                            }}
                        />
                    </View>
                }
            </View>
        </View >


    );
};

export default ChangeProfileImg;

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
    inputLabel: {
        position: "absolute",
        top: -20,
        fontSize: 12
    },
    link: {
        flexDirection: "row",
        //  marginTop: 10
        //  backgroundColor: "blue"
    },
    btnContainer: {
        //  backgroundColor: "blue",
        justifyContent: 'space-between',
        flexDirection: "row",
        alignItems: "center"
    },
    counter: {
        color: "rgba(31, 32, 34, 1)",
        fontSize: 12,
        position: "absolute",
        bottom: -20,
        right: 0

    },
    error: {
        color: "red",
        fontSize: 12,
        position: "absolute",
        bottom: -20,
        left: 0

    },
    input: {
        fontSize: 14,
        lineHeight: 22, color: "white",
        alignItems: "center",
        //   width: '100%',
        top: 2,
        //   height: 50

    },
    commentContainer: {

        //  marginTop: 20,
        //  padding: 10,
        //  marginHorizontal: 20,
        backgroundColor: "rgba(31, 32, 34, 0.5)",
        height: 40,
        borderRadius: 5,
        //  justifyContent: "center",
        paddingHorizontal: 10,
        //  paddingBottom: 20
    },

    container: {
        overflow: "hidden",
        position: "relative",
        paddingTop: 30,
        //  paddingHorizontal: 20,
        flexDirection: "column",
        marginLeft: 0,
        backgroundColor: "rgba(31, 32, 34, 0.6)",
        // paddingHorizontal: 10,
        borderRadius: 10,
        paddingVertical: 20,
        paddingBottom: 35,

        marginBottom: 20,
    },

});
