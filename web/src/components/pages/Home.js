import React from 'react';
import {useState, useEffect} from 'react';
import Podcasts from './Podcasts';

const Home = () => {
    const [podcasts, setPodcasts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9002/api/v1/podcasts')
        .then(res => {
            return res.json();
        })
        .then(data => {
            setPodcasts(data);
        })
        .catch(err => {
            console.log(err.message);
        })
    }, []);

    return ( 
        <div className="home-page">
            <Podcasts podcasts={podcasts} />

        </div>
     );
}
 
export default Home;

