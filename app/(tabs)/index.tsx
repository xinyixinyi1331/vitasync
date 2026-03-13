import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const C = { cream:'#fdf8f5', blush:'#f9e8e4', blush2:'#f2dbd7', rose:'#e8a49a', roseD:'#d4756a', lav:'#c4b5d4', sage:'#a8bfb0', gold:'#d4a56a', ink:'#3d2e2e', inkM:'#6b5050', inkS:'#9d8585', inkMu:'#c4b0b0', border:'rgba(200,160,155,0.2)' };

const MODAL_DATA: Record<string, { title: string, sub: string, items: { n: string, v: string, u: string, c: string, p: number }[] }> = {
  oxy: { title: 'Oxytocin Index', sub: 'Linked to session frequency · PCOS baseline: 5.8/10',
    items: [{ n:'Current',v:'6.2',u:'/10',c:'#d4756a',p:62 },{ n:'PCOS Avg',v:'5.8',u:'/10',c:'#c4b0b0',p:58 },{ n:'Last Session',v:'7.1',u:'/10',c:'#d4756a',p:71 },{ n:'30-Day High',v:'7.9',u:'/10',c:'#d4a56a',p:79 }] },
  cort: { title: 'Cortisol Level', sub: 'HPA axis · Elevated = adrenal androgen risk in PCOS',
    items: [{ n:'Current',v:'18.4',u:'µg/dL',c:'#c97060',p:74 },{ n:'Normal Max',v:'15.0',u:'µg/dL',c:'#c4b0b0',p:60 },{ n:'7-Day Avg',v:'17.1',u:'µg/dL',c:'#c97060',p:68 },{ n:'Post-Session',v:'13.2',u:'µg/dL',c:'#7ab88a',p:53 }] },
  prog: { title: 'Progesterone', sub: 'Luteal peak · Deficiency linked to anovulation in PCOS',
    items: [{ n:'Current',v:'14.2',u:'ng/mL',c:'#8870a8',p:65 },{ n:'Luteal Norm',v:'10–25',u:'ng/mL',c:'#7ab88a',p:55 },{ n:'Last Peak',v:'16.8',u:'ng/mL',c:'#8870a8',p:72 },{ n:'Cycle Avg',v:'12.4',u:'ng/mL',c:'#c4b0b0',p:50 }] },
};

function HormoneCard({ label, val, unit, chg, chgType, onPress }: any) {
  return (
    <TouchableOpacity style={[h.card, { flex: 1 }]} onPress={onPress}>
      <Text style={h.lbl}>{label}</Text>
      <Text style={h.val}>{val}<Text style={h.unit}> {unit}</Text></Text>
      <Text style={[h.chg, chgType === 'up' ? h.chgUp : chgType === 'dn' ? h.chgDn : h.chgOk]}>{chg}</Text>
      {/* sparkline */}
      <View style={h.spark}>
        {[40,55,48,62,58,71,65].map((v, i) => (
          <View key={i} style={[h.sparkBar, { height: v * 0.28, backgroundColor: i === 6 ? C.roseD : 'rgba(200,160,155,0.25)' }]} />
        ))}
      </View>
    </TouchableOpacity>
  );
}

const h = StyleSheet.create({
  card: { backgroundColor: 'rgba(255,251,249,0.95)', borderWidth: 1, borderColor: 'rgba(200,160,155,0.2)', borderRadius: 20, padding: 13, shadowColor: 'rgba(180,120,110,0.1)', shadowOffset: { width: 0, height: 2 }, shadowRadius: 16 },
  lbl: { fontSize: 9, fontWeight: '500', letterSpacing: 0.8, textTransform: 'uppercase', color: C.inkMu, marginBottom: 5 },
  val: { fontSize: 24, fontWeight: '400', color: C.ink, lineHeight: 26 },
  unit: { fontSize: 10, color: C.inkMu },
  chg: { fontSize: 10, marginTop: 3 },
  chgUp: { color: '#c9705a' }, chgDn: { color: '#5a7d65' }, chgOk: { color: C.inkS },
  spark: { flexDirection: 'row', alignItems: 'flex-end', gap: 2, marginTop: 7, height: 20 },
  sparkBar: { flex: 1, borderRadius: 1 },
});

function CycleWheel() {
  const PHASES = ['Menstrual','Follicular','Ovulatory','Luteal'];
  return (
    <View style={[cy.card, { flex: 1 }]}>
      <View style={cy.ring}>
        <View style={cy.label}>
          <Text style={cy.day}>8</Text>
          <Text style={cy.of}>of 28</Text>
        </View>
      </View>
      <Text style={cy.phase}>Follicular</Text>
      <Text style={cy.desc}>Rising oestrogen, increasing energy & focus</Text>
      <View style={cy.segs}>
        {PHASES.map((_, i) => (
          <View key={i} style={[cy.seg, i < 1 ? cy.segDone : i === 1 ? cy.segActive : {}]} />
        ))}
      </View>
    </View>
  );
}

const cy = StyleSheet.create({
  card: { backgroundColor: 'rgba(255,251,249,0.95)', borderWidth: 1, borderColor: 'rgba(200,160,155,0.2)', borderRadius: 20, padding: 14, alignItems: 'center', shadowColor: 'rgba(180,120,110,0.1)', shadowOffset: { width: 0, height: 2 }, shadowRadius: 16 },
  ring: { width: 96, height: 96, borderRadius: 48, borderWidth: 2.5, borderColor: 'rgba(200,160,155,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 9 },
  label: { alignItems: 'center' },
  day: { fontSize: 26, fontWeight: '300', color: C.ink, lineHeight: 30 },
  of: { fontSize: 10, color: C.inkMu },
  phase: { fontSize: 15, fontStyle: 'italic', color: C.roseD, marginBottom: 2 },
  desc: { fontSize: 10.5, color: C.inkS, textAlign: 'center', lineHeight: 14 },
  segs: { flexDirection: 'row', gap: 3, width: '100%', marginTop: 9 },
  seg: { flex: 1, height: 3, borderRadius: 2, backgroundColor: 'rgba(200,160,155,0.15)' },
  segDone: { backgroundColor: C.sage },
  segActive: { backgroundColor: C.rose },
});

function AICard() {
  return (
    <View style={[ai.card, { flex: 1 }]}>
      <View style={ai.tag}><Text style={ai.tagTxt}>AI Insight</Text></View>
      <Text style={ai.ttl}>Your body is primed for growth</Text>
      <Text style={ai.body}>
        <Text style={ai.bodyStrong}>HRV up 12%</Text> this week suggests strong vagal tone.{'\n'}
        Follicular phase <Text style={ai.bodyGreen}>boosts OT sensitivity ~20%</Text> — ideal time for a session.
      </Text>
      <View style={ai.pills}>
        {['💓 HRV: 61ms', '📅 Day 8', '🌿 Low stress'].map(p => (
          <View key={p} style={ai.pill}><Text style={ai.pillTxt}>{p}</Text></View>
        ))}
      </View>
    </View>
  );
}

const ai = StyleSheet.create({
  card: { backgroundColor: 'rgba(255,251,249,0.95)', borderWidth: 1, borderColor: 'rgba(200,160,155,0.2)', borderRadius: 20, padding: 13, shadowColor: 'rgba(180,120,110,0.1)', shadowOffset: { width: 0, height: 2 }, shadowRadius: 16 },
  tag: { marginBottom: 6, alignSelf: 'flex-start', paddingHorizontal: 7, paddingVertical: 3, borderRadius: 6, backgroundColor: 'rgba(196,181,212,0.25)', borderWidth: 1, borderColor: 'rgba(196,181,212,0.35)' },
  tagTxt: { fontSize: 9, fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase', color: '#8870a8' },
  ttl: { fontSize: 15, fontStyle: 'italic', color: C.ink, marginBottom: 6 },
  body: { fontSize: 11.5, color: C.inkM, lineHeight: 18 },
  bodyStrong: { color: C.roseD, fontWeight: '500' },
  bodyGreen: { color: '#5a7d65' },
  pills: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: 9 },
  pill: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, backgroundColor: 'rgba(249,232,228,0.6)', borderWidth: 1, borderColor: 'rgba(232,164,154,0.2)' },
  pillTxt: { fontSize: 10.5, color: C.roseD },
});

// Recommendations
const RECOS = [
  { icon: '🫁', title: 'Breathwork', sub: '4-7-8 pattern raises HRV by ~15%', href: 'guided session →' },
  { icon: '💊', title: 'Inositol', sub: 'Evidence-based for PCOS insulin resistance', href: 'research →' },
  { icon: '🌙', title: 'Sleep window', sub: 'HRV peaks at 7.5h — you averaged 6.1h', href: 'set reminder →' },
];

function HormoneModal({ data, onClose }: { data: typeof MODAL_DATA[string], onClose: () => void }) {
  return (
    <View style={md.sheet}>
      <View style={md.handle} />
      <Text style={md.ttl}>{data.title}</Text>
      <Text style={md.sub}>{data.sub}</Text>
      <View style={md.grid}>
        {data.items.map((item, i) => (
          <View key={i} style={md.box}>
            <Text style={md.boxN}>{item.n}</Text>
            <Text style={[md.boxV, { color: item.c }]}>{item.v} <Text style={md.boxU}>{item.u}</Text></Text>
            <View style={md.bar}><View style={[md.barFill, { width: `${item.p}%`, backgroundColor: item.c }]} /></View>
          </View>
        ))}
      </View>
      <TouchableOpacity style={md.closeBtn} onPress={onClose}><Text style={md.closeTxt}>Close</Text></TouchableOpacity>
    </View>
  );
}

const md = StyleSheet.create({
  sheet: { backgroundColor: 'rgba(255,251,249,0.98)', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 26, paddingBottom: 40, borderWidth: 1, borderColor: 'rgba(200,160,155,0.2)' },
  handle: { width: 40, height: 4, backgroundColor: '#c4b0b0', borderRadius: 2, alignSelf: 'center', marginBottom: 18 },
  ttl: { fontSize: 23, fontWeight: '400', color: '#3d2e2e', marginBottom: 3 },
  sub: { fontSize: 12, color: '#9d8585', marginBottom: 16, lineHeight: 18 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 9, marginBottom: 16 },
  box: { width: '47%', backgroundColor: '#f9e8e4', borderRadius: 14, padding: 13, borderWidth: 1, borderColor: 'rgba(232,164,154,0.15)' },
  boxN: { fontSize: 10, color: '#c4b0b0', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 5 },
  boxV: { fontSize: 22, fontWeight: '400', lineHeight: 24 },
  boxU: { fontSize: 10, color: '#c4b0b0' },
  bar: { height: 3, backgroundColor: 'rgba(200,160,155,0.15)', borderRadius: 2, marginTop: 8 },
  barFill: { height: 3, borderRadius: 2 },
  closeBtn: { width: '100%', padding: 13, borderRadius: 14, backgroundColor: 'rgba(232,164,154,0.2)', borderWidth: 1, borderColor: 'rgba(232,164,154,0.3)', alignItems: 'center' },
  closeTxt: { fontSize: 14, color: '#d4756a' },
});

export default function Home() {
  const [modal, setModal] = useState<string | null>(null);

  return (
    <View style={s.container}>
      {/* header */}
      <View style={s.header}>
        <View>
          <Text style={s.greeting}>Good evening,</Text>
          <Text style={s.name}>Sofia <Text style={s.nameEm}>✨</Text></Text>
          <Text style={s.sub}>Follicular phase · Day 8</Text>
        </View>
        <View style={s.right}>
          <View style={s.connPill}>
            <View style={s.connDot} />
            <Text style={s.connTxt}>Live</Text>
          </View>
          <View style={s.avatar}><Text style={s.avatarTxt}>S</Text></View>
        </View>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {/* hormone cards */}
        <View style={s.row3}>
          <HormoneCard label="Oxytocin" val="6.2" unit="/10" chg="↑ +0.4" chgType="dn" onPress={() => setModal('oxy')} />
          <HormoneCard label="Cortisol" val="18.4" unit="µg/dL" chg="↑ elevated" chgType="up" onPress={() => setModal('cort')} />
          <HormoneCard label="Progesterone" val="14.2" unit="ng/mL" chg="→ normal" chgType="ok" onPress={() => setModal('prog')} />
        </View>

        {/* cycle + AI */}
        <View style={s.row2}>
          <CycleWheel />
          <AICard />
        </View>

        {/* device widget */}
        <View style={s.devCard}>
          <View style={s.devTop}>
            <Text style={s.sectionHdr}>Device</Text>
            <View style={s.connPill}>
              <View style={s.connDot} />
              <Text style={s.connTxt}>VS-001 connected</Text>
            </View>
          </View>
          <View style={s.devGrid}>
            {[
              { val: '72', lbl: 'BPM', color: C.roseD },
              { val: '61ms', lbl: 'HRV', color: '#8870a8' },
              { val: '36.7°', lbl: 'Temp', color: '#5a7d65' },
              { val: '94%', lbl: 'SpO₂', color: C.gold },
            ].map((m, i) => (
              <View key={i} style={s.devMetric}>
                <Text style={[s.devVal, { color: m.color }]}>{m.val}</Text>
                <Text style={s.devLbl}>{m.lbl}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* recommendations */}
        <View style={s.recoCard}>
          <Text style={s.sectionHdr}>Today's recommendations</Text>
          {RECOS.map((r, i) => (
            <View key={i} style={s.ri}>
              <Text style={s.riIcon}>{r.icon}</Text>
              <View style={s.riBody}>
                <Text style={s.riTitle}>{r.title}</Text>
                <Text style={s.riSub}>{r.sub} <Text style={s.riLink}>{r.href}</Text></Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Hormone modal */}
      <Modal visible={!!modal} transparent animationType="slide" onRequestClose={() => setModal(null)}>
        <TouchableOpacity style={md2.overlay} activeOpacity={1} onPress={() => setModal(null)}>
          <TouchableOpacity activeOpacity={1}>
            {modal && <HormoneModal data={MODAL_DATA[modal]} onClose={() => setModal(null)} />}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const md2 = StyleSheet.create({ overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(253,248,245,0.8)' } });

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.cream },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 18, paddingTop: 56, paddingBottom: 14, backgroundColor: 'rgba(253,248,245,0.97)', borderBottomWidth: 1, borderBottomColor: C.border },
  greeting: { fontSize: 11.5, color: C.inkS },
  name: { fontSize: 25, fontWeight: '400', color: C.ink, lineHeight: 28 },
  nameEm: { fontSize: 20 },
  sub: { fontSize: 11.5, color: C.inkS, marginTop: 3 },
  right: { flexDirection: 'column', alignItems: 'flex-end', gap: 6 },
  connPill: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(249,232,228,0.9)', borderWidth: 1, borderColor: 'rgba(232,164,154,0.3)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 },
  connDot: { width: 6, height: 6, backgroundColor: C.rose, borderRadius: 3 },
  connTxt: { fontSize: 11, color: C.roseD },
  avatar: { width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(249,232,228,0.9)', borderWidth: 1.5, borderColor: 'rgba(232,164,154,0.4)', alignItems: 'center', justifyContent: 'center' },
  avatarTxt: { fontSize: 13, fontWeight: '500', color: C.roseD },
  scroll: { padding: 14, gap: 10 },
  row3: { flexDirection: 'row', gap: 9 },
  row2: { flexDirection: 'row', gap: 10 },
  sectionHdr: { fontSize: 16, fontStyle: 'italic', color: C.ink, marginBottom: 10 },
  devCard: { backgroundColor: 'rgba(255,251,249,0.95)', borderWidth: 1, borderColor: C.border, borderRadius: 20, padding: 14, shadowColor: 'rgba(180,120,110,0.1)', shadowOffset: { width: 0, height: 2 }, shadowRadius: 16 },
  devTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  devGrid: { flexDirection: 'row', justifyContent: 'space-around' },
  devMetric: { alignItems: 'center' },
  devVal: { fontSize: 17, fontWeight: '400', lineHeight: 20 },
  devLbl: { fontSize: 9, textTransform: 'uppercase', letterSpacing: 0.4, color: C.inkMu, marginTop: 1 },
  recoCard: { backgroundColor: 'rgba(255,251,249,0.95)', borderWidth: 1, borderColor: C.border, borderRadius: 20, padding: 14, shadowColor: 'rgba(180,120,110,0.1)', shadowOffset: { width: 0, height: 2 }, shadowRadius: 16 },
  ri: { flexDirection: 'row', gap: 9, alignItems: 'flex-start', paddingVertical: 9, paddingHorizontal: 11, backgroundColor: C.blush, borderRadius: 12, marginBottom: 7, borderWidth: 1, borderColor: 'rgba(232,164,154,0.1)' },
  riIcon: { fontSize: 14, marginTop: 1 },
  riBody: { flex: 1 },
  riTitle: { fontSize: 12, fontWeight: '500', color: C.ink, marginBottom: 1 },
  riSub: { fontSize: 12, color: C.inkS, lineHeight: 16 },
  riLink: { color: C.roseD },
});
