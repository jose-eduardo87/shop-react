import { CSSProperties } from "react";
import { Parallax } from "react-parallax";
import heroImage from "./hero-image.webp";

const contentStyles: CSSProperties = {
  background: "#000",
  padding: 5,
  position: "absolute",
  top: "25%",
  left: "50%",
  color: "#FFEF00",
  fontWeight: 600,
  letterSpacing: "4px",
  transform: "translate(-50%,-50%)",
};

const Hero = () => {
  return (
    <Parallax
      bgImage={heroImage}
      bgImageSizes="100"
      bgImageAlt="hero-image"
      strength={300}
    >
      <div style={{ height: 1000 }}>
        <div style={contentStyles}>
          <p>YOUR ONLINE SHOPPING.</p>
        </div>
      </div>
    </Parallax>
  );
};

export default Hero;
