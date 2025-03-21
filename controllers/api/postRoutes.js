const router = require('express').Router();
const { Post } = require('../../models');

// Creating a new post
router.post('/', async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.postTitle,
      content: req.body.postContent,
      user_id: req.session.user_id,
    });

    res.status(200).json(postData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Updating a post based on its id
router.put('/:id', async (req, res) => {
  try {
    const postData = await Post.update(
      {
        title: req.body.updateTitle,
        content: req.body.updateContent,
      },
      {
        where: { id: req.params.id },
      }
    );

    res.status(200).json(postData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Deleting a post based on its id
router.delete('/:id', async (req, res) => {
  try {
    await Post.destroy({
      where: { id: req.params.id },
    });

    res.status(200).json({ message: 'Deleted post successfully.' });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;