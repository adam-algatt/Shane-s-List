const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const singlePostRoutes = require('./single-post-routes.js');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api/posts/:post_id', singlePostRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;

