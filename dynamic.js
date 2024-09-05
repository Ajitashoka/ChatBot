document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;
  
    // Display user message
    addMessage(userInput, 'user-message');
  
    // Clear input field
    document.getElementById('user-input').value = '';
  
    // Send request to the backend
    try {
      const response = await fetch('http://localhost:8000/complete', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ "prompt": userInput })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const botResponse = data.data;
  
      
      addMessage(botResponse, 'bot-message');
      
    } catch (error) {
      console.error('Error fetching bot response:', error);
      addMessage("Sorry, I couldn't connect to the server.", 'bot-message');
    }
  }
  
  function addMessage(message, className) {
    const chatOutput = document.getElementById('chat-output');
    const messageElement = document.createElement('div');
    messageElement.className = className;
    messageElement.textContent = message;
    chatOutput.appendChild(messageElement);
    chatOutput.scrollTop = chatOutput.scrollHeight;
  }