import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Slider from "react-slick";

const mainStyle = {
  height: "100%",
  width: "100%",
  backgroundColor: "#f2f2f2",
  display: "flex",
  flexDirection: "column",
};
export default function Home() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  return (
    <div style={mainStyle}>
      <div style={{ marginTop: "60px" }}>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              height="500px"
              src="https://wowslider.com/sliders/demo-93/data1/images/lake.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://wowslider.com/sliders/demo-93/data1/images/lake.jpg"
              alt="Second slide"
              height="500px"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://wowslider.com/sliders/demo-93/data1/images/lake.jpg"
              alt="Third slide"
              height="500px"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "10px",
          padding: 20,
        }}
      >
        <h3 style={{ marginLeft: 45, fontFamily: "Poppins" }}>
          Live <span style={{ color: "#007bff" }}>Shows</span>
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: 25,
            paddingRight: 25,
          }}
        >
          <Slider {...settings}>
            {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((i) => {
              return (
                <div style={{}}>
                  <Card style={{ marginLeft: 20, width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      src="https://wowslider.com/sliders/demo-93/data1/images/lake.jpg"
                    />
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          margin: "10px",
          padding: 20,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>
          About <span style={{ color: "#007bff" }}>Us</span>
        </h1>
        <div
          style={{
            alignSelf: "flex-start",
            marginTop: 40,
            fontSize: 40,
            fontWeight: 800,
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <div>
              <p>
                Lorem ipsum dolor sit amet,
                <br /> efficitur eleifend. Fusce interdum <br />
                mollis velit fringilla facilisis.{" "}
              </p>
            </div>
            <div>
              <img src="https://img.freepik.com/free-vector/abstract-grunge-live-music-poster_1017-9864.jpg?size=338&ext=jpg"></img>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#007bff",
          padding: 30,
          paddingTop: 60,
          paddingBottom: 60,
          marginTop: 30,
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", color: "#ffffff" }}
        >
          <p>Link 1</p>
          <p>Link 2</p>
          <p>Link 3</p>
          <p>Link 4</p>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", color: "#ffffff" }}
        >
          <p>Link 1</p>
          <p>Link 2</p>
          <p>Link 3</p>
          <p>Link 4</p>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", color: "#ffffff" }}
        >
          <p>Link 1</p>
          <p>Link 2</p>
          <p>Link 3</p>
          <p>Link 4</p>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", color: "#ffffff" }}
        >
          <p>Link 1</p>
          <p>Link 2</p>
          <p>Link 3</p>
          <p>Link 4</p>
        </div>
      </div>
    </div>
  );
}
