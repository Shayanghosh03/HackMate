import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Platform } from 'react-native'
import io from 'socket.io-client'

const getEnv = () => {
  // Simple dev defaults; edit to match your LAN IP for device testing
  const rawApi = process.env.EXPO_PUBLIC_API_BASE || 'http://localhost:4000'
  const rawChat = process.env.EXPO_PUBLIC_CHAT_BASE || rawApi
  const normalize = (u) => {
    if (!u) return u
    // Android emulator cannot reach localhost of host; use 10.0.2.2
    if (Platform.OS === 'android') return u.replace('http://localhost', 'http://10.0.2.2')
    return u
  }
  const api = normalize(rawApi)
  const chat = normalize(rawChat)
  return { api, chat }
}

export default function App() {
  const { api, chat } = getEnv()
  const [me] = useState({ id: 'p1', name: 'Aisha Khan' })
  const [peer] = useState({ id: 'p2', name: 'Rahul Mehta' })
  const [msgs, setMsgs] = useState([])
  const [text, setText] = useState('')
  const sockRef = useRef(null)

  useEffect(() => {
  const s = io(chat, { transports: ['websocket', 'polling'] })
    sockRef.current = s
  s.on('connect', () => console.log('[mobile chat] connected', s.id))
  s.on('connect_error', (e) => console.log('[mobile chat] connect_error', e?.message))
    s.emit('dm:join', { me: me.id, peerId: peer.id, userName: me.name })
    fetch(`${api}/api/dm/history?me=${encodeURIComponent(me.id)}&peerId=${encodeURIComponent(peer.id)}&limit=50`) 
      .then(r=>r.json()).then(arr => setMsgs((arr||[]).map(x => ({ text: x.text, userName: x.userName, ts: new Date(x.ts).getTime() }))))
      .catch(()=>{})
    const onMsg = (m) => {
      if (!m || !m.text) return
      // Server does not echo back to sender; this is incoming only
      setMsgs(prev => [...prev, { text: m.text, userName: m.userName, ts: m.ts || Date.now() }])
    }
    s.on('dm:message', onMsg)
    return () => { s.off('dm:message', onMsg); s.close(); sockRef.current = null }
  }, [api, chat])

  const send = () => {
    const s = sockRef.current
    if (!s || !text.trim()) return
    const now = Date.now()
    setMsgs(prev => [...prev, { text: text.trim(), userName: me.name, ts: now }])
    s.emit('dm:message', { me: me.id, peerId: peer.id, text: text.trim(), userName: me.name, ts: now })
    setText('')
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>HackMate Mobile</Text>
      <Text style={styles.subtitle}>API: {api}\nChat: {chat}</Text>
      <View style={styles.chatBox}>
        <FlatList
          data={msgs}
          keyExtractor={(_, i) => String(i)}
          renderItem={({ item }) => (
            <View style={styles.msgItem}>
              <Text style={styles.msgMeta}>{item.userName} • {new Date(item.ts).toLocaleTimeString()}</Text>
              <Text style={styles.msgText}>{item.text}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.row}>
        <TextInput value={text} onChangeText={setText} placeholder="Message" placeholderTextColor="#889" style={styles.input} />
        <TouchableOpacity onPress={send} style={styles.btn}><Text style={styles.btnText}>Send</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b1020', padding: 16 },
  title: { color: '#fff', fontSize: 22, fontWeight: '700' },
  subtitle: { color: '#9aa', marginTop: 6 },
  chatBox: { flex: 1, backgroundColor: '#11182e', borderRadius: 12, marginTop: 12, padding: 12 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  input: { flex: 1, backgroundColor: '#101629', color: '#fff', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, marginRight: 8 },
  btn: { backgroundColor: '#22d3ee', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10 },
  btnText: { color: '#0b1020', fontWeight: '700' },
  msgItem: { marginBottom: 10 },
  msgMeta: { color: '#9aa', fontSize: 12 },
  msgText: { color: '#eef' },
})
