import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const C = { cream:'#fdf8f5', blush:'#f9e8e4', rose:'#e8a49a', roseD:'#d4756a', lav:'#c4b5d4', sage:'#a8bfb0', gold:'#d4a56a', ink:'#3d2e2e', inkM:'#6b5050', inkS:'#9d8585', inkMu:'#c4b0b0', border:'rgba(200,160,155,0.2)' };

function GlowPill() {
  const glow = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.timing(glow, { toValue: 1, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      Animated.timing(glow, { toValue: 0, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
    ])).start();
  }, []);
  const opacity = glow.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] });
  return (
    <View style={g.wrap}>
      <Animated.View style={[g.halo, { opacity }]} />
      <View style={g.pill} />
    </View>
  );
}
const g = StyleSheet.create({
  wrap: { width: 110, height: 140, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  halo: { position: 'absolute', inset: -16, width: 142, height: 172, borderRadius: 71, backgroundColor: 'rgba(232,164,154,0.15)' },
  pill: { width: 40, height: 110, borderRadius: 20, backgroundColor: C.rose, shadowColor: C.rose, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.5, shadowRadius: 20 },
});

const SENSORS = [
  { icon: '💓', val: '72', lbl: 'Heart Rate', unit: 'BPM', trend: '↑ +3 vs resting', style: 'rose' },
  { icon: '🌊', val: '61', lbl: 'HRV (RMSSD)', unit: 'ms', trend: '↑ Strong vagal tone', style: 'lav' },
  { icon: '🌡️', val: '36.7', lbl: 'Skin Temp', unit: '°C', trend: '→ Baseline normal', style: 'sage' },
  { icon: '⚡', val: '0.42', lbl: 'EMG Amplitude', unit: 'µV', trend: '↑ +12% vs last session', style: 'gold' },
];

const HISTORY = [
  { dot: '#d4756a', title: 'Morning session', time: 'Today · 09:14 · 6 min', score: '7.1' },
  { dot: '#a8bfb0', title: 'Evening session', time: 'Yesterday · 20:30 · 5 min', score: '6.8' },
  { dot: '#c4b5d4', title: 'Afternoon session', time: '2 days ago · 14:15 · 8 min', score: '7.4' },
];

const CALIB = [
  { title: 'HRV baseline', sub: 'Calibrated 3 days ago', badge: 'ok', badgeTxt: '✓ Calibrated' },
  { title: 'EMG sensitivity', sub: 'Auto-calibrated at session start', badge: 'ok', badgeTxt: '✓ Active' },
  { title: 'Temperature offset', sub: 'Last updated 1 week ago', badge: 'warn', badgeTxt: '⚠ Recalibrate' },
];

export default function Device() {
  const [bpm, setBpm] = useState(72);
  useEffect(() => {
    const t = setInterval(() => setBpm(Math.floor(70 + Math.random() * 10)), 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.h1}>My <Text style={s.h1Em}>device</Text></Text>
        <Text style={s.sub}>VitaSync Wearable · VS-001</Text>
      </View>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {/* hero */}
        <View style={s.heroCard}>
          <GlowPill />
          <Text style={s.heroName}>VitaSync Wearable</Text>
          <View style={s.heroStatus}>
            <View style={s.heroDot} />
            <Text style={s.heroStatusTxt}>Connected · Streaming</Text>
          </View>
          <View style={s.battRow}>
            <Text style={s.battLbl}>Battery · 84%</Text>
            <View style={s.battTrack}><View style={[s.battFill, { width: '84%' }]} /></View>
          </View>
          <TouchableOpacity style={s.heroBtn}><Text style={s.heroBtnTxt}>Configure sensor →</Text></TouchableOpacity>
        </View>

        {/* sensor grid */}
        <View style={s.sensorGrid}>
          {SENSORS.map((sen, i) => (
            <View key={i} style={[s.sensorBox, i === 0 ? s.sboxRose : i === 1 ? s.sboxLav : i === 2 ? s.sboxSage : s.sboxGold]}>
              <Text style={s.sensorIcon}>{sen.icon}</Text>
              <Text style={[s.sensorVal, { color: i === 0 ? C.roseD : i === 1 ? '#8870a8' : i === 2 ? '#5a7d65' : C.gold }]}>
                {i === 0 ? bpm : sen.val}
              </Text>
              <Text style={s.sensorLbl}>{sen.lbl}</Text>
              <Text style={s.sensorTrend}>{sen.trend}</Text>
            </View>
          ))}
        </View>

        {/* session history */}
        <View style={s.section}>
          <Text style={s.sectionTtl}>Session history</Text>
          {HISTORY.map((h, i) => (
            <View key={i} style={s.histItem}>
              <View style={[s.histDot, { backgroundColor: h.dot }]} />
              <View style={s.histInfo}>
                <Text style={s.histTitle}>{h.title}</Text>
                <Text style={s.histTime}>{h.time}</Text>
              </View>
              <Text style={[s.histScore, { color: h.dot }]}>{h.score}</Text>
            </View>
          ))}
        </View>

        {/* calibration */}
        <View style={s.section}>
          <Text style={s.sectionTtl}>Sensor calibration</Text>
          {CALIB.map((c, i) => (
            <View key={i} style={s.calibRow}>
              <View style={s.calibInfo}>
                <Text style={s.calibTitle}>{c.title}</Text>
                <Text style={s.calibSub}>{c.sub}</Text>
              </View>
              <View style={[s.badge, c.badge === 'ok' ? s.badgeOk : s.badgeWarn]}>
                <Text style={[s.badgeTxt, c.badge === 'ok' ? s.badgeOkTxt : s.badgeWarnTxt]}>{c.badgeTxt}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.cream },
  header: { paddingTop: 56, paddingHorizontal: 18, paddingBottom: 14, backgroundColor: 'rgba(253,248,245,0.97)', borderBottomWidth: 1, borderBottomColor: C.border },
  h1: { fontSize: 24, fontWeight: '400', color: C.ink },
  h1Em: { fontStyle: 'italic', color: C.roseD },
  sub: { fontSize: 11.5, color: C.inkS, marginTop: 3 },
  scroll: { padding: 14, gap: 12 },
  heroCard: { backgroundColor: 'rgba(255,251,249,0.95)', borderWidth: 1, borderColor: C.border, borderRadius: 20, padding: 24, alignItems: 'center', shadowColor: 'rgba(180,120,110,0.1)', shadowOffset: { width: 0, height: 2 }, shadowRadius: 16 },
  heroName: { fontSize: 22, fontWeight: '400', color: C.ink, marginBottom: 4 },
  heroStatus: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(168,191,176,0.18)', borderWidth: 1, borderColor: 'rgba(168,191,176,0.35)', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 5, marginBottom: 16 },
  heroDot: { width: 6, height: 6, backgroundColor: '#7ab88a', borderRadius: 3 },
  heroStatusTxt: { fontSize: 12, color: '#5a7d65' },
  battRow: { width: '100%', marginBottom: 16, gap: 4 },
  battLbl: { fontSize: 11, color: C.inkS },
  battTrack: { height: 6, backgroundColor: 'rgba(200,160,155,0.15)', borderRadius: 3, overflow: 'hidden' },
  battFill: { height: 6, backgroundColor: C.sage, borderRadius: 3 },
  heroBtn: { width: '100%', padding: 12, borderRadius: 13, borderWidth: 1, borderColor: 'rgba(232,164,154,0.28)', backgroundColor: 'rgba(232,164,154,0.18)', alignItems: 'center' },
  heroBtnTxt: { color: C.roseD, fontSize: 13, fontWeight: '500' },
  sensorGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  sensorBox: { width: '47%', padding: 16, borderRadius: 18 },
  sboxRose: { backgroundColor: 'rgba(232,164,154,0.12)', borderWidth: 1, borderColor: 'rgba(232,164,154,0.2)' },
  sboxLav: { backgroundColor: 'rgba(196,181,212,0.12)', borderWidth: 1, borderColor: 'rgba(196,181,212,0.25)' },
  sboxSage: { backgroundColor: 'rgba(168,191,176,0.12)', borderWidth: 1, borderColor: 'rgba(168,191,176,0.25)' },
  sboxGold: { backgroundColor: 'rgba(212,165,106,0.1)', borderWidth: 1, borderColor: 'rgba(212,165,106,0.22)' },
  sensorIcon: { fontSize: 20, marginBottom: 8 },
  sensorVal: { fontSize: 28, fontWeight: '400', lineHeight: 30 },
  sensorLbl: { fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.6, color: C.inkMu, marginTop: 3 },
  sensorTrend: { fontSize: 11, color: C.inkS, marginTop: 5 },
  section: { backgroundColor: 'rgba(255,251,249,0.95)', borderWidth: 1, borderColor: C.border, borderRadius: 20, padding: 14, shadowColor: 'rgba(180,120,110,0.1)', shadowOffset: { width: 0, height: 2 }, shadowRadius: 16 },
  sectionTtl: { fontSize: 16, fontStyle: 'italic', color: C.ink, marginBottom: 11 },
  histItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 11, paddingHorizontal: 13, backgroundColor: C.blush, borderRadius: 14, marginBottom: 8, borderWidth: 1, borderColor: 'rgba(232,164,154,0.1)' },
  histDot: { width: 10, height: 10, borderRadius: 5 },
  histInfo: { flex: 1 },
  histTitle: { fontSize: 13, fontWeight: '500', color: C.ink },
  histTime: { fontSize: 11, color: C.inkS },
  histScore: { fontSize: 20, fontWeight: '400' },
  calibRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: C.border },
  calibInfo: { flex: 1 },
  calibTitle: { fontSize: 13, fontWeight: '400', color: C.ink },
  calibSub: { fontSize: 11, color: C.inkS },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeOk: { backgroundColor: 'rgba(168,191,176,0.2)' },
  badgeWarn: { backgroundColor: 'rgba(212,165,106,0.15)' },
  badgeTxt: { fontSize: 11 },
  badgeOkTxt: { color: '#5a7d65' },
  badgeWarnTxt: { color: '#9a6f2a' },
});
