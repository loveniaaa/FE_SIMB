import React from "react";

function BackgroundImage() {
  return (
    <>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/fd7e124dc631082f925fbe7787182b7d07d49e70?placeholderIfAbsent=true"
        alt=""
        className="position-absolute background-image"
      />
      <style jsx>{`
        .background-image {
          width: 835px;
          height: 680px;
          top: 133px;
          left: 443px;
        }
        @media (max-width: 991px) {
          .background-image {
            width: 600px;
            height: 488px;
            top: 100px;
            left: 300px;
          }
        }
        @media (max-width: 640px) {
          .background-image {
            width: 400px;
            height: 325px;
            top: 50px;
            left: 100px;
          }
        }
      `}</style>
    </>
  );
}

export default BackgroundImage;
