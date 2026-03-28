// Add this at the top of your existing chatLogic.js

const socket = io("http://localhost:8000");

const MOCK_FRIENDS = [
    {
    _id: "1",
    userName: "Scarlett",
    isOnline: true,
    messages: [
        { text: "I saw your message from across the global pulse.", time: "11:11 PM", sentByMe: false },
        { text: "The world is smaller than it looks.", time: "11:12 PM", sentByMe: true },
        { text: "Are you ready for the ritual?", time: "11:15 PM", sentByMe: false },
        { text: "I've gathered the components. The server is primed.", time: "11:16 PM", sentByMe: true },
        { text: "Good. The others are watching from the shadows.", time: "11:17 PM", sentByMe: false },
        { text: "Do they know about the breach?", time: "11:18 PM", sentByMe: true },
        { text: "Not yet. We move in silence.", time: "11:19 PM", sentByMe: false },
        { text: "The encryption key is 0x7F4B. Don't lose it.", time: "11:20 PM", sentByMe: false },
        { text: "Received. I'm injecting the payload now.", time: "11:21 PM", sentByMe: true },
        { text: "Wait... someone is scanning our frequency.", time: "11:22 PM", sentByMe: false },
        { text: "Is it the Pulse? Or something else?", time: "11:23 PM", sentByMe: true },
        { text: "It's a ghost signal. Probably a decoy.", time: "11:24 PM", sentByMe: false },
        { text: "Stay sharp. I'm nearing the core.", time: "11:25 PM", sentByMe: true },
        { text: "The void is opening. Finish the transfer.", time: "11:26 PM", sentByMe: false },
        { text: "System override complete. We're in.", time: "11:27 PM", sentByMe: true }
    ]
},
    
    {
        _id: "2",
        userName: "Dante",
        isOnline: false,
        messages: [
            { text: "The server is secured.", time: "09:00 AM", sentByMe: false },
            { text: "Excellent. No leaks?", time: "09:05 AM", sentByMe: true }
        ]
    },
    {
        _id: "3",
        userName: "Seraphina",
        isOnline: true,
        messages: [
            { text: "Whisper to me later.", time: "Yesterday", sentByMe: false }
        ]
    },  {
        _id: "2",
        userName: "Dante",
        isOnline: false,
        messages: [
            { text: "The server is secured.", time: "09:00 AM", sentByMe: false },
            { text: "Excellent. No leaks?", time: "09:05 AM", sentByMe: true }
        ]
    },
];

export function renderWhispers() {
    const container = document.getElementById('friends-container');
    if (!container) return;

    container.innerHTML = MOCK_FRIENDS.map(friend => {
        // Get the very last message text for the preview
        const lastMsg = friend.messages[friend.messages.length - 1]?.text || "No whispers yet...";
        
        return `
            <div class="contact-item" 
             id="contact-${friend._id}" 
             data-id="${friend._id}" 
             onclick="selectChat(this, '${friend.userName}')">
            
            <div class="avatar ${friend.isOnline ? 'online' : 'offline'}">
                <span class="avatar-initial">${friend.userName.charAt(0)}</span>
            </div>
            
            <div class="contact-info">
                <div class="contact-header">
                    <span class="name">${friend.userName}</span>
                </div>
                <span class="preview">${lastMsg}</span>
            </div>
        </div>
        `;
    }).join('');
}

// Ensure it loads
document.addEventListener('DOMContentLoaded', renderWhispers);
export { MOCK_FRIENDS };


//web socket connection
socket.on("connect",()=>{
    console.log("connected to velvet Server");
    const myId = localStorage.getItem('userId');
    if (myId) {
        socket.emit("join_self", myId);
    }
});
socket.on("connect_error", (err) => {
    console.error("The connection to the realm failed:", err.message);
});