// import React, {useState, useEffect} from 'react';
// import {View, Text, Button} from 'react-native';
// import auth from '@react-native-firebase/auth';
// import {Login} from './src/pages/login';

// import {GoogleSignin} from '@react-native-google-signin/google-signin';

// export default function App() {
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState();

//   GoogleSignin.configure({
//     webClientId:
//       '693176297834-gk83g6j3ks0l61sgn0ake65roltk58qk.apps.googleusercontent.com',
//   });

//   // Handle user state changes
//   function onAuthStateChanged(user) {
//     setUser(user);
//     if (initializing) {
//       setInitializing(false);
//     }
//   }

//   async function signOut() {
//     await auth()
//       .signOut()
//       .then(async () => {
//         await GoogleSignin.signOut().then(() => setUser(null));
//       });
//   }

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);

//   if (initializing) {
//     return null;
//   }

//   if (!user) {
//     return <Login />;
//   }

//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingTop: 40,
//         backgroundColor: '#121212',
//       }}>
//       <Text
//         style={{
//           fontSize: 20,
//           color: '#e1e1e1',
//           textAlign: 'center',
//         }}>{`Welcome \n${user.email}`}</Text>
//       <Button title="sair" onPress={signOut} />
//     </View>
//   );
// }

import React from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Routes />
    </NavigationContainer>
  );
}
