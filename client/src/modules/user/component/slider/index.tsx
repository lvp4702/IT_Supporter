import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper';
// import slide3 from '../../../../atoms/images/slide3.png';
// import slide1 from '../../../../atoms/images/slide1.png';
// import slide2 from '../../../../atoms/images/slide2.png';

// Import Swiper styles
import 'swiper/css';
import { slideApis } from 'src/apis/admin';

const Slider = () => {
  const [slides, setSlides] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const { data } = await slideApis.findAll();
      setSlides(data.data || []);
    })();
  }, []);

  return (
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
      {slides.map((item: any) => (
        <SwiperSlide>
          <img
            src={`${process.env.REACT_APP_DOMAIN}/${item.image}`}
            alt=""
            className="h-[100px] object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
