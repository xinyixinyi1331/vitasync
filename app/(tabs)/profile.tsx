import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const C = { cream:'#fdf8f5', blush:'#f9e8e4', blush2:'#f2dbd7', rose:'#e8a49a', roseD:'#d4756a', lav:'#c4b5d4', sage:'#a8bfb0', gold:'#d4a56a', ink:'#3d2e2e', inkM:'#6b5050', inkS:'#9d8585', inkMu:'#c4b0b0', border:'rgba(200,160,155,0.2)' };

function Toggle({ on }: { on: boolean }) {
  return (
    <View style={[t.wrap, on && t.on]}>
      <View style={[t.thumb, on && t.thumbOn]} />
    </View>
  );
}
const t = StyleSheet.create({
  wrap: { width: 46, height: 26, borderRadius: 13, backgroundColor: 'rgba(200,160,155,0.2)', borderWidth: 1, borderColor: C.border },
  on: { backgroundColor: C.rose, borderColor: C.rose },
  thumb: { position: 'absolute', top: 3, left: 3, width: 18, height: 18, borderRadius: 9, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.15, shadowRadius: 2 },
  thumbOn: { transform: [{ translateX: 20 }] },
});

const SETTINGS = [
  { group: 'Health data', rows: [
    { icon: '🩺', iconColor: 'rose', title: 'Connected apps', sub: 'Apple Health · Fitbit · Sync active', arrow: true },
    { icon: '📊', iconColor: 'lav', title: 'Export health data', sub: 'Download full session history', arrow: true },
  ]},
  { group: 'Notifications', rows: [
    { icon: '🔔', iconColor: 'rose', title: 'Session reminders', sub: 'Based on your cycle phase', toggle: true, togOn: true },
    { icon: '💊', iconColor: 'sage', title: 'Supplement reminders', sub: 'Inositol, Vitamin D, Magnesium', toggle: true, togOn: false },
  ]},
  { group: 'Privacy', rows: [
    { icon: '🔒', iconColor: 'lav', title: 'Privacy & data', sub: 'GDPR compliant · Your data stays yours', arrow: true },
    { icon: '📋', iconColor: 'gold', title: 'Download my data', sub: 'Export all health records', arrow: true },
  ]},
  { group: 'About', rows: [
    { icon: 'ℹ️', iconColor: 'sage', title: 'About VitaSync', sub: 'v1.0.0 · Built on evidence-based research', arrow: true },
  ]},
];

export default function Profile() {
  return (
    <View style={s.container}>
      <View style={s.hero}>
        <View style={s.avatarRow}>
          <View style={s.avatar}><Text style={s.avatarTxt}>S</Text></View>
          <View>
            <Text style={s.name}>Sofia</Text>
            <Text style={s.sub}>Formally diagnosed PCOS · Ireland</Text>
          </View>
        </View>
        <View style={s.tags}>
          {['Follicular phase', 'Day 8', 'HRV: 61ms', 'Streak: 7d'].map(tag => (
            <View key={tag} style={s.tag}><Text style={s.tagTxt}>{tag}</Text></View>
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {/* stats */}
        <View style={s.statRow}>
          {[{ val: '24', lbl: 'Sessions' }, { val: '7', lbl: 'Day streak' }, { val: '6.4', lbl: 'Avg OI' }].map((st, i) => (
            <View key={i} style={[s.statBox, { flex: 1 }]}>
              <Text style={s.statVal}>{st.val}</Text>
              <Text style={s.statLbl}>{st.lbl}</Text>
            </View>
          ))}
        </View>

        {/* PCOS summary */}
        <View style={s.pcosCard}>
          <Text style={s.pcosTtl}>Your PCOS profile</Text>
          <View style={s.pcosChips}>
            {['Irregular periods','Acne / oily skin','Mood swings','Pelvic pain'].map(c => (
              <View key={c} style={s.pcoChip}><Text style={s.pcoChipTxt}>{c}</Text></View>
            ))}
          </View>
          {[['AMH', '7.2 ng/mL'], ['LH:FSH ratio', '2.8:1'], ['Free Testosterone', '4.1 pg/mL'], ['Insulin sensitivity', 'Mild resistance']].map(([k, v], i) => (
            <View key={i} style={s.infoRow}>
              <Text style={s.infoK}>{k}</Text>
              <Text style={s.infoV}>{v}</Text>
            </View>
          ))}
        </View>

        {/* settings */}
        {SETTINGS.map((grp, gi) => (
          <View key={gi} style={s.settingsGroup}>
            <Text style={s.groupTitle}>{grp.group}</Text>
            {grp.rows.map((row, ri) => (
              <View key={ri} style={s.settingRow}>
                <View style={[s.srIcon, row.iconColor === 'rose' ? s.srRose : row.iconColor === 'lav' ? s.srLav : row.iconColor === 'sage' ? s.srSage : s.srGold]}>
                  <Text>{row.icon}</Text>
                </View>
                <View style={s.srText}>
                  <Text style={s.srTitle}>{row.title}</Text>
                  <Text style={s.srSub}>{row.sub}</Text>
                </View>
                {row.toggle ? <Toggle on={row.togOn!} /> : <Text style={s.srArrow}>›</Text>}
              </View>
            ))}
          </View>
        ))}

        <TouchableOpacity style={s.signOutBtn}>
          <Text style={s.signOutTxt}>Sign out</Text>
        </TouchableOpacity>
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.cream },
  hero: { paddingTop: 50, paddingHorizontal: 20, paddingBottom: 24, backgroundColor: '#f5e0dc' },
  avatarRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 14 },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(242,219,215,0.8)', borderWidth: 2.5, borderColor: 'rgba(232,164,154,0.45)', alignItems: 'center', justifyContent: 'center' },
  avatarTxt: { fontSize: 26, color: C.roseD, fontWeight: '400' },
  name: { fontSize: 26, fontWeight: '400', color: C.ink },
  sub: { fontSize: 12, color: C.inkS, marginTop: 2 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: { paddingHorizontal: 11, paddingVertical: 5, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.55)' },
  tagTxt: { fontSize: 11, color: C.inkM },
  scroll: { padding: 14, gap: 12 },
  statRow: { flexDirection: 'row', gap: 9 },
  statBox: { backgroundColor: 'rgba(255,251,249,0.95)', borderWidth: 1, borderColor: C.border, borderRadius: 20, padding: 13, alignItems: 'center', shadowColor: 'rgba(180,120,110,0.1)', shadowOffset: { width: 0, height: 2 }, shadowRadius: 16 },
  statVal: { fontSize: 26, fontWeight: '400', color: C.roseD },
  statLbl: { fontSize: 10, color: C.inkMu, textTransform: 'uppercase', letterSpacing: 0.6, marginTop: 3 },
  pcosCard: { backgroundColor: 'rgba(255,251,249,0.95)', borderWidth: 1, borderColor: C.border, borderRadius: 20, padding: 16, shadowColor: 'rgba(180,120,110,0.1)', shadowOffset: { width: 0, height: 2 }, shadowRadius: 16 },
  pcosTtl: { fontSize: 17, fontStyle: 'italic', color: C.ink, marginBottom: 10 },
  pcosChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
  pcoChip: { paddingHorizontal: 11, paddingVertical: 5, borderRadius: 20, backgroundColor: 'rgba(232,164,154,0.12)', borderWidth: 1, borderColor: 'rgba(232,164,154,0.2)' },
  pcoChipTxt: { fontSize: 11.5, color: C.roseD },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', fontSize: 12, paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: C.border },
  infoK: { fontSize: 12, color: C.inkS },
  infoV: { fontSize: 12, color: C.ink, fontWeight: '400' },
  settingsGroup: { gap: 7 },
  groupTitle: { fontSize: 10, fontWeight: '500', letterSpacing: 0.9, textTransform: 'uppercase', color: C.inkMu, paddingHorizontal: 4 },
  settingRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: 14, backgroundColor: 'rgba(255,251,249,0.95)', borderWidth: 1, borderColor: C.border, borderRadius: 14 },
  srIcon: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center', fontSize: 15 },
  srRose: { backgroundColor: 'rgba(232,164,154,0.2)' }, srLav: { backgroundColor: 'rgba(196,181,212,0.2)' }, srSage: { backgroundColor: 'rgba(168,191,176,0.2)' }, srGold: { backgroundColor: 'rgba(212,165,106,0.15)' },
  srText: { flex: 1 },
  srTitle: { fontSize: 13, fontWeight: '400', color: C.ink },
  srSub: { fontSize: 11.5, color: C.inkS },
  srArrow: { color: C.inkMu, fontSize: 16 },
  signOutBtn: { width: '100%', paddingVertical: 14, borderRadius: 16, borderWidth: 1.5, borderColor: 'rgba(201,112,96,0.25)', alignItems: 'center', marginTop: 4 },
  signOutTxt: { color: '#c97060', fontSize: 14 },
});
