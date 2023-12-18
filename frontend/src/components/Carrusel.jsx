import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carrusel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      <div>
        <img
          src="/img/img1.jpg"
          alt="Slide 1"
          style={{ width: "100%" }}
        />
      </div>
      <div>
        <img
          src="/img/img2.jpg"
          alt="Slide 1"
          style={{ width: "100%" }}
        />
      </div>
      <div>
        <img
          src="/img/img3.jpg"
          alt="Slide 1"
          style={{ width: "100%" }}
        />
      </div>
      <div>
        <img
          src="/img/img4.jpg"
          alt="Slide 1"
          style={{ width: "100%" }}
        />
      </div>
      <div>
        <img
          src="/img/img5.jpg"
          alt="Slide 1"
          style={{ width: "100%" }}
        />
      </div>
      <div>
        <img
          src="/img/img6.jpg"
          alt="Slide 1"
          style={{ width: "100%" }}
        />
      </div>
      {/* Agrega más imágenes según sea necesario */}
    </Slider>
  );
};

export default Carrusel;
