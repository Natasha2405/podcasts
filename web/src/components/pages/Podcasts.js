const Podcasts = (props) => {

    return (
        <div className="all-podcasts">
            {props.podcasts.map(podcast => (
                <div className="podcast-preview" key={podcast.id}>
                    <img src={'podcast.image'} alt="Podcast Image" />
                    <h2>{podcast.title}</h2>
                    <p>{podcast.author}</p>
                </div>
            ))}
        </div>
    );
}

export default Podcasts;