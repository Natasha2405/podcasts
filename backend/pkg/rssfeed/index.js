const parser = require('fast-xml-parser');
const he = require('he');
const fetch = require('node-fetch');
const dbFeed = require('../url-links');
const epModel = require('../episodes');
const podModel = require('../podcasts');

// let linkData = [
//     'https://obicniluge.mk/feed/podcast',
//     'https://anchor.fm/s/1ab0448c/podcast/rss',
//     'https://anchor.fm/s/43aaaa58/podcast/rss',
//     'https://anchor.fm/s/44fbc39c/podcast/rss',
//     'http://vofilm.mk/feed/',
//     'https://anchor.fm/s/2fcbe448/podcast/rss',
//     'https://anchor.fm/s/2484e918/podcast/rss',
//     'https://omny.fm/shows/bukkast-knizevni-razgovori-so-ande/playlists/podcast.rss',
//     'https://feeds.sbs.com.au/sbs-macedonian',
//     'https://feeds.buzzsprout.com/1059874.rss',
//     'https://anchor.fm/s/3c2e2764/podcast/rss',
//     'https://anchor.fm/s/44fbc39c/podcast/rss',
//     'https://anchor.fm/s/44fbc39c/podcast/rss'
// ];

const getRssFeed = async () => {

    let data = await dbFeed.getAll();
    // console.log(data);

    let linkData = [];
    data.map(res => {
        linkData.push(res.url);
    });
    // console.log(linkData);

    let xmlData;
    let urlElement = '';
    for (let i = 0; i < linkData.length; i++) {
        urlElement = linkData[i]
        // console.log(urlElement);
        try {
            // let data = await fetch('https://www.slobodnaevropa.mk/podcast/?zoneId=441');
            let data = await fetch(`${urlElement}`);
            xmlData = await data.text();
            // console.log(xmlData);
            // return xmlData;
            var options = {
                attributeNamePrefix: "@_",
                attrNodeName: "attr", //default is 'false'
                textNodeName: "#text",  // "#text"
                ignoreAttributes: false, // bese true
                ignoreNameSpace: false,
                allowBooleanAttributes: false,
                parseNodeValue: true,
                parseAttributeValue: false,
                trimValues: true,
                cdataTagName: "", //default is 'false' /__cdata
                cdataPositionChar: "\\c",
                parseTrueNumberOnly: false,
                arrayMode: false, //"strict"
                attrValueProcessor: (val, attrName) => he.decode(val, { isAttributeValue: true }),//default is a=>a
                tagValueProcessor: (val, tagName) => he.decode(val), //default is a=>a
                stopNodes: ["parse-me-as-string"]
            };

            // if (parser.validate(xmlData) === true) { //optional (it'll return an object in case it's not valid)
            //     var jsonObj = parser.parse(xmlData, options);
            // }

            try {
                var jsonObj = parser.parse(xmlData, options, true);
            } catch (error) {
                console.log(error.message)
            }

            // Intermediate obj
            var tObj = await parser.getTraversalObj(xmlData, options);
            // console.log(tObj);
            var jsonObj = await parser.convertToJson(tObj, options);
            // console.log(jsonObj);
            // return jsonObj;

            let channel = {};
            // if (jsonObj.rss.channel['atom:link']) {
            //     channel.rss_link = jsonObj.rss.channel['atom:link'].attr['@_href'];
            // } else {
            //     channel.rss_link = jsonObj.rss.channel['atom:link'][0].attr['@_href'];
            // }
            channel.title = jsonObj.rss.channel.title
            if (jsonObj.rss.channel.description) {
                channel.description = jsonObj.rss.channel.description
            } else {
                channel.description = 'Description is not available';
            }
            if (jsonObj.rss.channel.link) {
                channel.link = jsonObj.rss.channel.link
            } else {
                channel.link = 'Link is not available';
            }
            if (jsonObj.rss.channel.image) {
                channel.image = jsonObj.rss.channel.image.url
            } else {
                channel.image = 'Image is not available';
            }
            if (jsonObj.rss.channel.author) {
                channel.author = jsonObj.rss.channel.author
            } else if (jsonObj.rss.channel['itunes:author']) {
                channel.author = jsonObj.rss.channel['itunes:author'];
            }

            // console.log(channel);
            await podModel.save(channel);

        } catch (err) {
            console.log(err);
        }
    }
};

const saveEpisodes = async () => {

    let podcastsData = await podModel.getAll();

    // let linkData = [];
    // podcastsData.map(res => {
    //     linkData.push(res.rss_link);
    // });
    // console.log(linkData);

    let xmlData;
    let urlElement = '';

    for (let i = 0; i < podcastsData.length; i++) {
        urlElement = podcastsData[i].rss_link
        // console.log(urlElement);
        try {
            let data = await fetch(`${urlElement}`);
            xmlData = await data.text();
            // console.log(xmlData);
            // return xmlData;

            var options = {
                attributeNamePrefix: "@_",
                attrNodeName: "attr", //default is 'false'
                textNodeName: "#text",  // "#text"
                ignoreAttributes: false, // bese true
                ignoreNameSpace: false,
                allowBooleanAttributes: false,
                parseNodeValue: true,
                parseAttributeValue: false,
                trimValues: true,
                cdataTagName: "", //default is 'false' /__cdata
                cdataPositionChar: "\\c",
                parseTrueNumberOnly: false,
                arrayMode: false, //"strict"
                attrValueProcessor: (val, attrName) => he.decode(val, { isAttributeValue: true }),//default is a=>a
                tagValueProcessor: (val, tagName) => he.decode(val), //default is a=>a
                stopNodes: ["parse-me-as-string"]
            };

            // if (parser.validate(xmlData) === true) { //optional (it'll return an object in case it's not valid)
            //     var jsonObj = parser.parse(xmlData, options);
            // }

            try {
                var jsonObj = parser.parse(xmlData, options, true);
            } catch (error) {
                console.log(error.message)
            }

            // Intermediate obj
            var tObj = await parser.getTraversalObj(xmlData, options);
            // console.log(tObj);
            var jsonObj = await parser.convertToJson(tObj, options);
            // console.log(jsonObj);
            // return jsonObj;

            let episode = {};
            if (Array.isArray(jsonObj.rss.channel.item)) {
                jsonObj.rss.channel.item.forEach(ep => {
                    episode.title = ep.title;
                    if (ep.description) {
                        episode.description = ep.description;
                    } else {
                        episode.description = 'Description is not available';
                    }
                    if (ep.link) {
                        episode.link = ep.link
                    } else {
                        episode.link = 'Link is not available';
                    }
                    episode.guid = ep.guid['#text'] !== undefined ? ep.guid['#text'] : ep.guid;
                    episode.pubDate = ep.pubDate;
                    // episode.url = ep.enclosure.attr['@_url'];
                    if (ep.enclosure) {
                        episode.url = ep.enclosure.attr['@_url'];
                    } else {
                        episode.url = 'Link is not available';
                    }
                    episode.podcastId = podcastsData[i]._id;
                    epModel.save(episode);
                    // console.log(episode);
                });
            } else {
                episode.title = jsonObj.rss.channel.item.title;
                if (jsonObj.rss.channel.item.description) {
                    episode.description = jsonObj.rss.channel.item.description;
                } else {
                    episode.description = 'Description is not available';
                }
                if (jsonObj.rss.channel.item.link) {
                    episode.link = jsonObj.rss.channel.item.link
                } else {
                    episode.link = 'Link is not available';
                }
                episode.guid = jsonObj.rss.channel.item.guid['#text'] !== undefined ? jsonObj.rss.channel.item.guid['#text'] : jsonObj.rss.channel.item.guid;
                episode.pubDate = jsonObj.rss.channel.item.pubDate;
                if (jsonObj.rss.channel.item.enclosure) {
                    episode.url = jsonObj.rss.channel.item.enclosure.attr['@_url'];
                } else {
                    episode.url = 'Link is not available';
                }
                episode.podcastId = podcastsData[i]._id;
                epModel.save(episode);
                // console.log(episode);
            }
        } catch (err) {
            console.log(err);
        }
    }
};

module.exports = {
    getRssFeed,
    saveEpisodes
};





