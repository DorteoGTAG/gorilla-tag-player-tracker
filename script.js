// Mock database of player IDs and their codes/rooms
const playerDatabase = {
    'P12345': {
        playerName: 'ShadowGorilla',
        currentCode: 'GTAG-2K9X',
        status: 'online',
        lastSeen: 'Now',
        room: 'Forest Arena'
    },
    'P67890': {
        playerName: 'NeonMonkey',
        currentCode: 'GTAG-5F3L',
        status: 'online',
        lastSeen: 'Now',
        room: 'City Rooftop'
    },
    'P11111': {
        playerName: 'PixelApe',
        currentCode: 'GTAG-8M2Q',
        status: 'offline',
        lastSeen: '5 minutes ago',
        room: 'Last seen: Temple Ruins'
    },
    'P99999': {
        playerName: 'VortexGamer',
        currentCode: 'GTAG-4J7W',
        status: 'online',
        lastSeen: 'Now',
        room: 'Mountain Peak'
    }
};

const STORAGE_KEY = 'gtTrackerRecent';

window.addEventListener('DOMContentLoaded', () => {
    loadRecentSearches();
    lockInterface();
});

function trackPlayer() {
    const input = document.getElementById('playerInput');
    const playerId = input.value.trim().toUpperCase();

    if (!playerId) {
        showError('Please enter a player ID');
        return;
    }

    const resultPanel = document.getElementById('resultPanel');
    resultPanel.innerHTML = '<div class="loading">Searching...</div>';

    setTimeout(() => {
        if (playerDatabase[playerId]) {
            displayPlayerResult(playerDatabase[playerId], playerId);
            addToRecentSearches(playerId);
            input.value = '';
        } else {
            showError(`Player ID "${playerId}" not found. Try: P12345, P67890, P11111, or P99999`);
        }
    }, 400);
}

function displayPlayerResult(player, playerId) {
    const resultPanel = document.getElementById('resultPanel');
    const statusClass = player.status === 'online' ? 'online' : 'offline';
    const statusIndicator = `<span class="status-indicator ${statusClass}"></span>`;

    resultPanel.innerHTML = `
        <div class="player-result ${statusClass}">
            <div class="label">Player Name</div>
            <div class="value">${player.playerName}</div>
        </div>
        <div class="player-result ${statusClass}">
            <div class="label">Player ID</div>
            <div class="value">${playerId}</div>
        </div>
        <div class="player-result ${statusClass}">
            <div class="label">Current Code</div>
            <div class="value">${player.currentCode}</div>
        </div>
        <div class="player-result ${statusClass}">
            <div class="label">Status</div>
            <div class="value">${statusIndicator}${player.status.toUpperCase()}</div>
        </div>
        <div class="player-result ${statusClass}">
            <div class="label">Room / Location</div>
            <div class="value">${player.room}</div>
        </div>
        <div class="player-result ${statusClass}">
            <div class="label">Last Seen</div>
            <div class="value">${player.lastSeen}</div>
        </div>
    `;
}

function showError(message) {
    const resultPanel = document.getElementById('resultPanel');
    resultPanel.innerHTML = `<div class="error">${message}</div>`;
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        trackPlayer();
    }
}

function minimizePanel() {
    const panel = document.querySelector('.tracker-panel');
    const miniBtn = document.getElementById('miniBtn');

    if (!miniBtn) {
        const button = document.createElement('button');
        button.id = 'miniBtn';
        button.textContent = '🐵';
        button.onclick = () => {
            panel.style.display = 'block';
            button.style.display = 'none';
        };
        document.body.appendChild(button);
    }

    const button = document.getElementById('miniBtn');
    panel.style.display = 'none';
    button.style.display = 'block';
}

function addToRecentSearches(playerId) {
    let recent = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    recent = recent.filter(id => id !== playerId);
    recent.unshift(playerId);
    recent = recent.slice(0, 5);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recent));
    loadRecentSearches();
}

function loadRecentSearches() {
    const recent = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const recentList = document.getElementById('recentList');

    if (!recent.length) {
        recentList.innerHTML = '<p class="empty">No recent searches</p>';
        return;
    }

    recentList.innerHTML = recent.map(id => `
        <div class="recent-item" onclick="quickTrack('${id}')">${id}</div>
    `).join('');
}

function quickTrack(playerId) {
    document.getElementById('playerInput').value = playerId;
    trackPlayer();
}

function lockInterface() {
    const panel = document.querySelector('.tracker-panel');
    const container = document.querySelector('.overlay-container');

    panel.setAttribute('draggable', 'false');
    container.setAttribute('draggable', 'false');

    panel.addEventListener('dragstart', (e) => e.preventDefault());
    container.addEventListener('dragstart', (e) => e.preventDefault());

    document.addEventListener('dragstart', (e) => e.preventDefault());
    document.addEventListener('mousedown', (e) => {
        if (e.target.closest('button, input, .recent-item')) return;
        // Keep UI fixed in place; do nothing.
    });
}

