let conversationHistory = [];

document.getElementById('chat-form').addEventListener('submit', async (e) => {
    
    e.preventDefault();
    console.log("HI");
    const messageInput = document.getElementById('message');
    const message = messageInput.value.trim();
    if (!message) return;


    // Add user message to chat history UI
    addMessageToChat('user', message);
    
    // Add user message to conversation history before API call
    conversationHistory.push({
        role: 'user',
        content: message
    });
    
    console.log('Sending message to server1:', message);
    console.log('conversationHistory:', conversationHistory);   
    try {
        console.log('Sending message to server2:', message)
        const response = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                history: conversationHistory
            })
        });

        const data = await response.json();
        
        // Add AI response to chat history UI
        addMessageToChat('ai', data.content);
        
        // Only push AI response to conversation history
        conversationHistory.push({
            role: 'assistant',
            content: data.content
        });
        
    } catch (error) {
        console.error('Error:', error);
        addMessageToChat('ai', 'Sorry, there was an error processing your request.');
    }

    messageInput.value = '';
});

function addMessageToChat(role, content) {
    const chatHistory = document.getElementById('chat-history');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}-message`;
    
    // Convert \n to <br> tags and set as HTML
    const formattedContent = content.replace(/\n/g, '<br>');
    messageDiv.innerHTML = formattedContent;
    
    chatHistory.appendChild(messageDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}
