import React from "react";
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import styles from './styles';
import translate from '@translate'
import Auth0 from 'react-native-auth0';

var credentials = require('../../auth0-credentials');
const auth0 = new Auth0(credentials);

export default class Login extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
            email: "",
            usernameError: false,
            passwordError: false,
            emailError: false,
            validationText: "",
            loading: false
        }

        this.createUser = this.createUser.bind(this)
    }

    createUser(username, email, password) {
        auth0.auth
            .createUser({
                username: username,
                email: email,
                password: password,
                connection: 'Username-Password-Authentication',
            })
            .then(success => {
                this.setState({ loading: false })
                this.props.navigation.navigate("Login")
            })
            .catch(error => {
                this.setState({ validationText: error.json.description, loading: false })
            });
    }

    validateSignup = () => {
        if (!this.state.username.length) {
            this.setState({ usernameError: true, validationText: translate.t("Username Empty Validation") })
        }
        else if (!this.state.email.length) {
            this.setState({ emailError: true, validationText: translate.t("Email Empty Validation") })
        }
        else if (!(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email))) {
            this.setState({ emailError: true, validationText: translate.t("Email Valid Validation") })
        }
        else if (!this.state.password.length) {
            this.setState({ passwordError: true, validationText: translate.t("Username Empty Validation") })
        }
        else if (this.state.password.length < 8) {
            this.setState({ passwordError: true, validationText: "The Password should be atleast 8 characters long" })
        }
        else {
            this.setState({ usernameError: false, passwordError: false, emailError: false, validationText: "", loading: true })
            this.createUser(this.state.username, this.state.email, this.state.password)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.headerText}>{translate.t("Registration Screen Title")}</Text>
                    </View>
                    <TextInput
                        placeholder={translate.t("Username Placeholder")}
                        placeholderTextColor="rgba(44,44,44,0.4)"
                        returnKeyType="next"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        style={[styles.input, this.state.usernameError && styles.inputError]}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({ username: text.trim() })}
                    />
                    <TextInput
                        placeholder={translate.t("Email Placeholder")}
                        placeholderTextColor="rgba(44,44,44,0.4)"
                        returnKeyType="next"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        style={[styles.input, this.state.emailError && styles.inputError]}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({ email: text.trim() })}
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
                        onPress={() => this.validateSignup()}
                    >
                        <View style={styles.buttonContainer}>
                            {
                                this.state.loading &&
                                <ActivityIndicator color="white" size="large" />
                            }
                            {
                                !this.state.loading &&
                                <Text style={styles.button}>{translate.t("Register Button Text")}</Text>
                            }                            
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
