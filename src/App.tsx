import React , { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Config from "react-native-config";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import 'react-native-reanimated';
import { LogBox } from 'react-native';

import Store from './Store/Store';
import Routing from './Routing/Routing';

/*
 * Error stupid warning react-native-gesture-handler
 **/
LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const store = createStore(Store);

const App: React.FC = () => {

    useEffect(() => {
        // console.log('Config: ',Config);
    },[]);

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Routing />
            </NavigationContainer>
        </Provider>
    );
}
export default App;