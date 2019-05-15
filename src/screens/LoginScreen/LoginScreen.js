import React from "react";
import { View, Image, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import styles from './styles';
import translate from '@translate'
import Auth0 from 'react-native-auth0';

var credentials = require('../../auth0-credentials');
const auth0 = new Auth0(credentials);

export default class Login extends React.Component {

    static navigationOptions = {
        headerMode: 'none',
    }

    constructor(props) {
        super(props);
        this.state = { username: "", password: "", usernameError: false, passwordError: false, validationText: "", loading: false }
        this.realmLogin = this.realmLogin.bind(this)
    }

    realmLogin(username, password) {
        auth0.auth
            .passwordRealm({
                username: username,
                password: password,
                realm: 'Username-Password-Authentication',
                scope: 'openid profile email',
                audience: 'https://' + credentials.domain + '/userinfo'
            })
            .then(credentials => {
                this.setState({ loading: false })
                this.props.navigation.navigate("App")
            })
            .catch(error => {
                this.setState({ validationText: error.json.error_description, loading: false })
            });
    }

    validateLogin = () => {

        if (!this.state.username.length) {
            this.setState({
                validationText: translate.t("Username Empty Validation"),
                usernameError: true
            })
        }
        else if (!this.state.password.length) {
            this.setState({
                validationText: translate.t("Username Empty Validation"),
                passwordError: true
            })
        }
        else {
            this.setState({ usernameError: false, passwordError: false, validationText: "", loading: true })
            this.realmLogin(this.state.username, this.state.password)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <View style={styles.logoContainer}>
                        <Image source={require("../../assets/icons/Contoso.png")} />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder={translate.t("Username Placeholder")}
                            placeholderTextColor="rgba(44,44,44,0.4)"
                            returnKeyType="next"
                            onSubmitEditing={() => this.passwordInput.focus()}
                            style={[styles.input, this.state.usernameError && styles.inputError]}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(text) => this.setState({ username: text.trim() })}
                        />
                        <TextInput
                            placeholder={translate.t("Password Placeholder")}
                            placeholderTextColor="rgba(44,44,44,0.4)"
                            secureTextEntry
                            returnKeyType="go"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={[styles.input, this.state.passwordError && styles.inputError]}
                            ref={(input) => this.passwordInput = input}
                            onChangeText={(text) => this.setState({ password: text.trim() })}
                        />
                        <View style={styles.validationContainer}>
                            <Text style={styles.validationText}>{this.state.validationText}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => this.validateLogin()}
                        >
                            <View style={styles.buttonContainer}>
                                {
                                    this.state.loading &&
                                    <ActivityIndicator color="white" size="large" />
                                }
                                {
                                    !this.state.loading &&
                                    <Text style={styles.button}>{translate.t("Login Button Text")}</Text>
                                }                                
                            </View>
                        </TouchableOpacity>
                        <View style={styles.linkButtonContainer}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Register')}
                            >
                                <Text style={styles.linkButton}>{translate.t("Register Button Text")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}