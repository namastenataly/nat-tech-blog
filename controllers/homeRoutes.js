const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Route for the homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: { exclude: ['password'] } }],
      order: [['updated_at', 'DESC']],
      limit: 5,
    });

    const posts = postData.map((data) => data.get({ plain: true }));

    res.render('homepage', { posts, logged_in: req.session.logged_in, logged_in_username: req.session.username });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Route for the dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
      order: [['updated_at', 'DESC']],
      limit: 5,
    });

    const posts = postData.map((data) => data.get({ plain: true }));

    res.render('dashboard', { posts, logged_in: req.session.logged_in, logged_in_username: req.session.username });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Route for the add post page
router.get('/addpost', withAuth, async (req, res) => {
  try {
    res.render('addpost', { logged_in: req.session.logged_in, logged_in_username: req.session.username });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Route for viewing a post
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: { exclude: ['password'] } },
        { model: Comment, include: [{ model: User, attributes: { exclude: ['password'] } }] },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('blogpost', { post, logged_in: req.session.logged_in, logged_in_username: req.session.username });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Route for login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// Route for signup page
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;