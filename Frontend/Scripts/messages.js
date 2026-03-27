import { MOCK_FRIENDS } from './chatLogic.js';

window.renderMessages = function(friendId) {
    const messageArea = document.querySelector('.message-area');
    const friend = MOCK_FRIENDS.find(f => f._id === friendId);

    if (!friend || !messageArea) return;

    messageArea.innerHTML = friend.messages.map(msg => `
        <div class="bubble ${msg.sentByMe ? 'sent' : 'received'}">
            ${msg.text}
            <span class="time">${msg.time}</span>
        </div>
    `).join('');

    messageArea.scrollTop = messageArea.scrollHeight;
};

const originalSelectChat = window.selectChat;

window.selectChat = function(element, name) {
    // 1. Get the hidden ID from the clicked element
    const friendId = element.getAttribute('data-id');
    
    // 2. UI: Update Active State (Visual)
    document.querySelectorAll('.contact-item').forEach(item => item.classList.remove('active'));
    element.classList.add('active');

    // 3. UI: Update Header Name
    const chatHeaderTitle = document.querySelector('.chat-header h3');
    if (chatHeaderTitle) chatHeaderTitle.textContent = name;

    // 4. THE FIX: Re-render the message area for THIS specific ID
    const messageArea = document.querySelector('.message-area');
    
    // Find the friend's data in your array
    const friendData = MOCK_FRIENDS.find(f => f._id === friendId);

    if (friendData && messageArea) {
        // Generate HTML for this friend's messages only
        messageArea.innerHTML = friendData.messages.map(msg => `
            <div class="bubble ${msg.sentByMe ? 'sent' : 'received'}">
                ${msg.text}
                <span class="time">${msg.time}</span>
            </div>
        `).join('');

        // Auto-scroll to the latest message
        messageArea.scrollTop = messageArea.scrollHeight;
    } else {
        messageArea.innerHTML = '<div class="empty-state">No whispers yet...</div>';
    }
};