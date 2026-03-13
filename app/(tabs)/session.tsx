import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const C = { cream:'#fdf8f5', blush:'#f9e8e4', rose:'#e8a49a', roseD:'#d4756a', lav:'#c4b5d4', sage:'#a8bfb0', gold:'#d4a56a', ink:'#3d2e2e', inkM:'#6b5050', inkS:'#9d8585', inkMu:'#c4b0b0', border:'rgba(200,160,155,0.2)' };

function LiveDevice({ active }: { active: boolean }) {
  const rings = [useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current];
  const glow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (active) {
      rings.forEach((r, i) => {
        Animated.loop(Animated.sequence([
          Animated.delay(i * 650),
          Animated.timing(r, { toValue: 1, duration: 2000, easing: Easing.out(Easing.ease), useNativeDriver: true }),
          Animated.timing(r, { toValue: 0, duration: 0, useNativeDriver: true }),
        ])).start();
      });
      Animated.loop(Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 900, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0, duration: 900, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])).start();
    } else {
      rings.forEach(r => { r.stopAnimation(); r.setValue(0); });
      glow.stopAnimation(); glow.setValue(0);
    }
  }, [active]);

  const glowShadow = glow.interpolate({ inputRange: [0, 1], outputRange: [0.55, 0.8] });

  return (
    <View style={d.wrap}>
      <View style={d.halo} />
      {rings.map((r, i) => (
        <Animated.View key={i} style={[d.ring, d[`ring${i}` as 'ring0'], {
          transform: [{ scale: r.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1.25] }) }],
          opacity: r.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.8, 0.3, 0] }),
        }]} />
      ))}
      <Animated.View style={[d.pill, { opacity: active ? glowShadow : 0.7 }]} />
    </View>
  );
}

const d = StyleSheet.create({
  wrap: { width: 120, height: 150, alignItems: 'center', justifyContent: 'center' },
  halo: { position: 'absolute', width: 152, height: 182, borderRadius: 76, backgroundColor: 'rgba(232,164,154,0.1)' },
  ring: { position: 'absolute', borderRadius: 50, borderWidth: 1.5, borderColor: 'rgba(232,164,154,0.3)' },
  ring0: { width: 86, height: 86 },
  ring1: { width: 114, height: 114 },
  ring2: { width: 142, height: 142 },
  pill: { width: 34, height: 98, borderRadius: 17, backgroundColor: C.rose, shadowColor: C.rose, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.55, shadowRadius: 20, zIndex: 2 },
});

export default function Session() {
  const router = useRouter();
  const [running, setRunning] = useState(false);
  const [secs, setSecs] = useState(0);
  const [bpm, setBpm] = useState(78);
  const [pelvic, setPelvic] = useState(72);
  const [temp, setTemp] = useState(36.7);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const metricsRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    setRunning(true);
    timerRef.current = setInterval(() => setSecs(s => s + 1), 1000);
    metricsRef.current = setInterval(() => {
      setBpm(Math.floor(75 + Math.random() * 22));
      setPelvic(Math.floor(65 + Math.random() * 30));
      setTemp(parseFloat((36.6 + Math.random() * 0.5).toFixed(1)));
    }, 1800);
    progressRef.current = setInterval(() => {
      setProgress(p => { if (p >= 100) { clearInterval(progressRef.current!); return 100; } return Math.min(p + 1.2, 100); });
    }, 500);
  };

  const stop = () => {
    setRunning(false);
    [timerRef, metricsRef, progressRef].forEach(r => { if (r.current) clearInterval(r.current); });
  };

  const finish = () => { stop(); router.push('/(tabs)/report'); };

  const fmt = (s: number) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.h1}>Live session</Text>
        {running && (
          <View style={s.recBadge}>
            <View style={s.recDot} />
            <Text style={s.recTxt}>Recording</Text>
          </View>
        )}
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {/* device animation */}
        <View style={s.liveCenter}>
          <LiveDevice active={running} />
        </View>

        {/* timer */}
        <View style={s.timerWrap}>
          <Text style={s.timer}>{fmt(secs)}</Text>
          <Text style={s.timerLbl}>{running ? 'Session in progress…' : secs > 0 ? 'Session paused' : 'Ready to begin'}</Text>
        </View>

        {/* live metrics */}
        <View style={s.metricsRow}>
          <View style={[s.lm, s.lmRose]}>
            <Text style={[s.lmVal, { color: C.roseD }]}>{bpm}</Text>
            <Text style={s.lmLbl}>BPM</Text>
          </View>
          <View style={[s.lm, s.lmLav]}>
            <Text style={[s.lmVal, { color: '#8870a8' }]}>{pelvic}%</Text>
            <Text style={s.lmLbl}>Pelvic</Text>
          </View>
          <View style={[s.lm, s.lmSage]}>
            <Text style={[s.lmVal, { color: '#5a7d65' }]}>{temp}°</Text>
            <Text style={s.lmLbl}>Temp</Text>
          </View>
        </View>

        {/* progress bar */}
        <View style={s.pbarWrap}>
          <View style={s.pbarLabels}>
            <Text style={s.pbarLbl}>Session progress</Text>
            <Text style={s.pbarLbl}>{Math.round(progress)}%</Text>
          </View>
          <View style={s.pbarTrack}>
            <View style={[s.pbarFill, { width: `${progress}%` }]} />
          </View>
        </View>

        {/* buttons */}
        <View style={s.btnRow}>
          {!running ? (
            <TouchableOpacity style={[s.btnP, { flex: 1 }]} onPress={start}>
              <Text style={s.btnPTxt}>{secs > 0 ? '▶ Resume' : '▶ Begin session'}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[s.btnG, { flex: 1 }]} onPress={stop}>
              <Text style={s.btnGTxt}>⏸ Pause</Text>
            </TouchableOpacity>
          )}
          {secs > 0 && (
            <TouchableOpacity style={[s.btnP, { flex: 1, backgroundColor: C.sage }]} onPress={finish}>
              <Text style={s.btnPTxt}>✓ End & report</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* tips */}
        <View style={s.tipCard}>
          <Text style={s.tipTtl}>💡 Session tip</Text>
          <Text style={s.tipBody}>Try 4-7-8 breathing: inhale 4s, hold 7s, exhale 8s. This activates the vagus nerve and can raise HRV by up to 15%.</Text>
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.cream },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 56, paddingHorizontal: 18, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: C.border, backgroundColor: 'rgba(253,248,245,0.97)' },
  h1: { fontSize: 22, fontStyle: 'italic', fontWeight: '400', color: C.ink },
  recBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(249,232,228,0.9)', borderWidth: 1, borderColor: 'rgba(232,164,154,0.3)', borderRadius: 20, paddingHorizontal: 11, paddingVertical: 5 },
  recDot: { width: 7, height: 7, backgroundColor: C.rose, borderRadius: 3.5 },
  recTxt: { fontSize: 11.5, color: C.roseD },
  scroll: { paddingHorizontal: 18, paddingTop: 18 },
  liveCenter: { alignItems: 'center', marginBottom: 20 },
  timerWrap: { alignItems: 'center', marginBottom: 18 },
  timer: { fontSize: 62, fontWeight: '300', color: C.ink, lineHeight: 64 },
  timerLbl: { fontSize: 12, color: C.inkS, marginTop: 2 },
  metricsRow: { flexDirection: 'row', gap: 9, marginBottom: 18 },
  lm: { flex: 1, borderRadius: 15, padding: 13, alignItems: 'center', borderWidth: 1 },
  lmRose: { backgroundColor: 'rgba(249,232,228,0.8)', borderColor: 'rgba(232,164,154,0.12)' },
  lmLav: { backgroundColor: 'rgba(220,210,235,0.5)', borderColor: 'rgba(196,181,212,0.2)' },
  lmSage: { backgroundColor: 'rgba(168,191,176,0.12)', borderColor: 'rgba(168,191,176,0.18)' },
  lmVal: { fontSize: 28, fontWeight: '400', lineHeight: 30 },
  lmLbl: { fontSize: 10, color: C.inkMu, marginTop: 3, textTransform: 'uppercase', letterSpacing: 0.4 },
  pbarWrap: { marginBottom: 22 },
  pbarLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  pbarLbl: { fontSize: 11, color: C.inkS },
  pbarTrack: { height: 7, backgroundColor: 'rgba(200,160,155,0.15)', borderRadius: 4, overflow: 'hidden' },
  pbarFill: { height: 7, backgroundColor: C.rose, borderRadius: 4 },
  btnRow: { flexDirection: 'row', gap: 10, marginBottom: 18 },
  btnP: { paddingVertical: 15, borderRadius: 16, backgroundColor: C.roseD, alignItems: 'center', shadowColor: C.roseD, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 14 },
  btnPTxt: { color: '#fff', fontSize: 15, fontWeight: '500' },
  btnG: { paddingVertical: 14, borderRadius: 16, borderWidth: 1.5, borderColor: C.border, alignItems: 'center' },
  btnGTxt: { color: C.inkS, fontSize: 14 },
  tipCard: { backgroundColor: 'rgba(249,232,228,0.5)', borderWidth: 1, borderColor: 'rgba(196,181,212,0.3)', borderRadius: 18, padding: 15 },
  tipTtl: { fontSize: 13, fontWeight: '500', color: '#8870a8', marginBottom: 6 },
  tipBody: { fontSize: 13, color: C.inkM, lineHeight: 20 },
});
