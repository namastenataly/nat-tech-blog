// Handle logout functionality
const logout = async () => {
  try {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/login');
    } else {
      alert('Failed to log out.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while logging out.');
  }
};

document.querySelector('#logout').addEventListener('click', logout);