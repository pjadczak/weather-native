import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';
import { createStore } from 'redux';
import React from 'react';

import 'react-native-reanimated';

import Routing from './Routing/Routing';
import Store from './Store/Store';

/*
 * Error stupid warning react-native-gesture-handler
 **/
LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const store = createStore(Store);

const App: React.FC = () => {

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Routing />
            </NavigationContainer>
        </Provider>
    );
}
export default App;