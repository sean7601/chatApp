document.getElementById('chat-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const message = document.getElementById('message').value;
    const responseDiv = document.getElementById('response');

    try {
        const response = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        responseDiv.innerText = responseData.message;
    } catch (error) {
        console.error('Error:', error);
        responseDiv.innerText = 'Error: ' + error.message;
    }
});
