const router = require('express').Router();
const { Comment, Project } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const projectData = await Project.findAll({
      attributes: { include: [id, Project, user_id] }
    });
    res.status(200).json(projectData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const projectData = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(projectData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/', withAuth, async (req, res) => {
  try {
    const projectData = await Project.update({
      ...req.body, user_id: req.session.user_id
    });
    if (!projectData) {
      res.status(404).json({ message: 'Please sign in!' });
      return;
    }
    res.status(200).json(projectData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
