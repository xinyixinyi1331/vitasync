import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const C = { cream:'#fdf8f5', blush:'#f9e8e4', rose:'#e8a49a', roseD:'#d4756a', lav:'#c4b5d4', sage:'#a8bfb0', ink:'#3d2e2e', inkM:'#6b5050', inkS:'#9d8585', inkMu:'#c4b0b0' };

export default function Welcome() {
  const router = useRouter();
  return (
    <View style={s.bg}>
      <View style={s.inner}>
        <View style={s.logo}><Text style={s.logoTxt}>V</Text></View>
        <Text style={s.h1}>Know your body,{'\n'}<Text style={s.em}>deeply.</Text></Text>
        <Text style={s.sub}>AI-powered hormonal health — built for women with PCOS and hormonal conditions.</Text>
        <View style={s.trustRow}>
          {['🔬 Evidence-based', '🔒 Private', '👩‍⚕️ Clinician-ready'].map(t => (
            <View key={t} style={s.tc}><Text style={s.tcTxt}>{t}</Text></View>
          ))}
        </View>
        <TouchableOpacity style={s.btn} onPress={() => router.push('/onboarding')}>
          <Text style={s.btnTxt}>Get started →</Text>
        </TouchableOpacity>
        <Text style={s.signin}>
          Already have an account?{' '}
          <Text style={s.signinLink} onPress={() => router.push('/(tabs)')}>Sign in</Text>
        </Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  bg: { flex: 1, backgroundColor: '#f5e0dc', justifyContent: 'center', alignItems: 'center',
    backgroundImage: undefined }, // gradient via overlay
  inner: { alignItems: 'center', paddingHorizontal: 28, paddingTop: 40 },
  logo: { width: 88, height: 88, borderRadius: 28, backgroundColor: C.rose, alignItems: 'center', justifyContent: 'center',
    shadowColor: C.roseD, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.45, shadowRadius: 24, marginBottom: 28 },
  logoTxt: { fontSize: 44, color: '#fff', fontWeight: '400' },
  h1: { fontSize: 38, fontWeight: '400', color: C.ink, textAlign: 'center', lineHeight: 44, marginBottom: 14 },
  em: { color: C.roseD, fontStyle: 'italic' },
  sub: { fontSize: 14, color: C.inkM, lineHeight: 22, textAlign: 'center', marginBottom: 28 },
  trustRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginBottom: 28, justifyContent: 'center' },
  tc: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.55)',
    borderRadius: 20, paddingHorizontal: 12, paddingVertical: 7 },
  tcTxt: { fontSize: 11.5, color: C.inkS },
  btn: { width: '100%', paddingVertical: 15, borderRadius: 16,
    backgroundColor: C.roseD, alignItems: 'center',
    shadowColor: C.roseD, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 18, marginBottom: 14 },
  btnTxt: { color: '#fff', fontSize: 15, fontWeight: '500', letterSpacing: 0.1 },
  signin: { fontSize: 13, color: C.inkMu },
  signinLink: { color: C.roseD },
});
