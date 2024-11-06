import { Stack } from "expo-router";
import { MyContextProvider } from "./context";

export default function RootLayout() {
  return (
    <MyContextProvider>
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}}/>
        <Stack.Screen name="mainmenu" />
        <Stack.Screen name="credits" />
        <Stack.Screen name="register" options={{headerShown: false}}/>
        <Stack.Screen name="edit" />
        <Stack.Screen name="camera" />
      </Stack>
    </MyContextProvider>
  );
}
