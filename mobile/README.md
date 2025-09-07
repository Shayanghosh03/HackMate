# HackMate Mobile (Expo)

React Native client for HackMate DMs over Socket.IO.

Run
- Install deps: npm install -g expo-cli (optional)
- In this folder: npm install; npm start
- Use a simulator or Expo Go on device.

Configure endpoints
- Defaults: API http://localhost:4000, Chat same.
- For device testing, set your LAN IP:
  - setx EXPO_PUBLIC_API_BASE http://192.168.1.10:4000
  - setx EXPO_PUBLIC_CHAT_BASE http://192.168.1.10:5003
  - Restart terminal, then npm start

Notes
- Mobile notifications are not implemented here; DM messages render live.