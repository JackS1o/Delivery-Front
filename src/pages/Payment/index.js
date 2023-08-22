import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import {Input} from 'react-native-elements';
import creditCardType from 'credit-card-type';
import {themeColors} from '../../theme';
import {useSelector} from 'react-redux';
import {selectCartTotal} from '../../slices/cart';
import Clipboard from '@react-native-community/clipboard';
import { useNavigation } from '@react-navigation/native';

export default function PaymentScreen() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardType, setCardType] = useState('');
  const [pixKey, setPixKey] = useState('adfvasdvadrghrtyjhtydyh');
  const cartTotal = useSelector(selectCartTotal);
  const navigate = useNavigation();

  const handleCardNumberChange = input => {
    const cardNumberWithoutSpaces = input.replace(/\s/g, '');
    setCardNumber(cardNumberWithoutSpaces);


    const cardInfo = creditCardType(cardNumberWithoutSpaces);
    if (cardInfo && cardInfo.length > 0) {
      setCardType(cardInfo[0].niceType);
    } else {
      setCardType('Desconhecido');
    }
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Selecione um método de pagamento.');
      return;
    }
    navigate.navigate('Delivery');
  };

  const handleCopyPixKey = () => {
    Clipboard.setString(pixKey);
    alert('Chave Pix copiada.');
  };

  const renderPaymentFields = () => {
    if (paymentMethod === 'creditCard') {
      return (
        <>
          <Text style={{fontSize: 20, marginBottom: 10}}>
            Informações de Pagamento
          </Text>
          <Input
            placeholder="Número do Cartão"
            value={cardNumber}
            onChangeText={handleCardNumberChange}
          />
          <Input
            placeholder="Data de Expiração"
            value={expiryDate}
            onChangeText={setExpiryDate}
          />
          <Input placeholder="CVV" value={cvv} onChangeText={setCVV} />
          {paymentMethod === 'creditCard' && (
            <Text style={{marginTop: 10}}>Emissora do Cartão: {cardType}</Text>
          )}
        </>
      );
    } else if (paymentMethod === 'pix') {
      return (
        <View>
          <Text style={{fontSize: 20, marginBottom: 10}}>
            Informações de Pagamento - Pix
          </Text>
          <Text
            placeholder="Chave Pix"
            value={pixKey}
            onChangeText={setPixKey}
          />
          <TouchableWithoutFeedback onPress={handleCopyPixKey}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: themeColors.primaryColor,
                  alignSelf: 'center',
                  marginBottom: 10,
                }}>
                Copiar Chave Pix: {pixKey}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <Image
            source={{
              uri: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${pixKey}`,
            }}
            style={{
              width: 200,
              height: 200,
              marginBottom: 10,
              alignSelf: 'center',
            }}
          />
        </View>
      );
    } else if (paymentMethod === 'cash') {
      return (
        <View>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 10,
              alignSelf: 'center',
              marginTop: 10,
            }}>
            Pagamento em Dinheiro
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={{flex: 1, padding: 20, marginTop: 30}}>
      <Text style={{fontSize: 20, marginBottom: 10, alignSelf: 'center'}}>
        Selecione o método de pagamento
      </Text>
      <Button
        color={themeColors.bgColor(1)}
        title="Cartão de Crédito"
        onPress={() => setPaymentMethod('creditCard')}
      />
      <Button
        color={themeColors.bgColor(1)}
        title="Pix"
        onPress={() => setPaymentMethod('pix')}
      />
      <Button
        color={themeColors.bgColor(1)}
        title="Dinheiro"
        onPress={() => setPaymentMethod('cash')}
      />
      {renderPaymentFields()}
      <Text style={{fontSize: 18, margin: 20}}>
        Valor total: {`R$ ${cartTotal + 2}`}
      </Text>
      <Button
        color={themeColors.bgColor(1)}
        title="Realizar Pagamento"
        onPress={handlePayment}
      />
    </View>
  );
}
