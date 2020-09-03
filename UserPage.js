import React from 'react';
import { View, Text, StatusBar } from 'react-native';

import UserHeader from './UserHeader';

export default function UserPage() {
    return (
        <View>
            <StatusBar backgroundColor='black' barStyle="light-content" />
            <UserHeader/>
        </View>
    )
}
