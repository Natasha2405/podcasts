const rssfeed = require('../pkg/rssfeed');
const urlsModel = require('../pkg/url-links');

const getPodcastsData = async (req, res) => {
    try {
        let data = await rssfeed.getRssFeed();
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error')
    }
};

const getEpisodesData = async (req, res) => {
    try {
        let data = await rssfeed.saveEpisodes();
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error')
    }
};

const getAll = async (req, res) => {
    try {
        let data = await urlsModel.getAll();
        return res.status(200).send(data);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error')
    }
};


const save = async (req, res) => {
    try {
        let data = {
            ...req.body,
            _deleted: false
        }
        let link = await urlsModel.save(data);
        return res.status(201).send(link);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
};

const getOne = async (req, res) => {
    try {
        let data = await urlsModel.getOne(req.params.id);
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
        let updateUrl = await urlsModel.update(req.params.id, req.body);
        if (updateUrl) {
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
        let deleteUrl = await urlsModel.remove(req.params.id);
        if (deleteUrl) {
            return res.status(204).send('No Content');
        }
        return res.status(404).send('Not Found');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getPodcastsData,
    getEpisodesData,
    getAll,
    save,
    getOne,
    update,
    remove
};