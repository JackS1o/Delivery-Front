import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {Input} from 'react-native-elements';
import creditCardType from 'credit-card-type';

export default function PaymentScreen() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(''); // Estado para o método de pagamento
  const [cardType, setCardType] = useState('');

  const handleCardNumberChange = input => {
    const cardNumberWithoutSpaces = input.replace(/\s/g, '');
    setCardNumber(cardNumberWithoutSpaces);

    // Identificar a emissora do cartão usando a biblioteca credit-card-type
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
    }
    // Você pode adicionar condições semelhantes para os outros métodos de pagamento (Pix, dinheiro)
    return null;
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>
        Informações de Pagamento
      </Text>
      <Button
        title="Cartão de Crédito"
        onPress={() => setPaymentMethod('creditCard')}
      />
      <Button title="Pix" onPress={() => setPaymentMethod('pix')} />
      <Button title="Dinheiro" onPress={() => setPaymentMethod('cash')} />
      {renderPaymentFields()}
      <Button title="Realizar Pagamento" onPress={handlePayment} />
    </View>
  );
}
