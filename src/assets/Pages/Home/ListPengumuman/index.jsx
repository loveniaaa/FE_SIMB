import React from "react";
import { useNavigate } from "react-router-dom";

const AnnouncementList = ({ announcements }) => {
  const navigate = useNavigate();

  const getColorClass = (index) => {
    const colorClasses = [
      "item-cyan",
      "item-orange",
      "item-teal",
      "item-red",
      "item-indigo",
      "item-pink",
    ];
    return colorClasses[index % colorClasses.length];
  };

  const getIcon = (index) => {
    const icons = [
      "bi-activity",
      "bi-broadcast",
      "bi-easel",
      "bi-bounding-box-circles",
      "bi-calendar4-week",
      "bi-chat-square-text",
    ];
    return icons[index % icons.length];
  };

  return (
    <div className="row gy-4">
      {announcements.map((item, index) => (
        <div
          key={item.uuid}
          className="col-lg-4 col-md-6"
          data-aos="fade-up"
          data-aos-delay={100 * (index + 1)}
        >
          <div className={`service-item ${getColorClass(index)} position-relative`}>
            <i className={`bi ${getIcon(index)} icon`} />
            <h3>{item.title || "Judul tidak tersedia"}</h3>
            <p>{item.description?.substring(0, 100) || "Deskripsi tidak tersedia"}</p>
            <button
              className="read-more stretched-link btn btn-link text-decoration-none"
              onClick={() => navigate(`/announcement/${item.uuid}`)}
            >
              <span>Read More</span> <i className="bi bi-arrow-right" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnnouncementList;
