// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Image,
//   TouchableWithoutFeedback
// } from 'react-native';
// import {Input} from 'react-native-elements';
// import creditCardType from 'credit-card-type';
// import {themeColors} from '../../theme';
// import {useSelector} from 'react-redux';
// import {selectCartTotal} from '../../slices/cart';
// import Clipboard from '@react-native-community/clipboard';
// import { useNavigation } from '@react-navigation/native';

// export default function PaymentScreen() {
//   const [cardNumber, setCardNumber] = useState('');
//   const [expiryDate, setExpiryDate] = useState('');
//   const [cvv, setCVV] = useState('');
//   const [paymentMethod, setPaymentMethod] = useState('');
//   const [cardType, setCardType] = useState('');
//   const [pixKey, setPixKey] = useState('MD');
//   const cartTotal = useSelector(selectCartTotal);
//   const navigate = useNavigation();

//   const handleCardNumberChange = input => {
//     const cardNumberWithoutSpaces = input.replace(/\s/g, '');
//     setCardNumber(cardNumberWithoutSpaces);

//     const cardInfo = creditCardType(cardNumberWithoutSpaces);
//     if (cardInfo && cardInfo.length > 0) {
//       setCardType(cardInfo[0].niceType);
//     } else {
//       setCardType('Desconhecido');
//     }
//   };

//   const handlePayment = () => {
//     if (!paymentMethod) {
//       alert('Selecione um método de pagamento.');
//       return;
//     }
//     navigate.navigate('Delivery');
//   };

//   const handleCopyPixKey = () => {
//     Clipboard.setString(pixKey);
//     alert('Chave Pix copiada.');
//   };

//   const renderPaymentFields = () => {
//     if (paymentMethod === 'creditCard') {
//       return (
//         <>
//           <Text style={{fontSize: 20, marginBottom: 10}}>
//             Informações de Pagamento
//           </Text>
//           <Input
//             placeholder="Número do Cartão"
//             value={cardNumber}
//             onChangeText={handleCardNumberChange}
//           />
//           <Input
//             placeholder="Data de Expiração"
//             value={expiryDate}
//             onChangeText={setExpiryDate}
//           />
//           <Input placeholder="CVV" value={cvv} onChangeText={setCVV} />
//           {paymentMethod === 'creditCard' && (
//             <Text style={{marginTop: 10}}>Emissora do Cartão: {cardType}</Text>
//           )}
//         </>
//       );
//     } else if (paymentMethod === 'pix') {
//       return (
//         <View>
//           <Text style={{fontSize: 20, marginBottom: 10}}>
//             Informações de Pagamento - Pix
//           </Text>
//           <Text
//             placeholder="Chave Pix"
//             value={pixKey}
//             onChangeText={setPixKey}
//           />
//           <TouchableWithoutFeedback onPress={handleCopyPixKey}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <Text
//                 style={{
//                   fontSize: 16,
//                   color: themeColors.primaryColor,
//                   alignSelf: 'center',
//                   marginBottom: 10,
//                 }}>
//                 Copiar Chave Pix: {pixKey}
//               </Text>
//             </View>
//           </TouchableWithoutFeedback>
//           <Image
//             source={{
//               uri: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${pixKey}`,
//             }}
//             style={{
//               width: 200,
//               height: 200,
//               marginBottom: 10,
//               alignSelf: 'center',
//             }}
//           />
//         </View>
//       );
//     } else if (paymentMethod === 'cash') {
//       return (
//         <View>
//           <Text
//             style={{
//               fontSize: 20,
//               marginBottom: 10,
//               alignSelf: 'center',
//               marginTop: 10,
//             }}>
//             Pagamento em Dinheiro
//           </Text>
//         </View>
//       );
//     }
//     return null;
//   };

//   return (
//     <View style={{flex: 1, padding: 20, marginTop: 30}}>
//       <Text style={{fontSize: 20, marginBottom: 10, alignSelf: 'center'}}>
//         Selecione o método de pagamento
//       </Text>
//       <Button
//         color={themeColors.bgColor(1)}
//         title="Cartão de Crédito"
//         onPress={() => setPaymentMethod('creditCard')}
//       />
//       <Button
//         color={themeColors.bgColor(1)}
//         title="Pix"
//         onPress={() => setPaymentMethod('pix')}
//       />
//       <Button
//         color={themeColors.bgColor(1)}
//         title="Dinheiro"
//         onPress={() => setPaymentMethod('cash')}
//       />
//       {renderPaymentFields()}
//       <Text style={{fontSize: 18, margin: 20}}>
//         Valor total: {`R$ ${(cartTotal + 2).toFixed(2)}`}
//       </Text>
//       <Button
//         color={themeColors.bgColor(1)}
//         title="Realizar Pagamento"
//         onPress={handlePayment}
//       />
//     </View>
//   );
// }
import React, { useState } from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { API_URL, PARTNERID } from '../../../env';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../slices/cart';
import AsyncStorage from '@react-native-async-storage/async-storage';

function PaymentScreen() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    street: '',
    neiborhood: '',
    number: '',
    complement: '',
  });
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const navigate = useNavigation();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal)

  const onChangeInfo = (key, value) => {
    setUserInfo({ ...userInfo, [key]: value });
  };
  
  const pay = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    const quantity = cartItems.reduce((group, item) => {
      if (group[item._id]) {
        group[item._id]++;
      } else {
        group[item._id] = 1;
      }
      return group;
    }, {});
    const response = await axios.post(
      `${API_URL}/api/v1/payment/payment`,
      {
        items: JSON.stringify(cartItems.map((item) => ({
          id: item._id,
          quantity: quantity[item._id],
        }))),
        addressId: user.address[0].id,
        partnerId: PARTNERID,
        userId: user.id,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGQ3YTBjNTA5NjRhY2ViNjJjYTUwZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk5NTgwNDUyLCJleHAiOjE3MDgyMjA0NTJ9.y0cVs-g1nT9eGB5yORS8pwzpLIjz-54l7Er4k05aBVk`
        },
      }
    );

    const { clientSecret } = response.data;
    const initSheet = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: 'Nome que aparece na fatura',
    });
    if (initSheet.error) {
      alert('Erro ao iniciar pagamento');
      return;
    }
    const presentSheet = await presentPaymentSheet({ clientSecret });
    if (presentSheet.error) {
      alert('Pagamento Cancelado');
      return;
    }
    navigate.navigate('Delivery');
  };
  
  return (
    <StripeProvider
      publishableKey="pk_test_51NhIhvBNc2rxEllKjpGK61qW6R5WGeHm7pyim14Bzy6HNRjOxHWVLFPURZM4x8n1BG0y8pAfFoNwBSMV49EXxjuZ00B27uA12x"
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={userInfo.name}
          onChangeText={(text) => onChangeInfo('name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Rua"
          value={userInfo.street}
          onChangeText={(text) => onChangeInfo('street', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Bairro"
          value={userInfo.neiborhood}
          onChangeText={(text) => onChangeInfo('neiborhood', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Número"
          value={userInfo.number}
          onChangeText={(text) => onChangeInfo('number', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Complemento"
          value={userInfo.complement}
          onChangeText={(text) => onChangeInfo('complement', text)}
        />
        <TouchableOpacity onPress={pay} style={styles.button}>
          <Text style={styles.buttonText}>Pagar com cartão</Text>
        </TouchableOpacity>
      </View>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 10,
    width: '100%',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 15,
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default PaymentScreen;

