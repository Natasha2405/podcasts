const podcastsModel = require('../pkg/podcasts');

const getAll = async (req, res) => {
    try {
        let data = await podcastsModel.getAll();
        return res.status(200).send(data);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error')
    }
};

const save = async (req, res) => {
    try {
        let podcast = await podcastsModel.save(data);
        return res.status(201).send(podcast);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
};

const getOne = async (req, res) => {
    try {
        let data = await podcastsModel.getOne(req.params.id);
        if (data) {
            return res.status(200).send(data);
        }
        return res.status(404).send('Not Found');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
};

const update = async (req, res) => {
    try {
        let updatePodcast = await podcastsModel.update(req.params.id, req.body);
        if (updatePodcast) {
            return res.status(204).send('No Content');
        }
        return res.status(404).send('Not Found');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
};

const remove = async (req, res) => {
    try {
        let deletePodcast = await podcastsModel.remove(req.params.id);
        if (deletePodcast) {
            return res.status(204).send('No Content');
        }
        return res.status(404).send('Not Found');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getAll,
    save,
    getOne,
    update,
    remove
};