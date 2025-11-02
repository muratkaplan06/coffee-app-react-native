import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { themeColors } from "../theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { clearCart } from "../store/reducers/CartSlice";

export default function CartScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const cartItems = useAppSelector((state) => state.cart.items);

  const safeprice = (p: any) => {
    const n = Number(p);
    return isNaN(n) ? 0 : n;
  };

  const totalPrice = cartItems.reduce(
    (sum, i) => sum + safeprice(i) * i.qty,
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
          <AntDesign name="arrow-left" size={20} color={themeColors.text} />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-secondary">Cart</Text>
        <TouchableOpacity
          className="p-2 rounded-full border border-white"
          onPress={() => dispatch(clearCart())}
        >
          <FontAwesome name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
