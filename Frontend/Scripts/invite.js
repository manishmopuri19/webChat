const API_URL="http://localhost.com/api"

window.openInviteModal = function() {
    const modal = document.getElementById('inviteOverlay');
    if (modal) {
        modal.classList.add('active');
        
        lucide.createIcons();
    }
};

window.closeInviteModal = function() {
    const modal = document.getElementById('inviteOverlay');
    if (modal) modal.classList.remove('active');
};


window.handleInvite = async function() {
    const emailInput = document.getElementById('friendEmail');
    const email = emailInput.value;
    const token = localStorage.getItem('token');

    if (!email) {
        showPunishment("The void requires an address. Enter an email.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/invite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ email })
        });

        if (response.ok) {
            showPunishment("♰ Summons sent into the void.");
            emailInput.value = '';
            closeInviteModal();
        } else {
            showPunishment("The summoning failed. Try again.");
        }
    } catch (error) {
        showPunishment("The void is silent. Connection failed.");
        console.error("Invite Error:", error);
    }
};
