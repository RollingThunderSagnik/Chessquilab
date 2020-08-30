// import React from 'react';
// import { View, Text, TouchableOpacity, TextInput, Platform, StyleSheet, Dimensions, StatusBar, Image } from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Feather from 'react-native-vector-icons/Feather';

// import { useFonts } from '@use-expo/font';
// import { AppLoading } from 'expo';

// const Login = ({ navigation }) => {
//     let [fontsLoaded] = useFonts({
// 		'Carme': require('./assets/fonts/Carme-Regular.ttf'),
// 		'Monoton': require('./assets/fonts/Monoton-Regular.ttf'),
//     });

//     const [data, setData] = React.useState({
// 		number: '',
// 		password: '',
// 		confirm_password: '',
// 		secureTextEntry: true,
// 		confirm_secureTextEntry: true,
//     });
    
//     const textInputChange = (val) => {
// 		if (val.length !== 0) {
// 			setData({
// 				...data,
// 				number: val,
// 			});
// 		} else {
// 			setData({
// 				...data,
// 				number: val,
// 			});
// 		}
// 	}

// 	const handlePasswordChange = (val) => {
// 		setData({
// 			...data,
// 			password: val
// 		});
// 	}

// 	const updateSecureTextEntry = () => {
// 		setData({
// 			...data,
// 			secureTextEntry: !data.secureTextEntry
// 		});
// 	}


//     if (!fontsLoaded) {
// 		return <AppLoading />;

// 	} else {
//         return (
//             <>
//             <View
//                 style={{
//                     flex: 1
//                 }}
//             >

            
//             <View>
//                 <FontAwesome
//                     name="user-o"
//                     color="black"
//                     size={20}
//                 />
//                 <TextInput
//                     placeholder="Email Address"
//                     style={{
//                         flex: 1,
//                         paddingLeft: 10
//                     }}
//                     keyboardType = 'number-pad'
//                     selectionColor="#1976d2"
//                     autoCapitalize="none"
//                     maxLength={10}
//                     onChangeText={(val) => textInputChange(val)}
//                 />
//             </View>

//             <View>
//                 <Feather
//                     name="lock"
//                     color="white"
//                     size={20}
//                 />
//                 <TextInput
//                     placeholder="Password"
//                     secureTextEntry={data.secureTextEntry ? true : false}
//                     style={{
//                         flex: 1,
//                         paddingLeft: 10
//                     }}
//                     selectionColor="#E75A7C"
//                     autoCapitalize="none"
//                     onChangeText={(val) => handlePasswordChange(val)}
//                 />
//                 <TouchableOpacity
//                     onPress={updateSecureTextEntry}
//                 >
//                     {data.secureTextEntry ?
//                         <Feather
//                             name="eye-off"
//                             color="white"
//                             size={20}
//                         />
//                         :
//                         <Feather
//                             name="eye"
//                             color="white"
//                             size={20}
//                         />
//                     }
//                 </TouchableOpacity>
//             </View>



//             </View>
//             </>
//         )
//     }
// };

// export default Login;