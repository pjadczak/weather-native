import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';


import SplashScreen from '../screens/SplashScreen/SplashScreen';
import Settings from '../screens/Settings/Settings';
import About from '../screens/About/About';
import DrawerMenu from '../Drawer/Drawer';
import Home from '../screens/Home/Home';

type RootStackParamList = {
    Home: React.FC;
    About: React.FC;
    Settings: React.FC;
    SplashScreen: React.FC;
};

const Drawer = createDrawerNavigator<RootStackParamList>();

const Routing: React.FC = (props) => {

    return (
        <Drawer.Navigator 
            initialRouteName="SplashScreen"
            screenOptions={{ headerShown: false }}
            drawerContent={() => <DrawerMenu {...props} />}
        >
            <Drawer.Screen name="SplashScreen" component={SplashScreen} />
            <Drawer.Screen name="Settings" component={Settings} />
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="About" component={About} />
        </Drawer.Navigator>
    );
}

export default Routing;