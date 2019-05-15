import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    mainContainer: {
        flex: 1
    },
    inputContainer: {
        flexDirection: 'column',
        paddingLeft: 20,
        paddingRight: 20,
        paddingVertical: 40
    },
    logoContainer: {
        alignItems: 'center',
        paddingVertical: 80
    },
    input: {
        height: 50,
        backgroundColor: '#FFFFFF',
        marginBottom: 15,
        color: '#333333',
        paddingHorizontal: 10,
        borderColor: '#eaeaea',
        borderWidth: 1.0
    },
    inputError: {
        borderColor: '#ff0000'
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: '#5a9bd3',
        paddingVertical: 30,
        justifyContent: 'center'
    },
    button: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: '400',
        fontSize: 18
    },
    linkButton: {
        textAlign: 'center',
        color: '#5a9bd3',
        fontWeight: '400',
        fontSize: 18
    },
    linkButtonContainer: {
        paddingTop: 10
    },
    validationContainer: {
        alignItems: 'center',
        paddingBottom: 10
    },
    validationText: {
        color: '#FF0000'
    }
});
