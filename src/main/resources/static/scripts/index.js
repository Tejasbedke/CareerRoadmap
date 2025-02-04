const menuButton = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const body = document.body;
const careeroptions = document.querySelector('.career-options');

document.addEventListener("DOMContentLoaded", function () {
    // Example: Simulate logged-in user state using localStorage
    const loggedInUser = localStorage.getItem("userName");
    const profilePic = localStorage.getItem("profilePic") || "default-profile.png";

    if (loggedInUser) {
        document.getElementById("userProfile").style.display = "flex";
        document.getElementById("userName").textContent = loggedInUser;
        document.getElementById("profilePic").src = profilePic;

        // Hide login and signup buttons
        document.getElementById("loginBtn").style.display = "none";
        document.getElementById("signupBtn").style.display = "none";
    }

    // Logout functionality
    document.getElementById("logoutBtn").addEventListener("click", function () {
        localStorage.removeItem("userName");
        localStorage.removeItem("profilePic");
        window.location.reload(); // Reload to reset the UI
    });
});

// Example function for setting user after login (for demo)
function simulateLogin() {
    localStorage.setItem("userName", "John Doe");  // Replace with actual username
    localStorage.setItem("profilePic", "path-to-user-pic.jpg"); // Replace with user profile picture URL
    window.location.reload();
}
// Toggle the visibility of the menu when the button is clicked
function toggleMenu() {
    menu.classList.toggle("visible");


    // Change the icon from hamburger to cross (or vice versa)
    setTimeout(() => {
        if (menu.classList.contains("visible")) {
            menuButton.innerHTML = "&#10006;"; // Change to cross
            body.classList.add('menu-open'); // Apply blur and disable clicks
        } else {
            menuButton.innerHTML = "&#9776;"; // Change to hamburger
            body.classList.remove('menu-open'); // Remove blur and enable clicks
        }
    },300);
}

// Close menu when clicking outside

document.addEventListener('click', function (e) {
    if (!menu.contains(e.target) && !menuButton.contains(e.target)) {
        // If the click is outside the menu and the menu button, close the menu
        if (menu.classList.contains('visible')) {
            menu.classList.remove('visible');
            menuButton.innerHTML = "&#9776;"; // Change to hamburger
            body.classList.remove('menu-open'); // Remove blur effect
        }
    }
});

// Prevent menu from closing when clicking inside the menu
menu.addEventListener('click', function (e) {
    e.stopPropagation(); // Prevent event from propagating to the document
});

document.querySelectorAll('.category').forEach(trigger => {
    trigger.addEventListener('click', function () {
        // Hide all target divs
        document.querySelectorAll('.career-options').forEach(target => {
            target.style.display = 'none';
        });
        // Get the target ID from the data attribute
        const targetId = this.dataset.target;

        // Find the target div by its ID
        const targetDiv = document.getElementById(targetId);

        // Toggle the visibility of the target div
        if (targetDiv) {
            targetDiv.style.display = targetDiv.style.display === 'none' || targetDiv.style.display === ''
                ? 'block'
                : 'none';
        }
    });
});
// Show the button when the user scrolls down 100px
const goToTopButton = document.getElementById('goToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        goToTopButton.style.display = 'block';
    } else {
        goToTopButton.style.display = 'none';
    }
});

// Scroll to the top of the page
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
const GEMINI_API_KEY = 'AIzaSyCyDZjoWXcnX2SWmEhvMTPRmuBbvEjfsOk'; // Replace with your actual API key
const INITIAL_MESSAGE = "Hello! I'm your AI assistant. How can I help you today?";

// Chat state
let isChatOpen = false;
let isFirstMessage = true;

// Elements
const chatWidget = document.getElementById('chatWidget');
const chatToggle = document.getElementById('chatToggle');
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const typingIndicator = document.getElementById('typingIndicator');

// Initialize chat
function initChat() {
    if (isFirstMessage) {
        addMessage(INITIAL_MESSAGE, 'bot');
        isFirstMessage = false;
    }
}

// Toggle chat visibility
function toggleChat() {
    isChatOpen = !isChatOpen;
    chatWidget.style.display = isChatOpen ? 'flex' : 'none';
    chatToggle.style.display = isChatOpen ? 'none' : 'flex';
    if (isChatOpen) {
        initChat();
        userInput.focus();
    }
}

// Add message to chat
function addMessage(message, sender) {
    // Clean the message to avoid any reference to the AI's identity
    const cleanedMessage = message
        .replace(/\b(Gemini|AI|Chatbot)\b/gi, '') // Remove any AI or system references
        .trim();

    // Create and display the message as usual
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    messageDiv.innerHTML = cleanedMessage.replace(/\n/g, '<br>');
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show/hide typing indicator
function toggleTypingIndicator(show) {
    typingIndicator.style.display = show ? 'block' : 'none';
}

// Send message to Gemini API
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Clear input and disable controls
    userInput.value = '';
    sendButton.disabled = true;
    userInput.disabled = true;

    // Add user message to chat
    addMessage(message, 'user');
    toggleTypingIndicator(true);

    try {
        // Make API request to Gemini
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: message
                    }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data from API');
        }

        const data = await response.json();

        // Hide typing indicator
        toggleTypingIndicator(false);

        // Add AI response to chat
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            addMessage(data.candidates[0].content.parts[0].text, 'bot');
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        console.error('Error:', error); // Log the full error object
        toggleTypingIndicator(false);
        addMessage('Sorry, I encountered an error. Please try again.', 'bot');
    }

    // Re-enable controls
    sendButton.disabled = false;
    userInput.disabled = false;
    userInput.focus();
}


// Event listeners
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Initialize chat widget
document.addEventListener('DOMContentLoaded', () => {
    chatWidget.style.display = 'none';
});
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".search-input");
    const careerItems = document.querySelectorAll(".career-item");

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase().trim();

        careerItems.forEach(item => {
            const title = item.querySelector("h3").textContent.toLowerCase();
            if (title.includes(query) || query === "") {
                item.style.display = "block"; // Show matching cards
            } else {
                item.style.display = "none"; // Hide non-matching cards
            }
        });
    });
});
