import { Tabs } from 'expo-router';
import { Navbar } from '../../components';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <Navbar {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="saved-jobs" />
      <Tabs.Screen name="messages" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
