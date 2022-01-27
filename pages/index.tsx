import { getEvent } from "@actions/event";
import { getProfile } from "@actions/profile";
import Card from "@components/Card";
import Circle from "@components/Circle";
import Footer from "@components/Footer";
import { css } from "@emotion/css";
import { Event } from "@typings/event";
import { User } from "@typings/profile";
import { NextPageContext } from "next";
import Link from "next/link";
import Carousel from "react-bootstrap/Carousel";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const mainStyle = css({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#181818",
  backgroundSize: "cover",
});
interface Props {
  events: Event[];
  artists: User[];
}
function Home(props: Props) {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  var artistSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };
  return (
    <div className={mainStyle}>
      <div style={{ position: "relative" }}>
        <Carousel>
          <Carousel.Item
            style={{
              overflow: "hidden",
              height: "700px",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 50%, transparent 100%)",
            }}
          >
            <img
              className="d-block w-100"
              height="800px"
              src="https://www.live-now.com/image/1920/1080/c627aebb-20d4-4872-b1d3-3e7dfb5d22ec.jpg?v=20210429120129"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item
            style={{
              overflow: "hidden",
              height: "700px",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 50%, transparent 100%)",
            }}
          >
            <img
              className="d-block w-100"
              src="https://www.live-now.com/image/1920/1080/c627aebb-20d4-4872-b1d3-3e7dfb5d22ec.jpg?v=20210429120129"
              alt="Second slide"
              height="800px"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item
            style={{
              overflow: "hidden",
              height: "700px",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 50%, transparent 100%)",
            }}
          >
            <img
              className="d-block w-100"
              src="https://www.live-now.com/image/1920/1080/c627aebb-20d4-4872-b1d3-3e7dfb5d22ec.jpg?v=20210429120129"
              alt="Third slide"
              height="800px"
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
          padding: 20,
        }}
      >
        <div
          className={css({
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          })}
        >
          <h3
            style={{
              marginLeft: 65,
              fontFamily: "Poppins",
              color: "#d94b58",
              fontSize: 40,
            }}
          >
            Live Shows
          </h3>
        </div>
        <div
          style={{ border: "4px solid white", width: 140, marginLeft: 65 }}
        ></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: 25,
            paddingRight: 25,
          }}
        >
          <Slider {...settings}>
            {props.events.map((event: Event, i: number) => {
              return (
                <div key={i} style={{ background: "transparent", padding: 30 }}>
                  <div style={{ padding: 30 }}>
                    <Card event={event} />
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
      <div
        style={{
          width: "92%",
          height: "500px",
          background: "url(/banner1.png)",
          alignSelf: "center",
          marginTop: 40,
        }}
      >
        <div
          style={{
            position: "relative",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            opacity: 0.6,
            padding: 50,
            paddingTop: 100,
          }}
        >
          <p style={{ fontSize: 100, color: "white", lineHeight: 1 }}>
            Bringing the stage <br />
            to your screens
          </p>
          <p style={{ fontSize: 50, color: "#d94b58" }}>
            Grab your front seat now.
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 20,
          marginTop: 40,
        }}
      >
        <h3
          style={{
            marginLeft: 65,
            fontFamily: "Poppins",
            color: "#d94b58",
            fontSize: 40,
          }}
        >
          Artists
        </h3>
        <div
          style={{ border: "4px solid white", width: 100, marginLeft: 65 }}
        ></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: 25,
            paddingRight: 25,
          }}
        >
          <Slider {...artistSettings}>
            {props.artists.map((artist, id) => {
              return (
                <Link href={`/profile/${artist.username}`}>
                  <div
                    key={id}
                    style={{ background: "transparent", padding: 30 }}
                  >
                    <div style={{ padding: 30 }}>
                      <Circle user={artist} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </Slider>
        </div>
      </div>
      {/* <div
          style={{
            display: "flex",
            margin: "10px",
            padding: 20,
            flexDirection: "column",
            alignItems: "center",
            color: "#d94b58",
          }}
        >
          <h1>About Us</h1>
          <div style={{ border: "4px solid white", width: 140 }}></div>
          <div
            style={{
              alignSelf: "flex-start",
              marginTop: 40,
              fontSize: 40,
              fontWeight: 800,
              width: "100%",
            }}
          >
            <div>
              <div
                style={{
                  color: "#ffffff",
                  position: "relative",
                  top: 80,
                  zIndex: 12,
                  left: 90,
                }}
              >
                <p>
                  Lorem ipsum dolor sit amet,
                  <br /> efficitur eleifend. Fusce interdum <br />
                  mollis velit fringilla facilisis.
                  <br /> Lorem ipsum dolor sit amet,
                  <br /> efficitur eleifend. Fusce interdum <br />
                  mollis velit fringilla facilisis.{" "}
                </p>
              </div>
              <div
                style={{ position: "relative", top: -390, textAlign: "right" }}
              >
                <img
                  style={{ borderRadius: 30 }}
                  src="https://images.unsplash.com/photo-1501612780327-45045538702b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y29uY2VydHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                ></img>
              </div>
            </div>
          </div>
        </div> */}
      <Footer />
    </div>
  );
}
Home.getInitialProps = async (ctx: NextPageContext) => {
  const { event } = await getEvent();
  const { user } = await getProfile();
  return {
    events: event,
    artists: user,
  };
};
export default Home;
