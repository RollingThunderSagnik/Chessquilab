import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {f, auth, database} from './config/config';

import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

const Login = ({ navigation }) => {

    let [fontsLoaded] = useFonts({
		'Carme': require('./assets/fonts/Carme-Regular.ttf'),
		'Monoton': require('./assets/fonts/Monoton-Regular.ttf'),
    });

    const [data, setData] = React.useState({
		email: '',
		password: '',
        secureTextEntry: true,
        loggedIn: false,		
    });

    const logInUser = async(email, password) => {
		if(email != '' && password != ''){
			try{
				let user = await auth.signInWithEmailAndPassword(email, password);
				console.log(user);
				setData({
					...data,
					loggedIn: true
				});
			} catch(error){
				console.log(error);
				setData({
					...data,
					loggedIn: false
				});
				alert('Invalid Username or Password');
			}
		} else {
			alert('Invalid Username or Password');
		}
    }
    
    if(data.loggedIn === true){
        console.log("login hoa6a "+ auth.currentUser.uid);
        database.ref('users/' + auth.currentUser.uid + '/').update({'online': true});
        // database.ref('onlineusers/').update({
        //     id : auth.currentUser.uid+'') : true
        // });
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

	const handlePasswordChange = (val) => {
		setData({
			...data,
			password: val
		});
	}

	const updateSecureTextEntry = () => {
		setData({
			...data,
			secureTextEntry: !data.secureTextEntry
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

                    <TextInput
                        
                        placeholder='Email Address'
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
                    onPress={() => logInUser(data.email, data.password)}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontFamily: 'Carme'
                        }}
                    >
                        Login
                    </Text>
                </TouchableOpacity>

                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'white', fontFamily: 'Carme'}}>
                        Don't have an account? 
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}
                    >
                        <Text style={{ paddingLeft: 4, color: 'white', fontFamily: 'Carme'}}>Create Account</Text>
                    </TouchableOpacity>
                </View>               


            </View>
            
        )
    }
};

export default Login;