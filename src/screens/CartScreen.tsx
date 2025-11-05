import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { themeColors } from "../theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  clearCart,
  decreaseQty,
  increaseQty,
  removeItem,
} from "../store/reducers/CartSlice";

export default function CartScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const cartItems = useAppSelector((state) => state.cart.items);

  const safePrice = (p: any) => {
    const n = Number(p);
    return isNaN(n) ? 0 : n;
  };

  const totalPrice = cartItems.reduce(
    (sum, i) => sum + safePrice(i.price) * i.qty,
    0
  );
  return (
    <SafeAreaView>
      <StatusBar hidden />
      <View className="flex-row mt-5 items-center justify-between px-4 py-3 border border-gray-200">
        <TouchableOpacity
          className="p-2 rounded-full border border-white"
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="arrow-left" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-secondary">Cart</Text>

        <TouchableOpacity
          className="p-2 rounded-full border border-white"
          onPress={() => dispatch(clearCart())}
        >
          <Entypo name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>

      <View className="px-4 pt-4">
        <FlatList
          data={cartItems}
          keyExtractor={(i) => i.id.toString()}
          ListEmptyComponent={
            <Text className="text-center text-gray-400">Empty Cart</Text>
          }
          renderItem={({ item }) => {
            const price = safePrice(item.price);
            return (
              <View className="flex-row items-center p-4 mb-4 border-b border-b-primary">
                <Image source={item.image} className="w-16 h-16 " />
                <View className="flex-1 ml-4">
                  <Text className="text-base font-medium">{item.name}</Text>

                  <Text className="text-base font-medium">
                    {price.toFixed(2)}$ x {item.qty}
                  </Text>

                  <View className="flex-row items-center mt-3">
                    <TouchableOpacity
                      onPress={() => dispatch(decreaseQty(item.id))}
                      className="p-1"
                    >
                      <AntDesign
                        name="minus-circle"
                        size={24}
                        color={themeColors.bgPrimary}
                      />
                    </TouchableOpacity>

                    <Text
                      className="mx-3 text-base"
                      style={{ color: themeColors.text }}
                    >
                      {item.qty}
                    </Text>

                    <TouchableOpacity
                      onPress={() => dispatch(increaseQty(item.id))}
                      className="p-1"
                    >
                      <AntDesign
                        name="plus-circle"
                        size={24}
                        color={themeColors.bgPrimary}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => dispatch(removeItem(item.id))}
                      className="ml-auto"
                    >
                      <Feather name="delete" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>

      {cartItems.length > 0 && (
        <View className="px-4 pb-8">
          <Text className="text-lg font-semibold mb-3 text-secondary">
            Toplam {totalPrice.toFixed(2)}$
          </Text>
          <TouchableOpacity className="bg-primary py-4 rounded-full px-2">
            <Text className="text-center text-xl font-semibold text-white">
              Checkout
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
