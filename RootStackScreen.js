import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Doorway from './Doorway';
import ChessScreen from './Chessboard';
import Login from './Login';
import SignUp from './SignUp';
import UserPage from './UserPage';
import MenuModal from './MenuModal';

const Stack = createStackNavigator();

const RootStackScreen = () => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name="Doorway" component={Doorway}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="MenuModal" component={MenuModal}/>
        <Stack.Screen name="Userpage" component={UserPage}/>
        <Stack.Screen name="Chessboard" component={ChessScreen}/>
    </Stack.Navigator>
);


export default RootStackScreen;