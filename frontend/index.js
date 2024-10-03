import { backend } from 'declarations/backend';

const playerForm = document.getElementById('player-form');
const leaderboardBtns = document.querySelectorAll('.leaderboard-btn');
const leaderboardResults = document.getElementById('leaderboard-results');

playerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('player-id');
    const name = document.getElementById('player-name');
    const goals = document.getElementById('player-goals');
    const assists = document.getElementById('player-assists');
    const passes = document.getElementById('player-passes');

    try {
        await backend.addOrUpdatePlayer(
            id.value,
            name.value,
            parseInt(goals.value),
            parseInt(assists.value),
            parseInt(passes.value)
        );
        alert('Player added/updated successfully!');
        
        // Reset form fields
        playerForm.reset();
    } catch (error) {
        console.error('Error adding/updating player:', error);
        alert('Error adding/updating player. Please try again.');
    }
});

leaderboardBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
        leaderboardBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const stat = btn.dataset.stat;
        try {
            const topPlayers = await backend.getTopPlayers(stat, 5);
            displayLeaderboard(topPlayers, stat);
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            leaderboardResults.innerHTML = 'Error fetching leaderboard. Please try again.';
        }
    });
});

function displayLeaderboard(players, stat) {
    let html = `<h3>Top 5 ${stat.charAt(0).toUpperCase() + stat.slice(1)}</h3>`;
    html += '<table><tr><th>Rank</th><th>Name</th><th>Value</th></tr>';
    players.forEach((player, index) => {
        html += `<tr><td>${index + 1}</td><td>${player.name}</td><td>${player[stat]}</td></tr>`;
    });
    html += '</table>';
    leaderboardResults.innerHTML = html;
}

// Real-time updates
setInterval(async () => {
    const activeStatBtn = document.querySelector('.leaderboard-btn.active');
    if (activeStatBtn) {
        const stat = activeStatBtn.dataset.stat;
        const topPlayers = await backend.getTopPlayers(stat, 5);
        displayLeaderboard(topPlayers, stat);
    }
}, 5000);
