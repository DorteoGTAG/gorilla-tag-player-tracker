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

// Store recent searches in local storage
const STORAGE_KEY = 'gtTrackerRecent';

// Initialize recent searches on page load
window.addEventListener('DOMContentLoaded', () => {
    loadRecentSearches();
});

function trackPlayer() {
    const playerInput = document.getElementById('playerInput');
    const playerId = playerInput.value.trim().toUpperCase();

    if (!playerId) {
        showError('Please enter a player ID');
        return;
    }

    const resultPanel = document.getElementById('resultPanel');
    resultPanel.innerHTML = '<div class="loading">Searching</div>';

    // Simulate network delay
    setTimeout(() => {
        if (playerDatabase[playerId]) {
            displayPlayerResult(playerDatabase[playerId], playerId);
            addToRecentSearches(playerId);
            playerInput.value = '';
        } else {
            showError(`Player ID "${playerId}" not found. Try: P12345, P67890, P11111, or P99999`);
        }
    }, 600);
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
    panel.style.animation = 'slideOut 0.3s ease-out forwards';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideOut {
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        panel.style.display = 'none';
        showMinimizeButton();
    }, 300);
}

function showMinimizeButton() {
    let miniBtn = document.getElementById('miniBtn');
    if (!miniBtn) {
        miniBtn = document.createElement('button');
        miniBtn.id = 'miniBtn';
        miniBtn.textContent = '🐵';
        miniBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #1e90ff 0%, #0066cc 100%);
            border: 2px solid #1e90ff;
            color: white;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 0 20px rgba(30, 144, 255, 0.4);
            z-index: 9998;
            transition: all 0.2s;
        `;
        miniBtn.onclick = restorePanel;
        document.body.appendChild(miniBtn);
    }
    miniBtn.style.display = 'block';
}

function restorePanel() {
    const panel = document.querySelector('.tracker-panel');
    panel.style.display = 'block';
    panel.style.animation = 'slideIn 0.3s ease-out';
    
    const miniBtn = document.getElementById('miniBtn');
    if (miniBtn) {
        miniBtn.style.display = 'none';
    }
}

function addToRecentSearches(playerId) {
    let recent = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    
    // Remove if already exists
    recent = recent.filter(id => id !== playerId);
    
    // Add to beginning
    recent.unshift(playerId);
    
    // Keep only last 5
    recent = recent.slice(0, 5);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recent));
    loadRecentSearches();
}

function loadRecentSearches() {
    const recent = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const recentList = document.getElementById('recentList');
    
    if (recent.length === 0) {
        recentList.innerHTML = '<p class="empty">No recent searches</p>';
        return;
    }
    
    recentList.innerHTML = recent.map(id => `
        <div class="recent-item" onclick="quickTrack('${id}')">
            ${id}
        </div>
    `).join('');
}

function quickTrack(playerId) {
    document.getElementById('playerInput').value = playerId;
    trackPlayer();
}

// Restore panel on page load
window.addEventListener('load', () => {
    const panel = document.querySelector('.tracker-panel');
    if (panel.style.display === 'none') {
        restorePanel();
    }
});