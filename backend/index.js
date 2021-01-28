const cfg = require('./pkg/config');
require('./pkg/db');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const rssfeed = require('./handlers/rssfeed');
const episodes = require('./handlers/episodes');
const podcasts = require('./handlers/podcasts');

const api = express();
api.use(bodyParser.json());
api.use(cors());

api.get('/api/v1/feeds/data', rssfeed.getPodcastsData);
api.get('/api/v1/feeds/episodes', rssfeed.getEpisodesData);

api.get('/api/v1/podcasts', podcasts.getAll);
// api.get('/api/v1/episodes', episodes.getAll);
api.get('/api/v1/podcasts/:pid/episodes', episodes.getAllFromPodcast);
//api.get('/api/v1/episodes/:eid', episodes.getOne);


// api.post('/urllink', rssfeed.save);
// api.get('/urllink', rssfeed.getAll);


api.listen(cfg.get('server').port, err => {
    if (err) {
        return console.error('Could not start server: ', err);
    }
    console.log('Server successfully started on port: ', cfg.get('server').port);
});