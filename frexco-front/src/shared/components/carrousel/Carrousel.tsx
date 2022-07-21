import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';

class DemoCarousel extends Component {
  render() {
    return (
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showStatus={true}
        centerMode={true}
        centerSlidePercentage={100}
        showThumbs={false}
      >
        <div>
          <img src="https://darkside.vteximg.com.br/arquivos/A-Floresta-Banner-home.jpg?v=637928887647600000" />
        </div>
        <div>
          <img src="https://www.darksidebooks.com.br/arquivos/as-100-noites-de-hero-banner.jpg?v=637928887583530000" />
        </div>
        <div>
          <img src="https://www.darksidebooks.com.br/arquivos/historia-nunca-contei-home.jpg?v=637921098552430000" />
        </div>
      </Carousel>
    );
  }
}

export { DemoCarousel };