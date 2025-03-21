// Handle form submission for creating a new post
const postFormHandler = async (event) => {
  event.preventDefault();

  const postTitle = document.querySelector('#post-title').value.trim();
  const postContent = document.querySelector('#post-content').value.trim();

  if (postTitle && postContent) {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ postTitle, postContent }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the post.');
    }
  } else {
    alert('Please enter a title and content.');
  }
};

document.querySelector('.addpost-form').addEventListener('submit', postFormHandler);

// Handle navigation back to dashboard
document.getElementById('post-back-button').addEventListener('click', () => {
  location.href = '/dashboard';
});