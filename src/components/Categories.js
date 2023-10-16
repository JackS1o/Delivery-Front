import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, Text, View, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {filterProductsByCategories} from '../slices/cart';
import Spinner from 'react-native-loading-spinner-overlay';
import {getcategories} from '../utils/categories';

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getcategories()
      .then(res => {
        setCategories(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const filterProducts = async category => {
    setActiveCategory(category);
    dispatch(filterProductsByCategories(category));
  };

  return (
    <View className="mt-2">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="overflow-visible"
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}>
        <Spinner
          visible={!categories.length}
          textContent={'carregando...'}
          textStyle={{color: '#FFF'}}
        />
        {categories.map((category, index) => {
          let isActive = activeCategory === category.id;
          let btnClass = isActive ? 'bg-gray-600' : 'bg-gray-200';
          let textClass = isActive
            ? 'font-sembold text-gray-800'
            : 'text-gray-500';
          return (
            <View key={index} className="flex justify-center items-center mr-6">
              <TouchableOpacity
                onPress={() => filterProducts(category.id)}
                className={'p-1 rounded-full shadow bg-gray-200 ' + btnClass}>
                <Image
                  style={{width: 45, height: 45}}
                  source={category?.image}
                />
              </TouchableOpacity>
              <Text className={'text-sm ' + textClass}>{category.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
