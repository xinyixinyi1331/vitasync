import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const C = { plum: '#1E1228', berry: '#5C2340', rose: '#C96B6B', blush: '#F0D4D0', lavender: '#9B7DB8', sage: '#6EA87A', cream: '#FBF5F2', gold: '#C89A50' };
const STEPS = [
  { title: 'Tell us about you', subtitle: 'We personalise everything to your profile', emoji: '👤' },
  { title: 'Your PCOS journey', subtitle: 'Help us understand your health background', emoji: '🌸' },
  { title: 'Cycle tracking', subtitle: 'We use this to calibrate your Oxytocin Index', emoji: '📅' },
];

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [pcos, setPcos] = useState<string | null>(null);
  const [cycleLen, setCycleLen] = useState('28');
  const [phase, setPhase] = useState<string | null>(null);

  const next = () => { if (step < 2) setStep(step + 1); else router.push('/dashboard'); };
  const canContinue = () => {
    if (step === 0) return name.length > 0 && age.length > 0;
    if (step === 1) return pcos !== null;
    if (step === 2) return phase !== null;
    return false;
  };

  return (
    <View style={s.container}>
      <View style={s.header}>
        {step > 0 && <TouchableOpacity onPress={() => setStep(step - 1)} style={s.back}><Text style={s.backTxt}>←</Text></TouchableOpacity>}
        <View style={s.progressRow}>
          {STEPS.map((_, i) => <View key={i} style={[s.dot, i <= step && s.dotActive, i === step && s.dotCurrent]} />)}
        </View>
        <Text style={s.stepTxt}>{step + 1} / {STEPS.length}</Text>
      </View>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <Text style={s.emoji}>{STEPS[step].emoji}</Text>
        <Text style={s.title}>{STEPS[step].title}</Text>
        <Text style={s.subtitle}>{STEPS[step].subtitle}</Text>
        {step === 0 && (
          <View style={s.fields}>
            <View style={s.field}><Text style={s.label}>First name</Text><TextInput style={s.input} value={name} onChangeText={setName} placeholder="e.g. Xinyi" placeholderTextColor={C.blush + '50'} autoCapitalize="words" /></View>
            <View style={s.field}><Text style={s.label}>Age</Text><TextInput style={s.input} value={age} onChangeText={setAge} placeholder="e.g. 22" placeholderTextColor={C.blush + '50'} keyboardType="number-pad" maxLength={3} /></View>
          </View>
        )}
        {step === 1 && (
          <View style={s.fields}>
            <Text style={s.label}>Have you been diagnosed with PCOS?</Text>
            {['Yes, diagnosed', 'Suspected / undiagnosed', 'No, but interested in hormonal health'].map(opt => (
              <TouchableOpacity key={opt} style={[s.option, pcos === opt && s.optionActive]} onPress={() => setPcos(opt)}>
                <View style={[s.radio, pcos === opt && s.radioActive]} />
                <Text style={[s.optionTxt, pcos === opt && s.optionTxtActive]}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {step === 2 && (
          <View style={s.fields}>
            <View style={s.field}><Text style={s.label}>Average cycle length (days)</Text><TextInput style={s.input} value={cycleLen} onChangeText={setCycleLen} keyboardType="number-pad" maxLength={3} placeholderTextColor={C.blush + '50'} /></View>
            <Text style={[s.label, { marginTop: 8 }]}>Current cycle phase</Text>
            {['Menstrual', 'Follicular', 'Ovulatory', 'Luteal', "I'm not sure"].map(opt => (
              <TouchableOpacity key={opt} style={[s.option, phase === opt && s.optionActive]} onPress={() => setPhase(opt)}>
                <View style={[s.radio, phase === opt && s.radioActive]} />
                <Text style={[s.optionTxt, phase === opt && s.optionTxtActive]}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
      <View style={s.footer}>
        <TouchableOpacity style={[s.btn, !canContinue() && s.btnDisabled]} onPress={next} disabled={!canContinue()}>
          <Text style={s.btnTxt}>{step === 2 ? 'Start my journey →' : 'Continue'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.plum },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 60, paddingBottom: 16 },
  back: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  backTxt: { color: C.blush, fontSize: 22 },
  progressRow: { flexDirection: 'row', gap: 6 },
  dot: { width: 28, height: 4, borderRadius: 2, backgroundColor: C.berry },
  dotActive: { backgroundColor: C.lavender + '60' },
  dotCurrent: { backgroundColor: C.rose },
  stepTxt: { color: C.blush + '80', fontSize: 13 },
  content: { paddingHorizontal: 28, paddingBottom: 32 },
  emoji: { fontSize: 44, marginTop: 16, marginBottom: 12 },
  title: { fontSize: 26, fontWeight: '800', color: C.cream, marginBottom: 8 },
  subtitle: { fontSize: 14, color: C.blush + 'AA', lineHeight: 20, marginBottom: 28 },
  fields: { gap: 16 },
  field: { gap: 8 },
  label: { color: C.blush + 'CC', fontSize: 13, fontWeight: '600', letterSpacing: 0.4 },
  input: { backgroundColor: C.berry + '40', borderWidth: 1, borderColor: C.lavender + '40', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, color: C.cream, fontSize: 16 },
  option: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: C.berry + '30', borderWidth: 1, borderColor: C.berry + '60', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14 },
  optionActive: { borderColor: C.rose, backgroundColor: C.rose + '20' },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: C.lavender + '60' },
  radioActive: { borderColor: C.rose, backgroundColor: C.rose },
  optionTxt: { color: C.blush + 'AA', fontSize: 14, flex: 1 },
  optionTxtActive: { color: C.cream },
  footer: { paddingHorizontal: 28, paddingBottom: 48 },
  btn: { paddingVertical: 16, borderRadius: 16, backgroundColor: C.rose, alignItems: 'center' },
  btnDisabled: { backgroundColor: C.berry, opacity: 0.5 },
  btnTxt: { color: C.cream, fontSize: 17, fontWeight: '700' },
});
