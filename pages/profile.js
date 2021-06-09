import React, { useState, useEffect } from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import Button from "react-bootstrap/Button";
import Event from "../components/event";
const Profile = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#181818",
        width: "100%",
        overflowX: "hidden",
        overflowY: "hidden",
      }}
    >
      <div style={{ display: "flex", flex: 1, width: width / 3 }}>
        <img
          style={{
            objectFit: "cover",
            height: height,
            width: width / 3,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          }}
          src="https://wallpapercave.com/wp/wp3098878.jpg"
        ></img>
      </div>
      <div style={{ display: "flex", flex: 3, flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              padding: 5,
              borderLeft: "7px solid #d94b58",
              paddingLeft: 20,
              margin: 20,
            }}
          >
            <p
              style={{
                marginBottom: 0,
                color: "#ffffff",
                fontSize: 40,
                fontWeight: 800,
              }}
            >
              Ed Sheeran
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: 20,
              padding: 5,
              alignItems: "center",
            }}
          >
            <InstagramIcon
              style={{
                fontSize: 40,
                marginRight: 15,
                color: "#5a5a5a",
              }}
            />
            <FacebookIcon
              style={{
                fontSize: 40,
                marginRight: 15,
                color: "#5a5a5a",
              }}
            />
            <TwitterIcon
              style={{
                fontSize: 40,
                marginRight: 15,
                color: "#5a5a5a",
              }}
            />
          </div>
        </div>
        <div style={{ margin: 20, paddingLeft: 10 }}>
          <Button
            style={{
              border: "none",
              backgroundColor: "#d94b58",
              borderRadius: 20,
            }}
          >
            Follow to stay Updated
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: 20,
            paddingLeft: 20,
            width: "100%",
          }}
        >
          <p
            style={{
              borderBottom: "7px solid #d94b58",
              color: "#ffffff",
              marginBottom: 0,
              fontSize: 40,
            }}
          >
            Upcoming Live Shows
          </p>
        </div>
        <div style={{ alignSelf: "center", width: "90%", overflowY: "scroll" }}>
          {[0, 0, 0, 0, 0, 0, 0].map(() => {
            return <Event />;
          })}
        </div>
      </div>
    </div>
  );
};
export default Profile;

{
  /* <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                margin: 20,
              }}
            >
              <InstagramIcon
                style={{
                  fontSize: 40,
                  margin: 20,
                  marginTop: 0,
                  color: "#5a5a5a",
                }}
              />
              <FacebookIcon
                style={{
                  fontSize: 40,
                  margin: 20,
                  marginTop: 0,
                  color: "#5a5a5a",
                }}
              />
              <TwitterIcon
                style={{
                  fontSize: 40,
                  margin: 20,
                  marginTop: 0,
                  color: "#5a5a5a",
                }}
              />
            </div>
            <div style={{ margin: 20, paddingLeft: 10 }}>
              <Button
                style={{
                  border: "none",
                  backgroundColor: "#d94b58",
                  borderRadius: 20,
                }}
              >
                Follow to stay Updated
              </Button>
            </div>
          </div> */
}
