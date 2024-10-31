import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { Typography, Box, useTheme, Paper } from "@mui/material";
import { tokens } from "../theme";

const MuiCarousel  = ({ items }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const settings = {
    //dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    autoplaySpeed: 10000,
  };
  return (
    <Slider {...settings}>
      {items.map((item, index) => (
        <Paper
          key={index}
          elevation={0}
          style={{ padding: 20, margin: 'auto', width: '90%' }}
        >
          {item.content}
        </Paper>
      ))}
    </Slider>
  );
};

export default MuiCarousel;