# 🐵 Gorilla Tag Player Tracker

A browser-based overlay application for tracking Gorilla Tag players. Simply enter a player ID and instantly see what code they're in!

## Features

✨ **Real-time Player Tracking**
- Enter any player ID to track their current location
- See player name, status, room, and last seen time
- Status indicator (online/offline) with live pulse animation

🎨 **Beautiful Overlay Interface**
- Sleek sci-fi themed design with neon accents
- Fixed position overlay that stays on top of your game
- Minimize/restore button for quick access
- Smooth animations and transitions

📝 **Recent Searches**
- Automatically saves your last 5 searches
- Quick-click access to recently tracked players
- Persistent storage using browser localStorage

⚡ **Fast & Responsive**
- Lightning-fast lookup speeds
- Works in any modern web browser
- No installation required

## How to Use

1. Open `index.html` in your web browser
2. Enter a player ID in the text box
3. Click "Track" or press Enter
4. View the player's current code and location instantly

## Test Player IDs

Try these sample IDs to test the tracker:

- **P12345** - ShadowGorilla (Online)
- **P67890** - NeonMonkey (Online)
- **P11111** - PixelApe (Offline)
- **P99999** - VortexGamer (Online)

## File Structure

```
├── index.html       # Main HTML structure
├── style.css        # Styling and animations
├── script.js        # Functionality and player database
└── README.md        # Documentation
```

## Features Breakdown

### Player Information Display
- **Player Name**: Display name of the tracked player
- **Player ID**: Unique identifier
- **Current Code**: The join code to their room
- **Status**: Online/Offline indicator
- **Room/Location**: Current game location or last seen location
- **Last Seen**: Timestamp of last activity

### UI Components
- **Search Section**: Input field and track button
- **Result Panel**: Displays tracked player information
- **Recent Searches**: Quick access to recently tracked players
- **Minimize Button**: Collapse overlay to floating button

## Customization

You can easily customize:

- **Colors**: Edit the CSS variables in `:root` section of `style.css`
- **Player Data**: Add more players to the `playerDatabase` object in `script.js`
- **API Integration**: Replace the mock database with real API calls

## Future Enhancements

- [ ] Connect to real Gorilla Tag API
- [ ] Multi-player tracking dashboard
- [ ] Player statistics and history
- [ ] Notification alerts when player goes online/offline
- [ ] Discord webhook integration
- [ ] Advanced filtering and search options

## Technical Stack

- **HTML5** - Structure
- **CSS3** - Styling with animations
- **Vanilla JavaScript** - Functionality
- **LocalStorage API** - Recent searches persistence

## License

MIT License - Feel free to use and modify!

---

**Made with ❤️ for Gorilla Tag players**