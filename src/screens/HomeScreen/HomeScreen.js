import React from "react";
import { View, Image, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import translate from '@translate'

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.getDate = this.getDate.bind(this)
        this.getTime = this.getTime.bind(this)
    }

    getDate = () => {
        var date = new Date();
        var n = date.toDateString();

        return n
    }

    getTime = () => {
        var date = new Date();
        var time = date.toLocaleTimeString();

        return time
    }

    render() {
        var date = this.getDate()
        var time = this.getTime()
        return (
            <View style={styles.container}>
                <View style={styles.headerStyle}>
                    <Text style={styles.headerTextStyle}>{translate.t("Home Screen Title")}</Text>
                </View>
                <View style={styles.mainContainer}>
                    <View style={styles.logoContainer}>
                        <Image source={require("../../assets/icons/Contoso.png")} />
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.textContainer1}>
                            <Text style={styles.homeTextStyle}>{translate.t("Welcome to Contoso")}</Text>
                            <Text style={styles.homeTextStyle}>{translate.t("Adventures App")}</Text>
                        </View>
                        <View style={styles.textContainer2}>
                            <Text style={[styles.homeTextStyle, styles.boldText]}>{translate.t("Today is")}</Text>
                            <Text style={styles.homeTextStyle}>{date}</Text>
                            <Text style={styles.homeTextStyle}>{time}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("Auth")}
                        >
                            <View style={styles.buttonContainer}>
                                <Text style={styles.button}>{translate.t("Logout Button Text")}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}