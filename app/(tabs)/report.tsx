import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const C = { cream:'#fdf8f5', blush:'#f9e8e4', rose:'#e8a49a', roseD:'#d4756a', lav:'#c4b5d4', sage:'#a8bfb0', gold:'#d4a56a', ink:'#3d2e2e', inkM:'#6b5050', inkS:'#9d8585', inkMu:'#c4b0b0', border:'rgba(200,160,155,0.2)' };

const DELTAS = [
  { val: '+0.9', lbl: 'Oxytocin', delta: '↑ +14.5%', cls: 'g' },
  { val: '−4.2', lbl: 'Cortisol', delta: '↓ Good', cls: 'g' },
  { val: '+8ms', lbl: 'HRV', delta: '↑ Improved', cls: 'l' },
];

const IMPACT = [
  { icon: '💓', color: 'r', title: 'Oxytocin response', sub: 'Peak activation at 3:42 · Sustained for 1.8 min', delta: '+14%', up: true },
  { icon: '🧠', color: 's', title: 'Cortisol suppression', sub: 'Post-session drop estimated at −4.2 µg/dL', delta: '↓ 23%', up: false },
  { icon: '🌊', color: 'l', title: 'HRV improvement', sub: 'Autonomic balance improved throughout session', delta: '+8ms', up: true },
];

const RECOS = [
  { icon: '🫁', title: 'Box breathing', body: 'Continue 4-7-8 breathing daily to consolidate HRV gains.' },
  { icon: '💤', title: 'Sleep tonight', body: '7.5h sleep will reinforce today\'s autonomic improvements.' },
  { icon: '🥗', title: 'Nutrition', body: 'Omega-3 and magnesium support HRV. Salmon, walnuts, dark chocolate.' },
  { icon: '📅', title: 'Next session', body: 'Follicular phase is optimal — aim for a session within 48h.' },
];

export default function Report() {
  return (
    <View style={s.container}>
      <View style={s.header}>
        <View style={s.check}><Text style={s.checkIcon}>✓</Text></View>
        <View>
          <Text style={s.h2}>Session <Text style={s.h2Em}>complete</Text></Text>
          <Text style={s.sub}>Today · 09:14 · 6 min 08 sec · Follicular phase</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {/* delta row */}
        <View style={s.deltaRow}>
          {DELTAS.map((d, i) => (
            <View key={i} style={s.dm}>
              <Text style={[s.dmVal, { color: d.cls === 'g' ? '#5a7d65' : d.cls === 'l' ? '#8870a8' : C.roseD }]}>{d.val}</Text>
              <Text style={s.dmLbl}>{d.lbl}</Text>
              <Text style={[s.dmDelta, { color: '#5a7d65' }]}>{d.delta}</Text>
            </View>
          ))}
        </View>

        {/* impact */}
        <View style={s.card}>
          <Text style={s.cardTtl}>Session impact</Text>
          {IMPACT.map((item, i) => (
            <View key={i} style={[s.impRow, i === IMPACT.length - 1 && { borderBottomWidth: 0 }]}>
              <View style={[s.impIcon, item.color === 'r' ? s.impR : item.color === 's' ? s.impS : s.impL]}>
                <Text>{item.icon}</Text>
              </View>
              <View style={s.impText}>
                <Text style={s.impTitle}>{item.title}</Text>
                <Text style={s.impSub}>{item.sub}</Text>
              </View>
              <Text style={[s.impDelta, item.up ? s.impUp : s.impDn]}>{item.delta}</Text>
            </View>
          ))}
        </View>

        {/* AI analysis */}
        <View style={s.aiBlock}>
          <Text style={s.aiTag}>AI ANALYSIS</Text>
          <Text style={s.aiBody}>
            <Text style={s.aiStrong}>Excellent session.</Text> Your HRV increased steadily, indicating strong parasympathetic activation. EMG peak patterns suggest effective pelvic floor engagement, supporting oxytocin release pathways.{'\n\n'}
            Your <Text style={s.aiStrong}>Follicular phase timing</Text> amplified OT sensitivity by an estimated ~20%. Cortisol suppression exceeded typical session average.
          </Text>
        </View>

        {/* recommendations */}
        <View style={s.card}>
          <Text style={s.cardTtl}>Recommendations</Text>
          {RECOS.map((r, i) => (
            <View key={i} style={[s.ri, i === RECOS.length - 1 && { marginBottom: 0 }]}>
              <Text style={s.riIcon}>{r.icon}</Text>
              <View style={s.riBody}>
                <Text style={s.riTitle}>{r.title}</Text>
                <Text style={s.riSub}>{r.body}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={s.shareRow}>
          <TouchableOpacity style={s.shareBtn}><Text style={s.shareTxt}>Share report</Text></TouchableOpacity>
          <TouchableOpacity style={s.btnP}><Text style={s.btnPTxt}>Start new session →</Text></TouchableOpacity>
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.cream },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingTop: 56, paddingHorizontal: 18, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: C.border, backgroundColor: 'rgba(253,248,245,0.97)' },
  check: { width: 54, height: 54, borderRadius: 27, backgroundColor: C.sage, alignItems: 'center', justifyContent: 'center', shadowColor: 'rgba(168,191,176,0.45)', shadowOffset: { width: 0, height: 4 }, shadowRadius: 12 },
  checkIcon: { fontSize: 24, color: '#fff' },
  h2: { fontSize: 27, fontWeight: '400', color: C.ink },
  h2Em: { fontStyle: 'italic', color: C.roseD },
  sub: { fontSize: 12, color: C.inkS },
  scroll: { padding: 18 },
  deltaRow: { flexDirection: 'row', gap: 9, marginBottom: 14 },
  dm: { flex: 1, backgroundColor: C.blush, borderWidth: 1, borderColor: 'rgba(232,164,154,0.15)', borderRadius: 15, padding: 13, alignItems: 'center' },
  dmVal: { fontSize: 25, fontWeight: '400', lineHeight: 28 },
  dmLbl: { fontSize: 9.5, color: C.inkMu, textTransform: 'uppercase', letterSpacing: 0.4, marginTop: 3 },
  dmDelta: { fontSize: 11, marginTop: 3 },
  card: { backgroundColor: 'rgba(255,251,249,0.95)', borderWidth: 1, borderColor: C.border, borderRadius: 20, padding: 15, marginBottom: 12, shadowColor: 'rgba(180,120,110,0.1)', shadowOffset: { width: 0, height: 2 }, shadowRadius: 16 },
  cardTtl: { fontSize: 18, fontStyle: 'italic', color: C.ink, marginBottom: 11 },
  impRow: { flexDirection: 'row', alignItems: 'center', gap: 11, paddingVertical: 9, borderBottomWidth: 1, borderBottomColor: C.border },
  impIcon: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  impR: { backgroundColor: 'rgba(232,164,154,0.2)' }, impS: { backgroundColor: 'rgba(168,191,176,0.2)' }, impL: { backgroundColor: 'rgba(196,181,212,0.2)' },
  impText: { flex: 1 },
  impTitle: { fontSize: 12, fontWeight: '500', color: C.ink },
  impSub: { fontSize: 11, color: C.inkS },
  impDelta: { fontSize: 18, fontWeight: '400' },
  impUp: { color: '#5a7d65' }, impDn: { color: C.roseD },
  aiBlock: { backgroundColor: 'rgba(249,232,228,0.5)', borderWidth: 1, borderColor: 'rgba(196,181,212,0.3)', borderRadius: 18, padding: 15, marginBottom: 12 },
  aiTag: { fontSize: 9, fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase', color: '#8870a8', marginBottom: 6 },
  aiBody: { fontSize: 13, color: C.inkM, lineHeight: 21 },
  aiStrong: { color: C.roseD, fontWeight: '500' },
  ri: { flexDirection: 'row', gap: 9, alignItems: 'flex-start', paddingVertical: 9, paddingHorizontal: 11, backgroundColor: C.blush, borderRadius: 12, marginBottom: 7, borderWidth: 1, borderColor: 'rgba(232,164,154,0.1)' },
  riIcon: { fontSize: 14, marginTop: 1 },
  riBody: { flex: 1 },
  riTitle: { fontSize: 12, fontWeight: '500', color: C.ink, marginBottom: 1 },
  riSub: { fontSize: 12, color: C.inkS, lineHeight: 16 },
  shareRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  shareBtn: { flex: 0.8, paddingVertical: 14, borderRadius: 16, borderWidth: 1.5, borderColor: C.border, alignItems: 'center' },
  shareTxt: { color: C.inkS, fontSize: 13.5 },
  btnP: { flex: 1, paddingVertical: 15, borderRadius: 16, backgroundColor: C.roseD, alignItems: 'center', shadowColor: C.roseD, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 14 },
  btnPTxt: { color: '#fff', fontSize: 14, fontWeight: '500' },
});
