import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const C = { plum: '#1E1228', berry: '#5C2340', rose: '#C96B6B', blush: '#F0D4D0', lavender: '#9B7DB8', sage: '#6EA87A', cream: '#FBF5F2', gold: '#C89A50' };

function PulseRing({ active }: { active: boolean }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (active) {
      Animated.loop(Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 1200, easing: Easing.out(Easing.ease), useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 600, easing: Easing.in(Easing.ease), useNativeDriver: true }),
      ])).start();
    } else { anim.stopAnimation(); anim.setValue(0); }
  }, [active]);
  const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.5] });
  const opacity = anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.6, 0.2, 0] });
  return (
    <View style={p.wrap}>
      {active && <Animated.View style={[p.ring, { transform: [{ scale }], opacity }]} />}
      <View style={[p.core, { backgroundColor: active ? C.rose : C.berry }]}>
        <Text style={p.icon}>{active ? '💓' : '▶'}</Text>
      </View>
    </View>
  );
}

const p = StyleSheet.create({
  wrap: { width: 120, height: 120, alignItems: 'center', justifyContent: 'center' },
  ring: { position: 'absolute', width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: C.rose },
  core: { width: 88, height: 88, borderRadius: 44, alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 32 },
});

function LiveBar({ label, value, color, unit }: { label: string, value: number, color: string, unit: string }) {
  return (
    <View style={b.wrap}>
      <View style={b.top}>
        <Text style={b.label}>{label}</Text>
        <Text style={[b.val, { color }]}>{value}{unit}</Text>
      </View>
      <View style={b.track}><View style={[b.fill, { width: `${value}%`, backgroundColor: color }]} /></View>
    </View>
  );
}

const b = StyleSheet.create({
  wrap: { marginBottom: 14 },
  top: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  label: { color: C.blush + 'AA', fontSize: 13 },
  val: { fontSize: 14, fontWeight: '700' },
  track: { height: 6, backgroundColor: C.berry, borderRadius: 3, overflow: 'hidden' },
  fill: { height: 6, borderRadius: 3 },
});

export default function Session() {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [hrv, setHrv] = useState(54);
  const [emg, setEmg] = useState(38);
  const [oi, setOi] = useState(55);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (active) {
      timerRef.current = setInterval(() => {
        setElapsed(e => e + 1);
        setHrv(v => Math.min(99, v + (Math.random() > 0.5 ? 1 : -1)));
        setEmg(v => Math.min(99, v + (Math.random() > 0.4 ? 2 : -1)));
        setOi(v => Math.min(99, v + (Math.random() > 0.3 ? 1 : 0)));
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [active]);

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <View style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.back}><Text style={s.backTxt}>←</Text></TouchableOpacity>
        <Text style={s.title}>Live Session</Text>
        <View style={[s.statusDot, { backgroundColor: active ? C.sage : C.berry }]} />
      </View>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <View style={s.heroCard}>
          <Text style={s.timer}>{fmt(elapsed)}</Text>
          <Text style={s.timerLabel}>{active ? 'Recording…' : elapsed > 0 ? 'Paused' : 'Ready to start'}</Text>
          <View style={{ marginVertical: 20 }}><PulseRing active={active} /></View>
          <TouchableOpacity style={[s.mainBtn, { backgroundColor: active ? C.gold : C.rose }]} onPress={() => setActive(!active)}>
            <Text style={s.mainBtnTxt}>{active ? '⏸  Pause' : elapsed > 0 ? '▶  Resume' : '▶  Start'}</Text>
          </TouchableOpacity>
        </View>
        <View style={s.card}>
          <Text style={s.cardTitle}>Live Signals</Text>
          <LiveBar label="HRV (RMSSD)" value={hrv} color={C.lavender} unit=" ms" />
          <LiveBar label="EMG Activation" value={emg} color={C.rose} unit="%" />
          <LiveBar label="Oxytocin Index" value={oi} color={C.sage} unit="" />
        </View>
        <View style={s.tipCard}>
          <Text style={s.tipTitle}>💡 Tip for this session</Text>
          <Text style={s.tipTxt}>Deep diaphragmatic breathing (4-7-8 pattern) activates the vagus nerve and can raise your HRV by up to 15%.</Text>
        </View>
        {elapsed >= 30 && (
          <TouchableOpacity style={s.finishBtn} onPress={() => { setActive(false); router.push('/report'); }}>
            <Text style={s.finishTxt}>✓  Finish & See Report</Text>
          </TouchableOpacity>
        )}
        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.plum },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 60, paddingBottom: 16 },
  back: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  backTxt: { color: C.blush, fontSize: 22 },
  title: { color: C.cream, fontSize: 18, fontWeight: '700' },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  scroll: { paddingHorizontal: 20, gap: 16 },
  heroCard: { backgroundColor: C.berry + '50', borderRadius: 20, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: C.lavender + '20' },
  timer: { fontSize: 52, fontWeight: '800', color: C.cream },
  timerLabel: { color: C.blush + '80', fontSize: 13, marginTop: 4 },
  mainBtn: { paddingHorizontal: 40, paddingVertical: 14, borderRadius: 28 },
  mainBtnTxt: { color: C.cream, fontSize: 16, fontWeight: '700' },
  card: { backgroundColor: C.berry + '50', borderRadius: 18, padding: 18, borderWidth: 1, borderColor: C.lavender + '20' },
  cardTitle: { color: C.blush + 'CC', fontSize: 12, fontWeight: '700', letterSpacing: 0.8, marginBottom: 14, textTransform: 'uppercase' },
  tipCard: { backgroundColor: C.lavender + '20', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: C.lavender + '30' },
  tipTitle: { color: C.lavender, fontSize: 13, fontWeight: '700', marginBottom: 8 },
  tipTxt: { color: C.blush + 'CC', fontSize: 13, lineHeight: 19 },
  finishBtn: { paddingVertical: 16, borderRadius: 16, backgroundColor: C.sage, alignItems: 'center' },
  finishTxt: { color: C.cream, fontSize: 16, fontWeight: '700' },
});
