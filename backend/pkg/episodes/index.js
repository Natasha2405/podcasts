const mongoose = require('mongoose');

const Episode = mongoose.model(
    'episodes',
    {
        title: String,
        description: String,
        link: String,
        guid: { type: String, index: { unique: true } },
        pubDate: String,
        url: String,
        podcastId: String
        // _deleted: Boolean
    },
    'episodes'
);

const getAll = async () => {
    let data = await Episode.find({});
    return data;
};

const getAllFromPodcast = async (podcastId) => {
    let data = await Episode.find({ podcastId: podcastId });
    return data;
};

const save = async (data) => {
    let ep = new Episode(data);
    return await ep.save();
};

const getOne = async (id) => {
    let data = await Episode.findOne({ _id: id });
    return data;
};

// const getOneByLink = async (link) => {
//     let data = await Episode.findOne({ link });
//     return data;
// };

const update = async (id, epData) => {
    let data = await Episode.updateOne({ _id: id }, epData);
    return data.nModified !== 0;
};

const remove = async (id) => {
    let data = await Episode.updateOne({ _id: id }, { _deleted: true });
    return data.nModified !== 0;
};

module.exports = {
    getAll,
    getAllFromPodcast,
    save,
    getOne,
    // getOneByLink,
    update,
    remove
};