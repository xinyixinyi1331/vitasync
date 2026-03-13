import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const C = { plum: '#1E1228', berry: '#5C2340', rose: '#C96B6B', blush: '#F0D4D0', lavender: '#9B7DB8', sage: '#6EA87A', cream: '#FBF5F2', gold: '#C89A50' };
const OI_SCORE = 72;
const HRV = 58;
const PHASE = 'Follicular';
const WEEK_DATA = [45, 62, 58, 71, 68, 72, 69];
const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const MAX_BAR = 80;

function OIGauge({ score }: { score: number }) {
  const color = score > 70 ? C.sage : score > 40 ? C.gold : C.rose;
  return (
    <View style={g.wrap}>
      <View style={g.ring}>
        <View style={[g.fill, { backgroundColor: color + '30', width: 140 * (score / 100), borderRadius: 70 }]} />
        <View style={g.center}>
          <Text style={[g.score, { color }]}>{score}</Text>
          <Text style={g.label}>Oxytocin Index</Text>
        </View>
      </View>
      <Text style={g.status}>{score > 70 ? '✨ Great' : score > 40 ? '💛 Moderate' : '🔴 Low'}</Text>
    </View>
  );
}

const g = StyleSheet.create({
  wrap: { alignItems: 'center', marginVertical: 8 },
  ring: { width: 140, height: 140, borderRadius: 70, borderWidth: 3, borderColor: C.lavender + '50', backgroundColor: C.berry + '40', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  fill: { position: 'absolute', left: 0, height: 140 },
  center: { alignItems: 'center', zIndex: 1 },
  score: { fontSize: 40, fontWeight: '800' },
  label: { color: C.blush + 'AA', fontSize: 11, marginTop: 2 },
  status: { color: C.blush, fontSize: 14, marginTop: 10, fontWeight: '600' },
});

export default function Dashboard() {
  const router = useRouter();
  return (
    <View style={s.container}>
      <View style={s.header}>
        <View>
          <Text style={s.greeting}>Good evening 🌙</Text>
          <Text style={s.name}>Xinyi</Text>
        </View>
        <TouchableOpacity style={s.avatar}><Text style={s.avatarTxt}>X</Text></TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        <View style={s.phaseBanner}>
          <Text style={s.phaseEmoji}>🌱</Text>
          <View>
            <Text style={s.phaseLabel}>Current phase</Text>
            <Text style={s.phaseVal}>{PHASE} — Day 8</Text>
          </View>
          <Text style={s.phaseNote}>OT sensitivity ↑</Text>
        </View>
        <View style={s.card}>
          <Text style={s.cardTitle}>Today's Score</Text>
          <OIGauge score={OI_SCORE} />
          <Text style={s.cardNote}>Based on last session · 2h ago</Text>
        </View>
        <View style={s.row}>
          {[{ icon: '💓', val: String(HRV), label: 'HRV (ms)', delta: '↑ +4 vs avg' }, { icon: '🌡️', val: '36.7°', label: 'Basal Temp', delta: '↔ normal' }, { icon: '⚡', val: '0.42', label: 'EMG RMS', delta: '↑ +12%' }].map((m, i) => (
            <View key={i} style={[s.metricCard, { flex: 1 }]}>
              <Text style={s.metricIcon}>{m.icon}</Text>
              <Text style={s.metricVal}>{m.val}</Text>
              <Text style={s.metricLabel}>{m.label}</Text>
              <Text style={s.metricDelta}>{m.delta}</Text>
            </View>
          ))}
        </View>
        <View style={s.card}>
          <Text style={s.cardTitle}>Weekly OI Trend</Text>
          <View style={s.chartWrap}>
            {WEEK_DATA.map((v, i) => (
              <View key={i} style={s.barCol}>
                <View style={[s.bar, { height: (v / MAX_BAR) * 80, backgroundColor: i === 6 ? C.rose : C.lavender + '80' }]} />
                <Text style={s.barLabel}>{DAYS[i]}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={s.card}>
          <Text style={s.cardTitle}>AI Insights</Text>
          {[{ icon: '✅', txt: 'HRV up 8% this week — great autonomic tone' }, { icon: '💡', txt: 'Follicular phase boosts OT sensitivity by ~20%' }, { icon: '🎯', txt: 'Sessions during morning yield +15% higher OI' }].map((item, i) => (
            <View key={i} style={s.insight}>
              <Text style={s.insightIcon}>{item.icon}</Text>
              <Text style={s.insightTxt}>{item.txt}</Text>
            </View>
          ))}
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
      <TouchableOpacity style={s.fab} onPress={() => router.push('/session')}>
        <Text style={s.fabTxt}>▶  Start Session</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.plum },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 60, paddingBottom: 16 },
  greeting: { color: C.blush + 'AA', fontSize: 13 },
  name: { color: C.cream, fontSize: 22, fontWeight: '800' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: C.rose, alignItems: 'center', justifyContent: 'center' },
  avatarTxt: { color: C.cream, fontWeight: '700', fontSize: 16 },
  scroll: { paddingHorizontal: 20, gap: 16 },
  phaseBanner: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: C.sage + '25', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: C.sage + '40' },
  phaseEmoji: { fontSize: 24 },
  phaseLabel: { color: C.sage + 'AA', fontSize: 11, fontWeight: '600' },
  phaseVal: { color: C.cream, fontSize: 14, fontWeight: '700' },
  phaseNote: { marginLeft: 'auto', color: C.sage, fontSize: 12, fontWeight: '600' },
  card: { backgroundColor: C.berry + '50', borderRadius: 18, padding: 18, borderWidth: 1, borderColor: C.lavender + '20' },
  cardTitle: { color: C.blush + 'CC', fontSize: 12, fontWeight: '700', letterSpacing: 0.8, marginBottom: 12, textTransform: 'uppercase' },
  cardNote: { color: C.blush + '60', fontSize: 11, textAlign: 'center', marginTop: 8 },
  row: { flexDirection: 'row', gap: 10 },
  metricCard: { backgroundColor: C.berry + '50', borderRadius: 16, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: C.lavender + '20' },
  metricIcon: { fontSize: 20, marginBottom: 4 },
  metricVal: { color: C.cream, fontSize: 20, fontWeight: '800' },
  metricLabel: { color: C.blush + '80', fontSize: 10, marginTop: 2 },
  metricDelta: { color: C.sage, fontSize: 10, marginTop: 4, fontWeight: '600' },
  chartWrap: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, height: 100, paddingTop: 10 },
  barCol: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', gap: 4 },
  bar: { width: '100%', borderRadius: 4, minHeight: 4 },
  barLabel: { color: C.blush + '80', fontSize: 10 },
  insight: { flexDirection: 'row', gap: 10, alignItems: 'flex-start', marginBottom: 10 },
  insightIcon: { fontSize: 16 },
  insightTxt: { color: C.blush + 'CC', fontSize: 13, lineHeight: 18, flex: 1 },
  fab: { position: 'absolute', bottom: 36, alignSelf: 'center', paddingHorizontal: 36, paddingVertical: 16, borderRadius: 32, backgroundColor: C.rose, shadowColor: C.rose, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.5, shadowRadius: 16 },
  fabTxt: { color: C.cream, fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
});
