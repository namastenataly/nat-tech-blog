// Handle form submission for sign-up
const signUpFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#usernameSignup').value.trim();
  const email = document.querySelector('#emailSignup').value.trim();
  const password = document.querySelector('#passwordSignup').value.trim();

  if (username && email && password) {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while signing up.');
    }
  } else {
    alert('Please fill out all fields.');
  }
};

document.querySelector('.signup-form').addEventListener('submit', signUpFormHandler);