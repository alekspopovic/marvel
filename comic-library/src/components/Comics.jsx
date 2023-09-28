/* eslint-disable react/prop-types */
import "../styles/Comics.scss";

export default function Comics({ data, onClick }) {
  return (
    <div className="comics">
      {data.map((dataItem) => {
        const detailsUrl = dataItem.urls.find(
          (element) => element["type"] === "detail"
        ).url;

        return (
          <a
            key={dataItem.id}
            className="comicCard"
            style={{
              background: `url(${dataItem.thumbnail.path}.${dataItem.thumbnail.extension}) no-repeat center`,
              backgroundSize: "cover",
            }}
            onClick={() => onClick(dataItem.id)}
            href={detailsUrl}
            target="_blank"
            rel="noreferrer"
          >
            <div className="caption">{dataItem.title}</div>
            <div className="caption bottom">View Comic Details</div>
          </a>
        );
      })}
    </div>
  );
}
