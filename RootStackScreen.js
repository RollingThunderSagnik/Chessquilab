import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Doorway from './Doorway';
import Menu from './Menu';
import Chessboard from './Chessboard';
import Login from './Login';

const Stack = createStackNavigator();

const RootStackScreen = () => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name="Doorway" component={Doorway}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Chessboard" component={Chessboard} />
    </Stack.Navigator>
);


export default RootStackScreen;