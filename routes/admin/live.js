const date = require('date-and-time');
const router = require('express').Router();
const liveController = require('../../controllers/live.js');

router.use((req, res, next) => {
  global.liveId;
  next();
});

router.get('/', (req, res, next) => {
  liveController.getLive((err, liveList) => {
    if (err) {
      return next();
    }

    res.render('admin/live-list', {
      title: 'Live - The Page',
      styles: ['news'],
      scripts: ['live-list'],
      liveList
    });
  });
});

router.get('/:id', (req, res, next) => {
  liveId = req.params.id;

  liveController.getLiveById(liveId, (err, live) => {
    if (err) {
      return next();
    }

    res.render('admin/live', {
      title: `${live.title} - The Page`,
      styles: ['live'],
      live
    });
  });
});

router.get('/create', (req, res) => {
  res.render('admin/create-live', {
    title: 'Create Live - The Page',
    styles: ['article'],
    scripts: ['live-setting'],
  });
});

router.post('/create', (req, res, next) => {
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('summary', 'Summary is required').notEmpty();
  req.checkBody('image', 'Image is required').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    return console.error(errors);
  } else {
    const live = {
      title: req.body.title,
      summary: req.body.summary,
      image: req.body.image
    }

    liveController.createLive(live, err => {
      if (err) {
        return next();
      }

      res.end();
    });
  }
});

router.get('/update/:id', (req, res, next) => {
  liveId = req.params.id;

  liveController.getLiveById(liveId, (err, live) => {
    if (err) {
      return next();
    }

    res.render('admin/update-live', {
      title: `${live.title} - The Page`,
      styles: ['article'],
      scripts: ['live-setting'],
      live
    });
  });
});

router.put('/update', (req, res, next) => {
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('summary', 'Summary is required').notEmpty();
  req.checkBody('image', 'Image is required').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    return console.error(errors);
  } else {
    const live = {
      title: req.body.title,
      summary: req.body.summary,
      image: req.body.image
    }

    liveController.updateLive(liveId, live, err => {
      if (err) {
        return next();
      }

      res.end();
    });
  }
});

router.put('/online/:id', (req, res, next) => {
  const id = req.params.id;

  liveController.onlineLive(id, err => {
    if (err) {
      return next();
    }

    res.end();
  });
});

router.delete('/delete/:id', (req, res, next) => {
  const id = req.params.id;

  liveController.deleteLive(id, err => {
    if (err) {
      return next();
    }

    res.end();
  });
});

io.on('connection', client => {  
  console.log('Admin connected');

  client.on('post', (text = '', image = '') => {
    const post = {
      username: user.username,
      userThumbnail: user.thumbnail,
      text,
      image,
      date: date.format(new Date(), 'YYYY/MM/DD HH:mm')
    }

    liveController.addPost(liveId, post, err => {
      if (err) {
        return next();
      }

      client.emit('newPost', post);
      client.broadcast.emit('newPost', post);
    });
  });

  client.on('disconnect', () => console.log('Admin disconnected'));
});


module.exports = router;