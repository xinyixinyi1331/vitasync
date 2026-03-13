import { useRouter } from 'expo-router';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View, useEffect, useRef } from 'react-native';
import { useEffect as UE, useRef as UR } from 'react';

const C = { cream:'#fdf8f5', blush:'#f9e8e4', rose:'#e8a49a', roseD:'#d4756a', lav:'#c4b5d4', sage:'#a8bfb0', ink:'#3d2e2e', inkS:'#9d8585', inkMu:'#c4b0b0', border:'rgba(200,160,155,0.2)' };

function RingAnim() {
  const anims = [UR(new Animated.Value(0)).current, UR(new Animated.Value(0)).current, UR(new Animated.Value(0)).current];
  UE(() => {
    anims.forEach((a, i) => {
      Animated.loop(Animated.sequence([
        Animated.delay(i * 650),
        Animated.timing(a, { toValue: 1, duration: 2000, easing: Easing.out(Easing.ease), useNativeDriver: true }),
        Animated.timing(a, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])).start();
    });
  }, []);

  return (
    <View style={r.wrap}>
      {anims.map((a, i) => (
        <Animated.View key={i} style={[r.ring, {
          transform: [{ scale: a.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1.25] }) }],
          opacity: a.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.8, 0.3, 0] }),
        }]} />
      ))}
      <View style={r.pill} />
    </View>
  );
}

const r = StyleSheet.create({
  wrap: { width: 140, height: 140, borderRadius: 70, backgroundColor: 'rgba(249,232,228,0.6)', borderWidth: 1, borderColor: C.border, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  ring: { position: 'absolute', width: 100, height: 100, borderRadius: 50, borderWidth: 1.5, borderColor: 'rgba(232,164,154,0.35)' },
  pill: { width: 30, height: 80, borderRadius: 15, backgroundColor: C.rose, shadowColor: C.rose, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.45, shadowRadius: 16 },
});

export default function Pairing() {
  const router = useRouter();
  const STEPS = [
    { label: 'Searching for VitaSync Wearable…', done: true },
    { label: 'Establishing secure connection…', done: true },
    { label: 'Syncing sensor calibration…', done: true },
  ];
  return (
    <View style={s.container}>
      <View style={s.inner}>
        <RingAnim />
        <Text style={s.title}>VitaSync Wearable</Text>
        <Text style={s.sub}>Place the sensor against your skin and keep your phone nearby.</Text>
        <View style={s.found}>
          <View style={s.dot} />
          <Text style={s.foundTxt}>VS-001 found nearby</Text>
        </View>
        <View style={s.steps}>
          {STEPS.map((st, i) => (
            <View key={i} style={s.step}>
              <View style={s.stepNum}><Text style={s.stepNumTxt}>✓</Text></View>
              <Text style={s.stepTxt}>{st.label}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={s.btn} onPress={() => router.replace('/(tabs)')}>
          <Text style={s.btnTxt}>Start using VitaSync →</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
          <Text style={s.skip}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.cream },
  inner: { flex: 1, alignItems: 'center', paddingHorizontal: 24, paddingTop: 80, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: '400', color: '#3d2e2e', marginBottom: 10 },
  sub: { fontSize: 13.5, color: C.inkS, textAlign: 'center', lineHeight: 20, marginBottom: 20 },
  found: { flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: 'rgba(168,191,176,0.18)', borderWidth: 1, borderColor: 'rgba(168,191,176,0.35)', borderRadius: 20, paddingHorizontal: 18, paddingVertical: 9, marginBottom: 22 },
  dot: { width: 8, height: 8, backgroundColor: '#7ab88a', borderRadius: 4 },
  foundTxt: { fontSize: 13, color: '#5a7d65' },
  steps: { width: '100%', gap: 9, marginBottom: 26 },
  step: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: 14, backgroundColor: C.blush, borderRadius: 14 },
  stepNum: { width: 26, height: 26, borderRadius: 13, backgroundColor: C.sage, alignItems: 'center', justifyContent: 'center' },
  stepNumTxt: { fontSize: 11, fontWeight: '600', color: '#fff' },
  stepTxt: { fontSize: 13.5, color: '#6b5050' },
  btn: { width: '100%', paddingVertical: 15, borderRadius: 16, backgroundColor: C.roseD, alignItems: 'center', marginBottom: 14, shadowColor: C.roseD, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 14 },
  btnTxt: { color: '#fff', fontSize: 15, fontWeight: '500' },
  skip: { color: C.inkMu, fontSize: 13 },
});
