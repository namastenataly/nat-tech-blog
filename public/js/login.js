// Handle form submission for login
const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#usernameLogin').value.trim();
  const password = document.querySelector('#passwordLogin').value.trim();

  if (username && password) {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Invalid username or password.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while logging in.');
    }
  } else {
    alert('Please enter both username and password.');
  }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);