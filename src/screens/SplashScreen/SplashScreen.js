import React from "react";
import { View, YellowBox, Text } from 'react-native';
import translate from '@translate'
import styles from './styles';

export default class Splash extends React.Component {

    constructor(props) {
        super(props);        
        this.loadInitialScreen();
        YellowBox.ignoreWarnings(["Warning: isMounted"])
    }

    loadInitialScreen = async () => {        
        this.props.navigation.navigate('Auth');
    };

    render() {
        return (
            <View style={{flex: 1}}>                
                <Text>{translate.t("Contoso Title")}</Text>                
            </View>
        );
    }

}
