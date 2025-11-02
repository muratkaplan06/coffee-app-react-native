import { ImageSourcePropType } from "react-native";

export type Id = number;
export type CoffeeItemsType = {
  id: Id;
  name: string;
  price: string;
  volume: string;
  stars: string;
  image: ImageSourcePropType;
  desc: string;
};

export type RootStackParamList = {
  Home: undefined;
  Detail: { item: CoffeeItemsType };
};
