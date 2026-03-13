import { Tabs } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const C = { cream:'#fdf8f5', rose:'#e8a49a', roseD:'#d4756a', lav:'#c4b5d4', sage:'#a8bfb0', inkMu:'#c4b0b0', border:'rgba(200,160,155,0.2)' };

function TabIcon({ icon, label, focused }: { icon: string, label: string, focused: boolean }) {
  return (
    <View style={t.wrap}>
      <Text style={t.icon}>{icon}</Text>
      <Text style={[t.label, focused && t.labelOn]}>{label}</Text>
    </View>
  );
}

const t = StyleSheet.create({
  wrap: { alignItems: 'center', gap: 3, paddingTop: 4 },
  icon: { fontSize: 20 },
  label: { fontSize: 9.5, fontWeight: '500', color: C.inkMu },
  labelOn: { color: C.roseD },
});

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: { height: 72, backgroundColor: 'rgba(253,248,245,0.97)', borderTopColor: C.border, paddingBottom: 10 },
      tabBarActiveTintColor: C.roseD,
      tabBarInactiveTintColor: C.inkMu,
    }}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ focused }) => <TabIcon icon="🌸" label="Home" focused={focused} />, tabBarLabel: () => null }} />
      <Tabs.Screen name="device" options={{ title: 'Device', tabBarIcon: ({ focused }) => <TabIcon icon="💎" label="Device" focused={focused} />, tabBarLabel: () => null }} />
      <Tabs.Screen name="session" options={{ title: 'Session', tabBarIcon: ({ focused }) => <TabIcon icon="⏺" label="Session" focused={focused} />, tabBarLabel: () => null }} />
      <Tabs.Screen name="report" options={{ title: 'Report', tabBarIcon: ({ focused }) => <TabIcon icon="📈" label="Report" focused={focused} />, tabBarLabel: () => null }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ focused }) => <TabIcon icon="👤" label="Profile" focused={focused} />, tabBarLabel: () => null }} />
    </Tabs>
  );
}
