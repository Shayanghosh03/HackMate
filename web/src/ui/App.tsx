import React, { useEffect, useMemo, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'

type User = { _id?: string; id?: string; name: string; email?: string }
type Message = { text: string; userName: string; ts: number; senderSid?: string; roomId?: string }

const getEnv = () => {
  const params = new URLSearchParams(location.search)
  const api = params.get('apiBase') || localStorage.getItem('hm_api_base') || 'http://localhost:4000'
  const chat = params.get('chatBase') || localStorage.getItem('hm_chat_base') || api
  localStorage.setItem('hm_api_base', api)
  localStorage.setItem('hm_chat_base', chat)
  return { api, chat }
}

function useSocket(baseUrl: string) {
  const ref = useRef<Socket | null>(null)
  useEffect(() => {
    const s = io(baseUrl, { transports: ['websocket', 'polling'] })
    ref.current = s
    return () => { s.close(); ref.current = null }
  }, [baseUrl])
  return ref
}

function notify(title: string, body: string) {
  try {
    if (!('Notification' in window)) return
    if (Notification.permission === 'default') Notification.requestPermission()
    if (Notification.permission === 'granted') new Notification(title, { body })
  } catch {}
}

function beep() {
  try {
    const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext
    if (!Ctx) return
    const ctx = new Ctx()
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'sine'; o.frequency.value = 880
    o.connect(g); g.connect(ctx.destination)
    g.gain.setValueAtTime(0.0001, ctx.currentTime)
    g.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.01)
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18)
    o.start(); o.stop(ctx.currentTime + 0.2)
  } catch {}
}

export function App() {
  const { api, chat } = useMemo(getEnv, [])
  const socketRef = useSocket(chat)
  const [me, setMe] = useState<User | null>(null)
  const [peers, setPeers] = useState<User[]>([])
  const [peer, setPeer] = useState<User | null>(null)
  const [msgs, setMsgs] = useState<Message[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Load a simple user list (fallback to demo users if API fails)
  useEffect(() => {
    fetch(`${api}/api/users`).then(r=>r.json()).then((arr)=>{
      if (Array.isArray(arr) && arr.length) {
        setPeers(arr)
        // Pick me as first user; peer as second for demo
        setMe(arr[0])
      } else {
        const demo = [
          { id: 'p1', name: 'Aisha Khan' },
          { id: 'p2', name: 'Rahul Mehta' },
          { id: 'p3', name: 'Sara Lee' },
        ]
        setPeers(demo as any)
        setMe(demo[0] as any)
      }
    }).catch(()=>{
      const demo = [
        { id: 'p1', name: 'Aisha Khan' },
        { id: 'p2', name: 'Rahul Mehta' },
        { id: 'p3', name: 'Sara Lee' },
      ]
      setPeers(demo as any)
      setMe(demo[0] as any)
    })
  }, [api])

  // Join DM and load history when peer changes
  useEffect(() => {
    const s = socketRef.current
    if (!s || !me || !peer) return
    const meId = (me._id || (me as any).id) as string
    const peerId = (peer._id || (peer as any).id) as string
    s.emit('dm:join', { me: meId, peerId, userName: me.name })
    fetch(`${api}/api/dm/history?me=${encodeURIComponent(meId)}&peerId=${encodeURIComponent(peerId)}&limit=50`)
      .then(r=>r.json()).then((arr: any[]) => {
        const m = (arr || []).map(x => ({ text: x.text, userName: x.userName || 'Guest', ts: new Date(x.ts).getTime() }))
        setMsgs(m)
      }).catch(()=>setMsgs([]))
    const onMsg = (m: Message & { roomId?: string; senderSid?: string }) => {
      if (!m || !m.text) return
      // Server does not echo back to sender; treat all as incoming
      setMsgs(prev => [...prev, { text: m.text, userName: m.userName, ts: m.ts || Date.now() }])
      notify(m.userName || 'New message', String(m.text).slice(0,80))
      beep()
    }
    s.off('dm:message'); s.on('dm:message', onMsg)
    return () => { s.off('dm:message', onMsg) }
  }, [socketRef, api, me, peer])

  const send = () => {
    const s = socketRef.current
    if (!s || !me || !peer) return
    const val = (inputRef.current?.value || '').trim()
    if (!val) return
    const meId = (me._id || (me as any).id) as string
    const peerId = (peer._id || (peer as any).id) as string
    const now = Date.now()
    setMsgs(prev => [...prev, { text: val, userName: me.name || 'Me', ts: now }])
    s.emit('dm:message', { me: meId, peerId, text: val, userName: me.name || 'Me', ts: now })
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', padding: 16 }}>
      <h1>HackMate Web</h1>
      <p style={{ color: '#666' }}>API: {getEnv().api} • Chat: {getEnv().chat}</p>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ width: 260 }}>
          <h3>Users</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {peers.map(u => (
              <li key={(u._id || (u as any).id) as any}>
                <button onClick={() => setPeer(u)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 6px', borderRadius: 6, border: '1px solid #ddd', marginBottom: 8, background: (peer && ((peer._id|| (peer as any).id) === (u._id || (u as any).id))) ? '#eef' : '#fff' }}>
                  {u.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: 1, minWidth: 280 }}>
          <h3>Direct Message</h3>
          <div style={{ border: '1px solid #ddd', borderRadius: 8, height: 360, overflow: 'auto', padding: 8, background: '#fafafa' }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 12, color: '#666' }}>{m.userName} • {new Date(m.ts).toLocaleTimeString()}</div>
                <div>{m.text}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <input ref={inputRef} placeholder="Type a message" style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
            <button onClick={send} style={{ padding: '8px 12px' }}>Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}
