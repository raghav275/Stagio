import { getEvent } from "@actions/event";
import { getProfile } from "@actions/profile";
import Card from "@components/Card";
import Circle from "@components/Circle";
import Footer from "@components/Footer";
import { css } from "@emotion/css";
import { Event, Status } from "@typings/event";
import { User } from "@typings/profile";
import { NextPageContext } from "next";
import Link from "next/link";
import Carousel from "react-bootstrap/Carousel";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { GetServerSideProps } from "next";

const mainStyle = css({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#181818",
  backgroundSize: "cover",
});
interface Props {
  artists: User[];
  new_events: Event[];
  old_events: Event[];
}
function Home(props: Props) {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1028,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  var artistSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1028,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const banner_events = props.new_events.filter((i) => i.banner !== undefined);
  return (
    <div className={mainStyle}>
      <div
        className={css({ width: "100%", height: "auto" })}
        style={{ position: "relative" }}
      >
        <Carousel>
          <Carousel.Item
            className={css({
              cursor: "pointer",

              overflow: "hidden",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 50%, transparent 100%)",
            })}
          >
            <Link href={"/about"}>
              <img
                width="100%"
                height="auto"
                src="https://ik.imagekit.io/stagiotest/banner_slide_g3WKEtyip.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651912129480"
                alt="First slide"
              />
            </Link>
          </Carousel.Item>
          <Carousel.Item
            className={css({
              cursor: "pointer",

              overflow: "hidden",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 50%, transparent 100%)",
            })}
          >
            <Link href={"/about"}>
              <img
                width="100%"
                height="auto"
                src="https://ik.imagekit.io/stagiotest/banner_slide1_plf_rEWRp.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651911413080"
                alt="Second slide"
              />
            </Link>
          </Carousel.Item>
          {banner_events.map((event, i) => {
            return (
              <Carousel.Item
                key={i}
                className={css({
                  cursor: "pointer",

                  overflow: "hidden",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 50%, transparent 100%)",
                })}
              >
                <Link href={`/event-details/${event.id}`}>
                  <img
                    width="100%"
                    height="auto"
                    src={event.banner}
                    alt="Third slide"
                  />
                </Link>
              </Carousel.Item>
            );
          })}
          {/* <Carousel.Item
            style={{
              maxHeight: "700px",
              overflow: "hidden",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 50%, transparent 100%)",
            }}
          >
            <img
              width="100%"
              height="auto"
              src="https://www.live-now.com/image/1920/1080/c627aebb-20d4-4872-b1d3-3e7dfb5d22ec.jpg?v=20210429120129"
              alt="Third slide"
            />
          </Carousel.Item> */}
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
              marginLeft: "4vw",
              fontFamily: "Poppins",
              color: "#d94b58",
              fontSize: "3.5vmax",
            }}
          >
            Live Shows
          </h3>
        </div>
        <div
          style={{
            border: "4px solid white",
            width: "14.5vmax",
            marginLeft: "4vw",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: 25,
            paddingRight: 25,
          }}
        >
          {!props.new_events ||
          (props.new_events && props.new_events.length === 0) ? (
            <div
              className={css({
                color: "#ffffff",
                fontSize: "2.5vmax",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 60,
              })}
            >
              <p>No Upcoming Shows But There's Always Room For One</p>
            </div>
          ) : (
            <Slider {...settings}>
              {props.new_events.map((event: Event, i: number) => {
                return (
                  <div
                    key={i}
                    style={{ background: "transparent", padding: 30 }}
                  >
                    <div style={{ padding: 30 }}>
                      <Card status={Status.NEW} event={event} />
                    </div>
                  </div>
                );
              })}
            </Slider>
          )}
        </div>
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
              marginLeft: "4vw",
              fontFamily: "Poppins",
              color: "#d94b58",
              fontSize: "3.5vmax",
            }}
          >
            Past Shows
          </h3>
        </div>
        <div
          style={{
            border: "4px solid white",
            width: "14.5vmax",
            marginLeft: "4vw",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: 25,
            paddingRight: 25,
          }}
        >
          {!props.old_events ||
          (props.old_events && props.old_events.length === 0) ? (
            <div
              className={css({
                color: "#ffffff",
                fontSize: "2.5vmax",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 60,
              })}
            >
              <p>No Past Shows</p>
            </div>
          ) : (
            <Slider {...settings}>
              {props.old_events.map((event: Event, i: number) => {
                return (
                  <div
                    key={i}
                    style={{ background: "transparent", padding: 30 }}
                  >
                    <div style={{ padding: 30 }}>
                      <Card status={Status.OLD} event={event} />
                    </div>
                  </div>
                );
              })}
            </Slider>
          )}
        </div>
      </div>
      <div
        style={{
          width: "92%",
          height: "auto",
          background:
            "url(https://ik.imagekit.io/stagiotest/banner1_Wn7J5Dp4j.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651911413138)",
          backgroundSize: "100% auto",
          backgroundRepeat: "no-repeat",
          alignSelf: "center",
          marginTop: 40,
          overflow: "hidden",
          display: "flex",
        }}
      >
        <div
          style={{
            backgroundColor: "black",
            backgroundSize: "100% auto",
            opacity: 0.6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            className={css({
              padding: 40,
              textAlign: "left",
            })}
          >
            <p
              style={{
                fontSize: "7vw",
                color: "white",
                lineHeight: 1,
                marginBottom: 0,
              }}
            >
              Bringing the stage <br />
              to your screens
            </p>
            <p style={{ fontSize: "4vw", color: "#d94b58", marginBottom: 0 }}>
              Grab your front seat now.
            </p>
          </div>
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
            marginLeft: "4vw",
            fontFamily: "Poppins",
            color: "#d94b58",
            fontSize: "3.5vmax",
          }}
        >
          Artists
        </h3>
        <div
          style={{
            border: "4px solid white",
            width: "8.5vmax",
            marginLeft: "4vw",
          }}
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
                <Link key={id} href={`/profile/${artist.username}`}>
                  <div
                    key={id}
                    style={{
                      background: "transparent",
                      padding: 30,
                    }}
                  >
                    <div style={{ padding: 30, cursor: "pointer" }}>
                      <Circle user={artist} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </Slider>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  const { new_events, old_events } = await getEvent();
  const { user } = await getProfile(false);
  return {
    props: {
      artists: user,
      new_events,
      old_events,
    },
  };
};
export default Home;
