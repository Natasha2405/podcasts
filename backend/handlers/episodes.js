const episodesModel = require('../pkg/episodes');

const getAll = async (req, res) => {
    try {
        let data = await episodesModel.getAll();
        return res.status(200).send(data);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error')
    }
};

const getAllFromPodcast = async (req, res) => {
    try {
        let data = await episodesModel.getAllFromPodcast(req.params.pid);
        if (data) {
            return res.status(200).send(data);
        }
        return res.status(404).send('Not Found');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error')
    }
};

const save = async (req, res) => {
    try {
        let ep = await episodesModel.save(data);
        return res.status(201).send(ep);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
};

const getOne = async (req, res) => {
    try {
        let data = await episodesModel.getOne(req.params.id);
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
        let updateEpisode = await episodesModel.update(req.params.id, req.body);
        if (updateEpisode) {
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
        let deleteEpisode = await episodesModel.remove(req.params.id);
        if (deleteEpisode) {
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
    getAllFromPodcast,
    save,
    getOne,
    update,
    remove
};