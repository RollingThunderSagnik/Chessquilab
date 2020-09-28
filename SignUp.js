import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {f, auth, database} from './config/config';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import Popover, { PopoverMode, PopoverPlacement } from 'react-native-popover-view';
import { DotsLoader } from 'react-native-indicator';

const SignUp = ({ navigation }) => {

    let [fontsLoaded] = useFonts({
		'Carme': require('./assets/fonts/Carme-Regular.ttf'),
        'Monoton': require('./assets/fonts/Monoton-Regular.ttf'),
        'Helvetica-Light': require('./assets/fonts/HelveticaNeue-Light.ttf')
    });

    const [data, setData] = useState({
        fullname: '',
        email: '',
        password: '',
        confirm_password: '',
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        signedUp: false,
        showPopoverFullName: false,
        showPopoverEmail: false,
        showPopoverConfirmPassword: false,
        error: 'Invalid Input',
        loading: false
    });

    const SignUpUser = async(email, password, confirm_password, fullname) => {
        if (fullname != ''){
            if(password === confirm_password){
                if (email != '' && password != '' && email.includes('@') && password.length >= 8 && email.includes('.')){                
                    setData({
                        ...data,
                        loading: true
                    });
                    await auth.createUserWithEmailAndPassword(email, password)
                    .then((result) => {
                        return result.user.updateProfile({
                            displayName: fullname
                        })
                    })
                    .then(() => console.log(auth.currentUser.displayName))
                    .then(() => {database.ref('users/' + auth.currentUser.uid + '/name').set(fullname)})
                    .then(() => {database.ref('users/' + auth.currentUser.uid + '/online').set(true)})
                    .then(() => {database.ref('users/' + auth.currentUser.uid + '/won').set(0)})
                    .then(() => {database.ref('users/' + auth.currentUser.uid + '/matches').set(0)})
                    .catch((error) => console.log('error logging in', error)); 
                    f.auth().onAuthStateChanged(function(user) {
                        if(user){
                            setData({
                                ...data,
                                signedUp: true
                            })
                        }
                    });
                    
                } else {
                    setData({
					    ...data,
                        signedUp: false,
                        showPopoverEmail: true,
                        error: 'Invalid Username or Password'
                    });
                    //alert('Invalid Username or Password');
                }
            } else {
                setData({
                    ...data,
                    signedUp: false,
                    showPopoverConfirmPassword: true,
                    error: 'Passwords do not match'
                });
                //alert('Passwords do not match');
            }
        } else {
            setData({
                ...data,
                signedUp: false,
                showPopoverFullName: true,
                error: 'User must add their name'
            });
            //alert('User must add their name');
        }
    };

    if (data.signedUp === true){
        navigation.navigate('Userpage');
    }

    const textInputChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                email: val,
            });
        } else {
            setData({
                ...data,
                email: val,
            });
        }
    }

    const fullnameInputChange = (val) => {
        setData({
            ...data,
            fullname: val
        });
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    if (!fontsLoaded) {
		return <AppLoading />;

	} else {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'black'
                }}
            >
                <View
                    style={{ paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}
                >
                    <FontAwesome
                        name="user-o"
                        color="white"
                        size={20}
                    />
                    <Popover
                        popoverStyle={{
                            padding: 20,
                            borderRadius: 22,
                            backgroundColor: 'white',
                        }}
                        backgroundStyle={{
                            backgroundColor: 'rgba(0,0,0,0.9)'
                        }}
                        mode={PopoverMode.TOOLTIP}
                        placement={PopoverPlacement.TOP}
                        isVisible={data.showPopoverFullName}
                        from={(
                        <TextInput
                            placeholder='Full Name'
                            placeholderTextColor = "#ccc"
                            style={{
                                color: 'white',
                                fontFamily: 'Carme',
                                flex: 0.8,
                                marginLeft: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: 'white',
                            }}
                            keyboardType='default'
                            selectionColor='white'
                            autoCapitalize='none'
                            onChangeText={(val) => fullnameInputChange(val)}
                        />   
                        )}
                    >
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontFamily: 'Carme'}}>{data.error}</Text>
                        <TouchableOpacity style={{paddingLeft: 20, alignItems: 'center', marginTop: -2.5}} onPress={() => setData({...data, showPopoverFullName: false})}>
                            <Feather name="x" stroke-width={3} size={20} color="black" />
                        </TouchableOpacity>
                        </View>
                    </Popover>                 
                </View>

                <View
                    style={{ paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}
                >
                    <FontAwesome
                        name="user-o"
                        color="white"
                        size={20}
                    />
                    <Popover
                        popoverStyle={{
                            padding: 20,
                            borderRadius: 22,
                            backgroundColor: 'white',
                        }}
                        backgroundStyle={{
                            backgroundColor: 'rgba(0,0,0,0.9)'
                        }}
                        mode={PopoverMode.TOOLTIP}
                        placement={PopoverPlacement.TOP}
                        isVisible={data.showPopoverEmail}
                        from={(
                        <TextInput                        
                            placeholder='Email Address'
                            placeholderTextColor = "#ccc"
                            style={{
                                color: 'white',
                                fontFamily: 'Carme',
                                flex: 0.8,
                                marginLeft: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: 'white',
                            }}
                            keyboardType='default'
                            selectionColor='white'
                            autoCapitalize='none'
                            onChangeText={(val) => textInputChange(val)}
                        />
                        )}
                    >
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontFamily: 'Carme'}}>{data.error}</Text>
                        <TouchableOpacity style={{paddingLeft: 20, alignItems: 'center', marginTop: -2.5}} onPress={() => setData({...data, showPopoverEmail: false})}>
                            <Feather name="x" stroke-width={3} size={20} color="black" />
                        </TouchableOpacity>
                        </View>
                    </Popover>
                                        
                </View>

                <View
                    style={{ paddingVertical: 10, flexDirection: 'row',  justifyContent: 'space-evenly', alignItems: 'center'}}
                >
                    <Feather
                        name='lock'
                        color='white'
                        size={20}
                    />                    
                    <TextInput
                        placeholder='Password'
                        placeholderTextColor = "#ccc"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={{
                            color: 'white',
                            flex: 0.8,
                            fontFamily: 'Carme',
                            marginLeft: 10,
                            marginRight: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: 'white'
                        }}
                        keyboardType='default'
                        selectionColor='white'
                        autoCapitalize='none'
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="white"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="white"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>

                <View
                    style={{ paddingVertical: 10, flexDirection: 'row',  justifyContent: 'space-evenly', alignItems: 'center'}}
                >
                    <Feather
                        name='lock'
                        color='white'
                        size={20}
                    />            
                    <Popover
                        popoverStyle={{
                            padding: 20,
                            borderRadius: 22,
                            backgroundColor: 'white',
                        }}
                        backgroundStyle={{
                            backgroundColor: 'rgba(0,0,0,0.9)'
                        }}
                        mode={PopoverMode.TOOLTIP}
                        placement={PopoverPlacement.TOP}
                        isVisible={data.showPopoverConfirmPassword}
                        from={(        
                        <TextInput
                            placeholder='Confirm Password'
                            placeholderTextColor = "#ccc"
                            secureTextEntry={data.confirm_secureTextEntry ? true : false}
                            style={{
                                color: 'white',
                                flex: 0.8,
                                fontFamily: 'Carme',
                                marginLeft: 10,
                                marginRight: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: 'white'
                            }}
                            keyboardType='default'
                            selectionColor='white'
                            autoCapitalize='none'
                            onChangeText={(val) => handleConfirmPasswordChange(val)}
                        />
                        )}
                    >
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontFamily: 'Carme'}}>{data.error}</Text>
                        <TouchableOpacity style={{paddingLeft: 20, alignItems: 'center', marginTop: -2.5}} onPress={() => setData({...data, showPopoverConfirmPassword: false})}>
                            <Feather name="x" stroke-width={3} size={20} color="black" />
                        </TouchableOpacity>
                        </View>
                    </Popover>
                    <TouchableOpacity
                        onPress={updateConfirmSecureTextEntry}
                    >
                        {data.confirm_secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="white"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="white"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>
                
                <View>
                {
                    data.loading ?
                    <View
                        style={{                                                     
                            paddingHorizontal: 47,
                            padding: 10,
                            margin: 10,                            
                            marginTop: 40
                        }}
                    >
                        <DotsLoader
                            color='white'
                        />                        
                    </View>
                    :
                    <TouchableOpacity
                        style={{
                            borderColor: 'white',
                            borderWidth: 2,
                            paddingHorizontal: 47,
                            padding: 10,
                            margin: 10,
                            borderRadius: 20,
                            marginTop: 40
                        }}
                        onPress={() => SignUpUser(data.email, data.password, data.confirm_password, data.fullname)}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontFamily: 'Carme'
                            }}
                        >
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                }
                </View>
                
                

                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'white', fontFamily: 'Carme'}}>
                        Already have an account? 
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={{ paddingLeft: 4, color: 'white', fontFamily: 'Carme'}}>Login</Text>
                    </TouchableOpacity>
                </View>               

            </View>
        );
    }
};

export default SignUp;