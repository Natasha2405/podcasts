const episodesModel = require('../pkg/episodes');
// const episodeValidator = require('../pkg/episodes/validator');

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

// const save = async (req, res) => {
//     try {
//         let ep = await episodesModel.save(data);
//         return res.status(201).send(ep);
//     } catch (err) {
//         console.log(err);
//         return res.status(500).send('Internal Server Error');
//     }
// };

const saveEpisode = async (req, res) => {
    try {
        await episodeValidator.validate(req.body, episodeValidator.episodeSchema);
    } catch (err) {
        console.log(err);
        return res.status(400).send('Bad Content');
    }

    // default values
    req.body._deleted = false;
    req.body._created = new Date().toISOString();

    try {
        let episode = await episodeModel.create(req.body);
        return res.status(201).send(episode);
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
    saveEpisode,
    getOne,
    update,
    remove
};