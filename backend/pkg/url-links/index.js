const mongoose = require('mongoose');

const Url = mongoose.model(
    'rss-links',
    {
        url: String,
        _deleted: Boolean
    },
    'rss-links'
);

const getAll = async () => {
    let data = await Url.find({});
    return data;
};

const save = async (data) => {
    let link = new Url(data);
    return await link.save();
};

const getOne = async (id) => {
    let data = await Url.findOne({ _id: id });
    return data;
};

const update = async (id, urlData) => {
    let data = await Url.updateOne({ _id: id }, urlData);
    return data.nModified !== 0;
};

const remove = async (id) => {
    let data = await Url.updateOne({ _id: id }, { _deleted: true });
    return data.nModified !== 0;
};

module.exports = {
    getAll,
    save,
    getOne,
    update,
    remove
};