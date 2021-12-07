const newFormHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#comment-desc').value.trim();

  if (comment) {
    console.log(comment)
      }
    };

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create comment');
    };

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete comment');
    }
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);
