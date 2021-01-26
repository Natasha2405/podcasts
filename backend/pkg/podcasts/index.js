const mongoose = require('mongoose');

const Podcast = mongoose.model(
    'podcasts',
    {
        rss_link: String,
        title: String,
        description: String,
        // link: String,
        link: { type: String, unique: true},
        image: String,
        author: String
        // _deleted: Boolean
    },
    'podcasts'
);

const getAll = async () => {
    let data = await Podcast.find({});
    return data;
};

const save = async (data) => {
    let podcast = new Podcast(data);
    return await podcast.save();
};

const getOne = async (id) => {
    let data = await Podcast.findOne({ _id: id });
    return data;
};

const update = async (id, podcastData) => {
    let data = await Podcast.updateOne({ _id: id }, podcastData);
    return data.nModified !== 0;
};

const remove = async (id) => {
    let data = await Podcast.updateOne({ _id: id }, { _deleted: true });
    return data.nModified !== 0;
};

module.exports = {
    getAll,
    save,
    getOne,
    update,
    remove
};