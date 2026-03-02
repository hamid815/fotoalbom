import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Album.css";
export default function Album() {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetch(`/data/${albumId}.json`)
      .then((res) => res.json())
      .then(setAlbum);
  }, [albumId]);

  if (!album) return <p>Yuklanmoqda...</p>;

  return (
    <div className="album">
      <header className="album-header">
        <h2>{album.class}</h2>
        {/* <h2>{album.school}</h2> */}
        <p>{album.year}</p>
      </header>

      {album.photos.map((block) => {
        if (block.type === "students") {
          return (
            <div key={block.id} className="stories">
              {block.items.map((item, i) => (
                <div
                  key={i}
                  className="story"
                  onClick={() => item.video && setSelectedVideo(item.video)}
                  style={{ cursor: item.video ? "pointer" : "default" }}
                >
                  <img src={item.photo} alt={item.name} />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          );
        }

        if (block.type === "group") {
          return (
            <div>
              <div key={block.id}>
                <h3 className="group-title">{block.text}</h3>
              </div>
              <div key={block.id} className="fullscreen-post">
              <div className="fullscreen-scroll">
                {block.items.map((img, i) => (
                  <div className="fullscreen-slide" key={i}>
                   
                    <img src={img} alt={`group-${i}`} />
                    <div className="counter">
                      {i + 1} / {block.items.length}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>
          );
        }

        return null;
      })}
      {/* ===== VIDEO MODAL ===== */}
      {selectedVideo && (
        <div className="video-modal" onClick={() => setSelectedVideo(null)}>
          <video src={selectedVideo} controls autoPlay />
        </div>
      )}
    </div>
  );
}
