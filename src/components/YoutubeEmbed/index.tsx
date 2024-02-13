import React from "react";

interface YoutubeEmbedProps {
    url: string;
    containerClasses?: string;
    elementClasses?: string;
}

const extractVideoID = (url: string) => {
    const regex = /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?/]+)/;
    const match = url.match(regex);
    return match && match[1];
};

export const YoutubeEmbed = ({ url, containerClasses = "", elementClasses = "" }: YoutubeEmbedProps) => {
    const embedId = extractVideoID(url);
    return (
        <div className={`video-responsive ${containerClasses}`}>
            <iframe
                className={`${elementClasses}`}
                src={`https://www.youtube.com/embed/${embedId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
                style={{ aspectRatio: "16/9" }}
            />
        </div>
    );
};

export default YoutubeEmbed;
