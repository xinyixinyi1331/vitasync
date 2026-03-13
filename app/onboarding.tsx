import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const C = { cream:'#fdf8f5', blush:'#f9e8e4', blush2:'#f2dbd7', rose:'#e8a49a', roseD:'#d4756a', lav:'#c4b5d4', sage:'#a8bfb0', ink:'#3d2e2e', inkM:'#6b5050', inkS:'#9d8585', inkMu:'#c4b0b0', border:'rgba(200,160,155,0.2)' };

function Chip({ label, on, onPress }: { label: string, on: boolean, onPress: () => void }) {
  return (
    <TouchableOpacity style={[s.chip, on && s.chipOn]} onPress={onPress}>
      <Text style={[s.chipTxt, on && s.chipTxtOn]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  // step 1
  const [name, setName] = useState('Sofia');
  const [dob, setDob] = useState('');
  const [source, setSource] = useState<string[]>(['Hackathon 👀']);
  // step 2
  const [cycleLen, setCycleLen] = useState('28–30d');
  const [regularity, setRegularity] = useState('Fairly regular');
  const [goals, setGoals] = useState<string[]>(['Manage PCOS']);
  // step 3
  const [diag, setDiag] = useState('Formally diagnosed');
  const [symptoms, setSymptoms] = useState<string[]>(['Irregular periods','Acne / oily skin','Mood swings','Pelvic pain']);
  const [stress, setStress] = useState(7);

  const toggleArr = (arr: string[], val: string): string[] =>
    arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];

  return (
    <View style={s.container}>
      <View style={s.top}>
        <View style={s.brand}>
          <View style={s.logoPill}><Text style={s.logoTxt}>V</Text></View>
          <Text style={s.brandName}>VitaSync</Text>
        </View>
        <Text style={s.title}>Your body,{'\n'}<Text style={s.titleEm}>finally legible.</Text></Text>
      </View>

      <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>
        {/* progress dots */}
        <View style={s.prow}>
          {[1,2,3].map((n, i) => (
            <View key={n} style={{ flexDirection: 'row', alignItems: 'center', flex: i < 2 ? 1 : 0 }}>
              <View style={[s.pd, step > n && s.pdDone, step === n && s.pdActive]}>
                <Text style={[s.pdTxt, (step >= n) && s.pdTxtOn]}>{step > n ? '✓' : n}</Text>
              </View>
              {i < 2 && <View style={[s.pline, step > n && s.plineDone]} />}
            </View>
          ))}
          <View style={[s.pd, step > 3 && s.pdDone]}>
            <Text style={[s.pdTxt, step > 3 && s.pdTxtOn]}>✓</Text>
          </View>
        </View>

        {/* Step 1 */}
        {step === 1 && (
          <View>
            <Text style={s.stepTtl}>Let's start with <Text style={s.stepEm}>you</Text></Text>
            <Text style={s.stepSub}>A few basics to personalise your experience.</Text>
            <View style={s.field}>
              <Text style={s.fieldLabel}>Your first name</Text>
              <TextInput style={s.input} value={name} onChangeText={setName} placeholder="e.g. Sofia" placeholderTextColor={C.inkMu} />
            </View>
            <View style={s.field}>
              <Text style={s.fieldLabel}>Date of birth</Text>
              <TextInput style={s.input} value={dob} onChangeText={setDob} placeholder="YYYY-MM-DD" placeholderTextColor={C.inkMu} />
            </View>
            <View style={s.field}>
              <Text style={s.fieldLabel}>How did you hear about us?</Text>
              <View style={s.chipWrap}>
                {['PCOS community','Social media','Doctor','Hackathon 👀'].map(opt => (
                  <Chip key={opt} label={opt} on={source.includes(opt)} onPress={() => setSource(toggleArr(source, opt))} />
                ))}
              </View>
            </View>
            <View style={s.btnRow}>
              <TouchableOpacity style={s.btnP} onPress={() => setStep(2)}>
                <Text style={s.btnPTxt}>Continue →</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <View>
            <Text style={s.stepTtl}>Your <Text style={s.stepEm}>cycle</Text></Text>
            <Text style={s.stepSub}>Helps align insights with your hormonal phases.</Text>
            <View style={s.field}>
              <Text style={s.fieldLabel}>Average cycle length</Text>
              <View style={s.chipWrap}>
                {['25d','26d','28–30d','31–35d','35d+ (irregular)'].map(opt => (
                  <Chip key={opt} label={opt} on={cycleLen === opt} onPress={() => setCycleLen(opt)} />
                ))}
              </View>
            </View>
            <View style={s.field}>
              <Text style={s.fieldLabel}>Cycle regularity</Text>
              <View style={s.chipWrap}>
                {['Fairly regular','Sometimes irregular','Very irregular'].map(opt => (
                  <Chip key={opt} label={opt} on={regularity === opt} onPress={() => setRegularity(opt)} />
                ))}
              </View>
            </View>
            <View style={s.field}>
              <Text style={s.fieldLabel}>Primary goal</Text>
              <View style={s.chipWrap}>
                {['Understand my cycle','Manage PCOS','Fertility','General wellness'].map(opt => (
                  <Chip key={opt} label={opt} on={goals.includes(opt)} onPress={() => setGoals(toggleArr(goals, opt))} />
                ))}
              </View>
            </View>
            <View style={s.btnRow}>
              <TouchableOpacity style={s.btnG} onPress={() => setStep(1)}><Text style={s.btnGTxt}>← Back</Text></TouchableOpacity>
              <TouchableOpacity style={[s.btnP, { flex: 1 }]} onPress={() => setStep(3)}><Text style={s.btnPTxt}>Continue →</Text></TouchableOpacity>
            </View>
          </View>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <View>
            <Text style={s.stepTtl}>Your <Text style={s.stepEm}>PCOS</Text> profile</Text>
            <Text style={s.stepSub}>The more we know, the smarter your AI insights.</Text>
            <View style={s.field}>
              <Text style={s.fieldLabel}>PCOS diagnosis</Text>
              <View style={s.chipWrap}>
                {['Formally diagnosed','Suspected','Not sure'].map(opt => (
                  <Chip key={opt} label={opt} on={diag === opt} onPress={() => setDiag(opt)} />
                ))}
              </View>
            </View>
            <View style={s.field}>
              <Text style={s.fieldLabel}>Symptoms (select all)</Text>
              <View style={s.chipWrap}>
                {['Irregular periods','Excess hair','Acne / oily skin','Weight changes','Mood swings','Low energy','Low libido','Pelvic pain'].map(opt => (
                  <Chip key={opt} label={opt} on={symptoms.includes(opt)} onPress={() => setSymptoms(toggleArr(symptoms, opt))} />
                ))}
              </View>
            </View>
            <View style={s.field}>
              <Text style={s.fieldLabel}>Stress level (past 4 weeks)</Text>
              <View style={s.stressRow}>
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <TouchableOpacity key={n} style={[s.stressDot, stress >= n && s.stressDotOn]} onPress={() => setStress(n)} />
                ))}
              </View>
              <View style={s.stressLabels}>
                <Text style={s.stressL}>Low</Text>
                <Text style={[s.stressL, { color: C.roseD, fontWeight: '500' }]}>{stress} / 10</Text>
                <Text style={s.stressL}>High</Text>
              </View>
            </View>
            <View style={s.btnRow}>
              <TouchableOpacity style={s.btnG} onPress={() => setStep(2)}><Text style={s.btnGTxt}>← Back</Text></TouchableOpacity>
              <TouchableOpacity style={[s.btnP, { flex: 1 }]} onPress={() => router.push('/pairing')}><Text style={s.btnPTxt}>Finish →</Text></TouchableOpacity>
            </View>
          </View>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdf8f5' },
  top: { paddingTop: 50, paddingHorizontal: 22, paddingBottom: 28, backgroundColor: '#f5e0dc' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  logoPill: { width: 36, height: 36, borderRadius: 11, backgroundColor: '#e8a49a', alignItems: 'center', justifyContent: 'center' },
  logoTxt: { fontSize: 18, color: '#fff' },
  brandName: { fontSize: 20, fontWeight: '500', color: '#3d2e2e' },
  title: { fontSize: 28, fontWeight: '400', color: '#3d2e2e', lineHeight: 34 },
  titleEm: { color: '#d4756a', fontStyle: 'italic' },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 22, paddingTop: 18 },
  prow: { flexDirection: 'row', alignItems: 'center', marginBottom: 22 },
  pd: { width: 28, height: 28, borderRadius: 14, borderWidth: 1.5, borderColor: 'rgba(200,160,155,0.2)', alignItems: 'center', justifyContent: 'center' },
  pdDone: { backgroundColor: '#a8bfb0', borderColor: '#a8bfb0' },
  pdActive: { backgroundColor: '#e8a49a', borderColor: '#e8a49a', shadowColor: '#e8a49a', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 6 },
  pdTxt: { fontSize: 11, fontWeight: '600', color: '#c4b0b0' },
  pdTxtOn: { color: '#fff' },
  pline: { flex: 1, height: 1, backgroundColor: 'rgba(200,160,155,0.2)', marginHorizontal: 2 },
  plineDone: { backgroundColor: '#a8bfb0' },
  stepTtl: { fontSize: 24, fontWeight: '400', color: '#3d2e2e', marginBottom: 4 },
  stepEm: { color: '#d4756a', fontStyle: 'italic' },
  stepSub: { fontSize: 13, color: '#9d8585', marginBottom: 18, lineHeight: 20 },
  field: { marginBottom: 16 },
  fieldLabel: { fontSize: 10.5, fontWeight: '500', letterSpacing: 0.8, textTransform: 'uppercase', color: '#9d8585', marginBottom: 6 },
  input: { width: '100%', paddingHorizontal: 16, paddingVertical: 13, borderRadius: 14, borderWidth: 1.5, borderColor: 'rgba(200,160,155,0.2)', backgroundColor: '#f9e8e4', fontSize: 15, color: '#3d2e2e' },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1.5, borderColor: 'rgba(200,160,155,0.2)', backgroundColor: 'transparent' },
  chipOn: { backgroundColor: 'rgba(232,164,154,0.2)', borderColor: '#e8a49a' },
  chipTxt: { fontSize: 13, color: '#6b5050' },
  chipTxtOn: { color: '#d4756a', fontWeight: '500' },
  stressRow: { flexDirection: 'row', gap: 6, marginTop: 8, marginBottom: 6 },
  stressDot: { flex: 1, height: 6, borderRadius: 3, backgroundColor: 'rgba(200,160,155,0.15)' },
  stressDotOn: { backgroundColor: '#e8a49a' },
  stressLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  stressL: { fontSize: 11, color: '#c4b0b0' },
  btnRow: { flexDirection: 'row', gap: 10, marginTop: 22 },
  btnP: { paddingVertical: 15, borderRadius: 16, backgroundColor: '#d4756a', alignItems: 'center', shadowColor: '#d4756a', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 18 },
  btnPTxt: { color: '#fff', fontSize: 15, fontWeight: '500' },
  btnG: { paddingVertical: 14, paddingHorizontal: 18, borderRadius: 16, borderWidth: 1.5, borderColor: 'rgba(200,160,155,0.2)', alignItems: 'center', justifyContent: 'center' },
  btnGTxt: { color: '#9d8585', fontSize: 14 },
});
