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

    res.render('site/live-list', {
      title: 'Live - The Page',
      styles: ['news'],
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

    res.render('site/live', {
      title: `${live.title} - The Page`,
      styles: ['live'],
      live
    });
  });
});

io.on('connection', client => {  
  console.log('User connected');

  client.on('comment', text => {
    const comment = {
      username: user.username,
      userThumbnail: user.thumbnail,
      text,
      date: date.format(new Date(), 'YYYY/MM/DD HH:mm')
    }

    liveController.addComment(liveId, comment, err => {
      if (err) {
        return next();
      }

      client.emit('newComment', comment);
      client.broadcast.emit('newComment', comment);
    });
  });

  client.on('disconnect', () => console.log('User disconnected'));
});

module.exports = router;
