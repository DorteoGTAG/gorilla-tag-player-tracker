const playerDatabase = {
    'P12345': {
        playerName: 'ShadowGorilla',
        currentCode: 'GTAG-2K9X',
        status: 'online',
        lastSeen: 'Now',
        room: 'Forest Arena',
        username: 'shadowgorilla'
    },
    'P67890': {
        playerName: 'NeonMonkey',
        currentCode: 'GTAG-5F3L',
        status: 'online',
        lastSeen: 'Now',
        room: 'City Rooftop',
        username: 'neonmonkey'
    },
    'P11111': {
        playerName: 'PixelApe',
        currentCode: 'GTAG-8M2Q',
        status: 'offline',
        lastSeen: '5 minutes ago',
        room: 'Last seen: Temple Ruins',
        username: 'pixelape'
    },
    'P99999': {
        playerName: 'VortexGamer',
        currentCode: 'GTAG-4J7W',
        status: 'online',
        lastSeen: 'Now',
        room: 'Mountain Peak',
        username: 'vortexgamer'
    }
};

const ID_STORAGE_KEY = 'gtTrackerRecentIds';
const USERNAME_STORAGE_KEY = 'gtTrackerRecentUsernames';

window.addEventListener('DOMContentLoaded', () => {
    loadRecentSearches();
    initModeSwitching();
});

function initModeSwitching() {
    const buttons = document.querySelectorAll('.mode-btn');
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const mode = button.dataset.mode;
            buttons.forEach(btn => btn.classList.toggle('active', btn === button));

            const idPanel = document.getElementById('idPanel');
            const usernamePanel = document.getElementById('usernamePanel');

            if (mode === 'id') {
                idPanel.classList.remove('hidden');
                usernamePanel.classList.add('hidden');
            } else {
                usernamePanel.classList.remove('hidden');
                idPanel.classList.add('hidden');
            }
        });
    });
}

function trackPlayer() {
    const input = document.getElementById('playerInput');
    const playerId = input.value.trim().toUpperCase();

    if (!playerId) {
        showError('Please enter a player ID', 'resultPanel');
        return;
    }

    const resultPanel = document.getElementById('resultPanel');
    resultPanel.innerHTML = '<div class="loading">Searching...</div>';

    setTimeout(() => {
        const data = playerDatabase[playerId];

        if (data) {
            displayPlayerResult(data, playerId, 'resultPanel');
            addToRecentSearches(playerId, ID_STORAGE_KEY, 'recentList');
            input.value = '';
        } else {
            showError(`Player ID "${playerId}" not found. Try: P12345, P67890, P11111, or P99999`, 'resultPanel');
        }
    }, 450);
}

function trackUsername() {
    const input = document.getElementById('usernameInput');
    const username = input.value.trim().toLowerCase();

    if (!username) {
        showError('Please enter a username', 'usernameResultPanel');
        return;
    }

    const resultPanel = document.getElementById('usernameResultPanel');
    resultPanel.innerHTML = '<div class="loading">Searching...</div>';

    setTimeout(() => {
        let matched = null;
        let matchedId = null;

        Object.entries(playerDatabase).forEach(([id, data]) => {
            if (data.username === username) {
                matched = data;
                matchedId = id;
            }
        });

        if (matched && matchedId) {
            displayPlayerResult(matched, matchedId, 'usernameResultPanel');
            addToRecentSearches(username, USERNAME_STORAGE_KEY, 'usernameRecentList');
            input.value = '';
        } else {
            showError(`Username "${username}" not found. Try: shadowgorilla, neonmonkey, pixelape, or vortexgamer`, 'usernameResultPanel');
        }
    }, 450);
}

function displayPlayerResult(player, playerId, panelId) {
    const resultPanel = document.getElementById(panelId);
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

function showError(message, panelId) {
    const resultPanel = document.getElementById(panelId);
    resultPanel.innerHTML = `<div class="error">${message}</div>`;
}

function handleKeyPress(event) {
    if (event.key === 'Enter') trackPlayer();
}

function handleUsernameKeyPress(event) {
    if (event.key === 'Enter') trackUsername();
}

function minimizePanel() {
    const panel = document.querySelector('.tracker-panel:not(.hidden)');
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

function addToRecentSearches(value, storageKey, listId) {
    let recent = JSON.parse(localStorage.getItem(storageKey)) || [];
    recent = recent.filter(item => item !== value);
    recent.unshift(value);
    recent = recent.slice(0, 5);
    localStorage.setItem(storageKey, JSON.stringify(recent));
    renderRecentSearches(storageKey, listId);
}

function renderRecentSearches(storageKey, listId) {
    const recent = JSON.parse(localStorage.getItem(storageKey)) || [];
    const list = document.getElementById(listId);

    if (!recent.length) {
        list.innerHTML = '<p class="empty">No recent searches</p>';
        return;
    }

    list.innerHTML = recent.map(value => `
        <div class="recent-item" onclick="quickTrack('${value}', '${storageKey}', '${listId}')">${value}</div>
    `).join('');
}

function loadRecentSearches() {
    renderRecentSearches(ID_STORAGE_KEY, 'recentList');
    renderRecentSearches(USERNAME_STORAGE_KEY, 'usernameRecentList');
}

function quickTrack(value, storageKey, listId) {
    if (storageKey === ID_STORAGE_KEY) {
        document.getElementById('playerInput').value = value;
        trackPlayer();
    } else {
        document.getElementById('usernameInput').value = value;
        trackUsername();
    }
}
