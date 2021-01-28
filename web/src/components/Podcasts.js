import React from 'react';
import axios from 'axios';

export class Podcasts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            podcasts: []
        }
    }

    getPodcasts = () => {
        axios({
            url: "http://localhost:9002/api/v1/podcasts",
            method: "GET"
        })
            .then(res => {
                this.setState({
                    podcasts: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        console.log(this.state)

        return (
            <div id="podcasts">

                <button type={"button"} onClick={() => { this.getPodcasts() }}>
                    Get Podcasts
                </button>

                <ul id="podcasts-list">
                    {this.state.podcasts.map((podcast, i) => {
                        return (
                            <div id="li-card" style={{ width: "200px" }}>
                                <li key={i}>
                                    <img className="card-img-top" src={podcast.image} alt="Podcast" style={{ width: "100%" }} />
                                    <div className="card-body">
                                        <span className="card-title"><b> {podcast.title} </b></span>
                                        <span> {podcast.author} </span>
                                        {/* <span>  </span> */}
                                    </div>
                                </li>
                            </div>
                        )
                    })}
                </ul>

            </div>
        )
    }
};