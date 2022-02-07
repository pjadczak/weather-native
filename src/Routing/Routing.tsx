import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';


import SplashScreen from '../screens/SplashScreen/SplashScreen';
import Settings from '../screens/Settings/Settings';
import About from '../screens/About/About';
import Home from '../screens/Home/Home';
import DrawerMenu from '../Drawer/Drawer';
import { PropsHome } from '../screens/Home/Home';

type RootStackParamList = {
    Home: React.FC<PropsHome>;
    About: React.FC;
    Settings: React.FC;
    SplashScreen: React.FC;
};

const Drawer = createDrawerNavigator<RootStackParamList>();

const Routing: React.FC<DrawerContentComponentProps> = (props) => {

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