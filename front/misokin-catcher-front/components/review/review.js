import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  Button
} from 'react-native';

const Review = () => {
  const [selectedStore, setSelectedStore] = useState(null);
  const [stockStatus, setStockStatus] = useState(null);
  const [reviewText, setReviewText] = useState('');

  const stores = ['店舗1', '店舗2', '店舗3'];  // 仮の店舗データ

  return (
    <View style={styles.container}>

      {/* 店舗選択 */}
      <View style={styles.row}>
        <Text>店舗選択</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedStore(value)}
          items={stores.map(store => {
            return { label: store, value: store };
          })}
          style={pickerSelectStyles}
          value={selectedStore}
        />
      </View>

      {/* 在庫情報 */}
      <View style={styles.row}>
        <Text>在庫情報</Text>
        <View style={styles.stockOptions}>
          {['○', '△', '×'].map((status) => (
            <TouchableOpacity 
              key={status}
              style={[styles.stockButton, stockStatus === status && styles.selectedStock]}
              onPress={() => setStockStatus(status)}
            >
              <Text>{status}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* クチコミ */}
      <Text>クチコミ</Text>
      <TextInput 
        style={styles.input}
        value={reviewText}
        onChangeText={text => setReviewText(text)}
        multiline
      />

      {/* 投稿ボタン */}
      <View style={styles.submitButton}>
        <Button title="投稿する" onPress={() => {
          // ここで投稿処理を行う
        }} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '100%',
    alignItems: 'stretch', 
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
    flexWrap: 'nowrap',
  },
  stockOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  stockButton: {
    padding: 10,
    marginHorizontal: 14,
  },
  selectedStock: {
    backgroundColor: '#ddd',
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 10,
    padding: 5,
  },
  submitButton: {
    marginTop: 20,
    marginHorizontal: '10%',
  },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        flex: 1,
        minWidth: '50%',
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
        flex: 1,
        minWidth: '50%',
    },
});

export default Review;
