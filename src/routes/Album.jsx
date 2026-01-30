import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Album() {
  const { albumId } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/data/${albumId}.json`)
      .then(res => {
        if (!res.ok) throw new Error("Album topilmadi");
        return res.json();
      })
      .then(setData)
      .catch(err => {
        console.error(err);
        setError(true);
      });
  }, [albumId]);

  if (error) return <h1>Album topilmadi</h1>;
  if (!data) return <h1>Loading...</h1>;

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>{data.title}</h1>
      <p>{data.school}</p>
      <p>{data.class}</p>
      <p>{data.year}</p>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {data.gallery.map((img, i) => (
          <img
            key={i}
            src={img}
            width="200"
            alt={`Sinf rasm ${i + 1}`}
            style={{ borderRadius: "5px", objectFit: "cover" }}
          />
        ))}
      </div>
    </div>
  );
}
