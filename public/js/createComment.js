// Handle form submission for creating a comment
const commentFormHandler = async (event) => {
  event.preventDefault();

  const commentContent = document.querySelector('#comment-content').value.trim();
  const postId = document.querySelector('#post-card').getAttribute('data-id');

  if (commentContent && postId) {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ commentContent, postId }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to add comment.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the comment.');
    }
  } else {
    alert('Please enter a comment.');
  }
};

document.querySelector('.addcomment-form').addEventListener('submit', commentFormHandler);

// Handle update and delete functionality
const handlePostUpdateAndDelete = () => {
  const buttonsDiv = document.getElementById('buttons-div');
  const updateButton = document.getElementById('update-button');
  const updateFormCard = document.getElementById('updatepost-card');
  const closeUpdate = document.getElementById('close-update');
  const delButton = document.getElementById('delete-post');

  const userId = buttonsDiv.getAttribute('data-id');
  const postId = updateButton.getAttribute('data-id');

  if (userId === postId) {
    buttonsDiv.classList.remove('d-none');
    updateButton.classList.remove('d-none');
    delButton.classList.remove('d-none');
  }

  // Show update form
  updateButton.addEventListener('click', () => {
    updateFormCard.classList.remove('d-none');
  });

  // Close update form
  closeUpdate.addEventListener('click', () => {
    updateFormCard.classList.add('d-none');
  });

  // Handle post update
  const updateFormHandler = async (event) => {
    event.preventDefault();

    const updateTitle = document.querySelector('#update-title').value.trim();
    const updateContent = document.querySelector('#update-content').value.trim();

    if (updateTitle && updateContent) {
      try {
        const response = await fetch(`/api/posts/${postId}`, {
          method: 'PUT',
          body: JSON.stringify({ updateTitle, updateContent }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to update post.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while updating the post.');
      }
    } else {
      alert('Please enter a title and content.');
    }
  };

  document.querySelector('.updatepost-form').addEventListener('submit', updateFormHandler);

  // Handle post deletion
  const deletePostHandler = async () => {
    if (postId) {
      try {
        const response = await fetch(`/api/posts/${postId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to delete post.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while deleting the post.');
      }
    }
  };

  delButton.addEventListener('click', deletePostHandler);
};

handlePostUpdateAndDelete();