import { useRouter } from 'expo-router';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const C = {
  plum: '#1E1228', berry: '#5C2340', rose: '#C96B6B',
  blush: '#F0D4D0', lavender: '#9B7DB8', sage: '#6EA87A',
  cream: '#FBF5F2', gold: '#C89A50',
};

export default function Welcome() {
  const router = useRouter();
  return (
    <View style={s.container}>
      <View style={[s.circle, { width: 320, height: 320, top: -80, right: -80, backgroundColor: C.berry + '40' }]} />
      <View style={[s.circle, { width: 220, height: 220, bottom: 100, left: -60, backgroundColor: C.lavender + '30' }]} />
      <View style={s.center}>
        <View style={s.logoWrap}>
          <View style={s.logoOuter}>
            <View style={s.logoInner}>
              <Text style={s.logoV}>V</Text>
            </View>
          </View>
        </View>
        <Text style={s.title}>VitaSync</Text>
        <Text style={s.tagline}>Hormonal health intelligence{'\n'}powered by your body's signals</Text>
        <View style={s.pillRow}>
          {['HRV', 'EMG', 'AI Insights'].map(t => (
            <View key={t} style={s.pill}><Text style={s.pillTxt}>{t}</Text></View>
          ))}
        </View>
      </View>
      <View style={s.bottom}>
        <TouchableOpacity style={s.btn} onPress={() => router.push('/onboarding')}>
          <Text style={s.btnTxt}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/dashboard')}>
          <Text style={s.link}>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.plum },
  circle: { position: 'absolute', borderRadius: 999 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  logoWrap: { marginBottom: 24 },
  logoOuter: { width: 88, height: 88, borderRadius: 44, backgroundColor: C.berry + '60', alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: C.rose + '80' },
  logoInner: { width: 60, height: 60, borderRadius: 30, backgroundColor: C.rose + '90', alignItems: 'center', justifyContent: 'center' },
  logoV: { fontSize: 28, fontWeight: '800', color: C.cream },
  title: { fontSize: 36, fontWeight: '800', color: C.cream, letterSpacing: 1.5, marginBottom: 12 },
  tagline: { fontSize: 15, color: C.blush + 'CC', textAlign: 'center', lineHeight: 22, marginBottom: 28 },
  pillRow: { flexDirection: 'row', gap: 10 },
  pill: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: C.lavender + '60', backgroundColor: C.lavender + '20' },
  pillTxt: { color: C.lavender, fontSize: 12, fontWeight: '600' },
  bottom: { paddingHorizontal: 32, paddingBottom: 48, gap: 16, alignItems: 'center' },
  btn: { width: '100%', paddingVertical: 16, borderRadius: 16, backgroundColor: C.rose, alignItems: 'center' },
  btnTxt: { color: C.cream, fontSize: 17, fontWeight: '700', letterSpacing: 0.5 },
  link: { color: C.blush + '80', fontSize: 13 },
});
