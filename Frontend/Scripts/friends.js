import { showPunishment } from "./Authentication";

const API_URL="https//:localhost:5000/api"

async function renderFriends() {
    const container = document.getElementById('friends-container');
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_URL}/friends`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error("Connection failed");

        const friends = await response.json();
        container.innerHTML = '';

    friends.forEach(friend => {
            const friendRow = `
                <div class="contact-item" onclick="openChat('${friend.id}')">
                    <div class="avatar ${friend.isOnline ? 'online' : ''}"></div>
                    <div class="contact-info">
                        <span class="name">${friend.name}</span>
                        <span class="preview">${friend.lastSeen || 'Silent...'}</span>
                    </div>
                </div>
            `;
            container.innerHTML += friendRow;
        });
    } catch (error) {
        showPunishment("Your circle is unreachable.");
    }
}
document.addEventListener('DOMContentLoaded', renderFriends);

