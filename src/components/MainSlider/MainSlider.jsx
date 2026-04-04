import Slider from "react-slick";
import mainSlider from "../../assets/images/mainImage.jpg";
import sndSlider from "../../assets/images/scndImage.jpg";
import slide1 from "../../assets/images/slide1.jpg";
import slide2 from "../../assets/images/slide2.jpg";

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 800,
    arrows: false,
  };
  return (
    <>
      <div className="row">
        <div className="w-3/4">
          <Slider {...settings}>
            <img className="w-full h-[400px]" src={mainSlider} alt="" />
            <img className="w-full h-[400px]" src={sndSlider} alt="" />
          </Slider>
        </div>
        <div className="w-1/4">
          <img className="w-full h-[200px]" src={slide1} alt="" />
          <img className="w-full h-[200px]" src={slide2} alt="" />
        </div>
      </div>
    </>
  );
}
