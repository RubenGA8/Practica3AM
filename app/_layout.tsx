import { Stack } from "expo-router";
import { MyContextProvider } from "./context";

export default function RootLayout() {
  return (
    <MyContextProvider>
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}}/>
        <Stack.Screen name="mainmenu" options={{headerShown: false}}/>
        <Stack.Screen name="credits" options={{headerShown: false}}/>
        <Stack.Screen name="register" options={{headerShown: false}}/>
        <Stack.Screen name="edit" options={{headerShown: false}}/>
        <Stack.Screen name="camera" options={{headerShown: false}}/>
      </Stack>
    </MyContextProvider>
  );
}
