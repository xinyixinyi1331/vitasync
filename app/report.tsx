import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const C = { plum: '#1E1228', berry: '#5C2340', rose: '#C96B6B', blush: '#F0D4D0', lavender: '#9B7DB8', sage: '#6EA87A', cream: '#FBF5F2', gold: '#C89A50' };
const SESSION = { duration: '4:32', oi: 74, oiDelta: '+19', hrv: 61, hrvDelta: '+7', emg: 0.48, cortisol: 'Low', phase: 'Follicular' };
const RECS = [
  { icon: '🧘', title: 'Breathwork', body: 'Try 10 min box breathing tomorrow morning to maintain HRV gains.' },
  { icon: '💤', title: 'Sleep', body: "7–8h sleep tonight will consolidate today's autonomic improvements." },
  { icon: '🥗', title: 'Nutrition', body: 'Omega-3 rich foods support HRV. Consider salmon or walnuts today.' },
  { icon: '📅', title: 'Next session', body: 'Follicular phase is optimal — aim for a session in the next 48h.' },
];

function ScoreCircle({ score }: { score: number }) {
  const color = score > 70 ? C.sage : score > 40 ? C.gold : C.rose;
  return (
    <View style={sc.wrap}>
      <View style={[sc.ring, { borderColor: color + '60' }]}>
        <View style={[sc.fill, { backgroundColor: color + '25', width: 110 * (score / 100) }]} />
        <Text style={[sc.score, { color }]}>{score}</Text>
        <Text style={sc.label}>/ 100</Text>
      </View>
    </View>
  );
}

const sc = StyleSheet.create({
  wrap: { alignItems: 'center' },
  ring: { width: 110, height: 110, borderRadius: 55, borderWidth: 3, alignItems: 'center', justifyContent: 'center', backgroundColor: C.berry + '40', overflow: 'hidden' },
  fill: { position: 'absolute', left: 0, height: 110 },
  score: { fontSize: 34, fontWeight: '800', zIndex: 1 },
  label: { color: C.blush + '80', fontSize: 12, zIndex: 1 },
});

function MetricRow({ label, value, delta, color }: { label: string, value: string, delta: string, color: string }) {
  return (
    <View style={m.row}>
      <Text style={m.label}>{label}</Text>
      <View style={m.right}>
        <Text style={[m.val, { color }]}>{value}</Text>
        <Text style={m.delta}>{delta}</Text>
      </View>
    </View>
  );
}

const m = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: C.berry },
  label: { color: C.blush + 'AA', fontSize: 14 },
  right: { alignItems: 'flex-end' },
  val: { fontSize: 16, fontWeight: '700' },
  delta: { color: C.sage, fontSize: 11, marginTop: 2 },
});

export default function Report() {
  const router = useRouter();
  return (
    <View style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.push('/dashboard')} style={s.back}><Text style={s.backTxt}>←</Text></TouchableOpacity>
        <Text style={s.title}>Session Report</Text>
        <TouchableOpacity><Text style={s.share}>Share</Text></TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        <View style={s.heroCard}>
          <View style={s.heroTop}>
            <View>
              <Text style={s.heroLabel}>Session complete ✨</Text>
              <Text style={s.heroTime}>{SESSION.duration} min  ·  {SESSION.phase} phase</Text>
            </View>
            <ScoreCircle score={SESSION.oi} />
          </View>
          <View style={s.divider} />
          <View style={s.deltaRow}>
            {[{ val: SESSION.oiDelta, label: 'OI change' }, { val: SESSION.hrvDelta + ' ms', label: 'HRV gain' }, { val: SESSION.cortisol, label: 'Cortisol proxy' }].map((d, i) => (
              <View key={i} style={s.deltaItem}>
                <Text style={s.deltaVal}>{d.val}</Text>
                <Text style={s.deltaLabel}>{d.label}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={s.card}>
          <Text style={s.cardTitle}>Session Metrics</Text>
          <MetricRow label="Oxytocin Index" value={`${SESSION.oi}/100`} delta={`${SESSION.oiDelta} vs baseline`} color={C.sage} />
          <MetricRow label="HRV (RMSSD)" value={`${SESSION.hrv} ms`} delta={`${SESSION.hrvDelta} ms vs start`} color={C.lavender} />
          <MetricRow label="EMG RMS" value={`${SESSION.emg} µV`} delta="+14% peak activation" color={C.rose} />
          <MetricRow label="Cortisol Proxy" value={SESSION.cortisol} delta="↓ 18% estimated reduction" color={C.sage} />
        </View>
        <View style={s.aiCard}>
          <Text style={s.aiTitle}>🤖 AI Analysis</Text>
          <Text style={s.aiTxt}>Excellent session. Your HRV increased steadily throughout, indicating strong parasympathetic activation. The EMG peak pattern suggests effective pelvic floor engagement, supporting oxytocin release pathways. Your Follicular phase timing amplified your OT sensitivity by an estimated 20%.</Text>
        </View>
        <View style={s.card}>
          <Text style={s.cardTitle}>Recommendations</Text>
          {RECS.map((r, i) => (
            <View key={i} style={s.rec}>
              <Text style={s.recIcon}>{r.icon}</Text>
              <View style={s.recRight}>
                <Text style={s.recTitle}>{r.title}</Text>
                <Text style={s.recBody}>{r.body}</Text>
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity style={s.doneBtn} onPress={() => router.push('/dashboard')}>
          <Text style={s.doneTxt}>Back to Dashboard</Text>
        </TouchableOpacity>
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
  share: { color: C.lavender, fontSize: 14, fontWeight: '600' },
  scroll: { paddingHorizontal: 20, gap: 16 },
  heroCard: { backgroundColor: C.berry + '50', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: C.lavender + '20' },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  heroLabel: { color: C.cream, fontSize: 16, fontWeight: '700' },
  heroTime: { color: C.blush + '80', fontSize: 12, marginTop: 4 },
  divider: { height: 1, backgroundColor: C.berry, marginBottom: 16 },
  deltaRow: { flexDirection: 'row', justifyContent: 'space-around' },
  deltaItem: { alignItems: 'center' },
  deltaVal: { color: C.sage, fontSize: 18, fontWeight: '800' },
  deltaLabel: { color: C.blush + '80', fontSize: 11, marginTop: 2 },
  card: { backgroundColor: C.berry + '50', borderRadius: 18, padding: 18, borderWidth: 1, borderColor: C.lavender + '20' },
  cardTitle: { color: C.blush + 'CC', fontSize: 12, fontWeight: '700', letterSpacing: 0.8, marginBottom: 4, textTransform: 'uppercase' },
  aiCard: { backgroundColor: C.lavender + '20', borderRadius: 16, padding: 18, borderWidth: 1, borderColor: C.lavender + '30' },
  aiTitle: { color: C.lavender, fontSize: 14, fontWeight: '700', marginBottom: 10 },
  aiTxt: { color: C.blush + 'CC', fontSize: 13, lineHeight: 20 },
  rec: { flexDirection: 'row', gap: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: C.berry },
  recIcon: { fontSize: 22, marginTop: 2 },
  recRight: { flex: 1 },
  recTitle: { color: C.cream, fontSize: 14, fontWeight: '700', marginBottom: 2 },
  recBody: { color: C.blush + 'AA', fontSize: 12, lineHeight: 17 },
  doneBtn: { paddingVertical: 16, borderRadius: 16, backgroundColor: C.rose, alignItems: 'center' },
  doneTxt: { color: C.cream, fontSize: 16, fontWeight: '700' },
});
