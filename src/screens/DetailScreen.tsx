import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CoffeeItemsType } from "../types/coffeItemsType";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import Feather from "@expo/vector-icons/Feather";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addItem,
  decreaseQty,
  increaseQty,
  removeItem,
} from "../store/reducers/CartSlice";

const windowWidth = Dimensions.get("window").width;
const BG_IMAGE_HEIGHT = windowWidth * 0.75;
const ITEM_CONTAINER_SIZE = windowWidth * 0.65;
const ITEM_IMAGE_SIZE = ITEM_CONTAINER_SIZE;

type RootStackParamList = {
  Detail: { item: CoffeeItemsType };
};

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

export default function DetailScreen({ route }: Props) {
  const { item } = route.params;
  const [size, setSize] = useState<string>("small");
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const cartItem = useAppSelector((state) =>
    state.cart.items.find((i) => i.id === item.id)
  );

  const qty = cartItem?.qty ?? 0;
  return (
    <View className="flex-1 bg-white ">
      <StatusBar hidden />
      <Image
        source={require("../../assets/images/bg2.png")}
        className="absolute w-full"
        style={{
          height: BG_IMAGE_HEIGHT,
          borderBottomRightRadius: 50,
          borderBottomLeftRadius: 50,
        }}
      />
      <SafeAreaView className="flex-1 justify-between">
        <View className="mx-4 mt-4 flex-row justify-between items-center">
          <TouchableOpacity
            className="p-2 rounded-full border border-white"
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 rounded-full border border-white">
            <FontAwesome name="heart-o" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View className="items-center mt-8">
          <View
            style={{
              width: ITEM_IMAGE_SIZE,
              height: ITEM_IMAGE_SIZE,
              shadowColor: themeColors.bgSecondary,
              shadowRadius: 20,
              shadowOpacity: 0.4,
            }}
          >
            <Image
              source={item.image}
              style={{
                width: ITEM_CONTAINER_SIZE,
                height: ITEM_CONTAINER_SIZE,
              }}
              resizeMode="contain"
            />
          </View>
        </View>
        <View
          className="px-6 pt-8 pb-6"
          style={{
            marginTop: -ITEM_CONTAINER_SIZE / 2.5,
          }}
        >
          <View className="flex-row justify-between items-center">
            <View>
              <Text
                className="text-3xl font-semibold"
                style={{
                  color: themeColors.text,
                }}
              >
                {item.name}
              </Text>
              <Text
                className="text-xl font-semibold"
                style={{
                  color: themeColors.text,
                }}
              >
                ${item.price}
              </Text>
            </View>
            <View className="absolute right-6">
              <Text
                className="text-xl mt-1 font-semibold bg-primary p-2 rounded-full"
                style={{
                  color: themeColors.text,
                }}
              >
                {item.stars}
              </Text>
            </View>
          </View>
          <View className="flex flex-row justify-between gap-8 mt-2">
            {["small", "medium", "large"].map((s) => (
              <TouchableOpacity
                key={s}
                onPress={() => setSize(s)}
                className="flex-1 py-3 rounded-full"
                style={{
                  backgroundColor: size === s ? themeColors.bgPrimary : "#fff",
                  borderWidth: size === s ? 0 : 1,
                  borderColor: themeColors.bgPrimary,
                }}
              >
                <Text
                  className="text-center font-semibold"
                  style={{
                    color: size === s ? "#fff" : themeColors.text,
                  }}
                >
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View className="mt-6 ">
            <Text className=" flex-row text-lg font-semibold">About</Text>
            <Text className="mt-2 text-base text-gray-600">{item.desc}</Text>
          </View>

          <View className="mt-6 flex-row items-center justify-between w-full px-4">
            <View className="flex-row items-baseline gap-2">
              <Text className="text-lg font-semibold">Volume</Text>
              <Text className="text-base text-gray-600">{item.volume}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <TouchableOpacity
                hitSlop={10}
                className="p-1"
                onPress={() => {
                  if (qty > 0) {
                    dispatch(decreaseQty(item.id));
                  }
                }}
              >
                <AntDesign
                  name="minus-circle"
                  size={24}
                  color={themeColors.bgPrimary}
                />
              </TouchableOpacity>
              <Text className="text-base text-gray-600">{qty}</Text>
              <TouchableOpacity
                hitSlop={10}
                className="p-1"
                onPress={() => {
                  if (!cartItem) {
                    dispatch(
                      addItem({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        volume: item.volume,
                        image: item.image,
                        stars: item.stars,
                        desc: item.desc,
                      })
                    );
                  } else {
                    dispatch(increaseQty(item.id));
                  }
                }}
              >
                <AntDesign
                  name="plus-circle"
                  size={24}
                  color={themeColors.bgPrimary}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row items-center mt-6">
            <TouchableOpacity className="p-4 rounded-full border border-gray-300">
              <Feather name="shopping-bag" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-primary flex-1 ml-4 rounded-full p-4"
              onPress={() => {
                // Sepette yoksa 1 adet ekle
                if (!cartItem) {
                  dispatch(
                    addItem({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      volume: item.volume,
                      image: item.image,
                      stars: item.stars,
                      desc: item.desc,
                    })
                  );
                }
                // Sonrasında Sepet/Checkout'a git
                navigation.navigate("Cart"); // varsa Cart
                // veya:
                // navigation.navigate("Checkout");
              }}
            >
              <Text className="text-center text-white font-semibold text-base">
                Buy Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
