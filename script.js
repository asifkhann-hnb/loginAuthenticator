const formCard = document.getElementById('form-card');
const securePage = document.getElementById('secure-page');
const formTitle = document.getElementById('form-title');
const authForm = document.getElementById('auth-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const switchMode = document.getElementById('switch-mode');
const userNameSpan = document.getElementById('user-name');
const logoutBtn = document.getElementById('logout');

let isLoginMode = true;
let users = {}; // Local user storage

function showForm() {
    formCard.classList.add('active');
    securePage.classList.remove('active');
    authForm.reset();
}

function showSecurePage(username) {
    userNameSpan.textContent = username;
    formCard.classList.remove('active');
    securePage.classList.add('active');
}

switchMode.addEventListener('click', () => {
    isLoginMode = !isLoginMode;
    formTitle.textContent = isLoginMode ? 'Login' : 'Register';
    document.querySelector('.button').textContent = isLoginMode ? 'Login' : 'Register';
    switchMode.textContent = isLoginMode ? 'Register' : 'Login';
    document.querySelector('.toggle').innerHTML = isLoginMode
        ? `Don't have an account? <span id="switch-mode">Register</span>`
        : `Already have an account? <span id="switch-mode">Login</span>`;
});

authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) return alert('Please fill in both fields');

    if (isLoginMode) {
        if (users[username] && users[username] === password) {
            showSecurePage(username);
        } else {
            alert('Invalid credentials');
        }
    } else {
        if (users[username]) {
            alert('User already exists');
        } else {
            users[username] = password;
            alert('Registered successfully! Now login.');
            isLoginMode = true;
            formTitle.textContent = 'Login';
            document.querySelector('.button').textContent = 'Login';
            switchMode.textContent = 'Register';
        }
    }
});

logoutBtn.addEventListener('click', () => {
    showForm();
});

showForm();
