import React, { useState, useEffect, useRef } from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import Button from "react-bootstrap/Button";
import { useAppSelector } from "@app/hooks";
import { GetServerSideProps } from "next";
import { getProfile, updateProfilePic } from "@actions/profile";
import { User } from "@typings/profile";
import { Event } from "@typings/event";
import EventItem from "@components/EventItem";
import { css } from "@emotion/css";
import { useSession } from "next-auth/react";
import getBase64 from "@utils/getBase64";
import Circle from "@components/Circle";

interface Props {
  profile: User;
  isSelf: boolean;
}

const Profile = (props: Props) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window !== undefined && window.innerWidth < 800 && !isMobile) {
      setIsMobile(true);
    }
  });
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { username, email, events_bought, events_created, profilePic, name } =
    props.profile;
  const { data: session, status } = useSession();
  const user = session?.user;
  const [isUser, setIsUser] = useState(props.isSelf);
  const [profileImg, setProfileImg] = useState<string | undefined>(undefined);
  const [hover, setHover] = useState(false);
  const handleUpload = () => {
    inputRef.current?.click();
  };
  const handleDisplayFileDetails = async () => {
    const img = await getBase64(inputRef.current?.files?.[0]!);
    const res = await updateProfilePic(user.email, img.split(",")[1]);
    setProfileImg(res.profile_pic);
  };
  const onHover = () => {
    setHover(true);
  };
  const onLeave = () => {
    setHover(false);
  };
  const { isSelf } = props;
  return isMobile ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#181818",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        className={css({ marginTop: 10 })}
      >
        <Circle
          user={{
            ...props.profile,
            name: "",
            profilePic: profileImg || profilePic,
          }}
        />
        {isUser && (
          <div
            className={css({
              display: "flex",
              height: "100%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            })}
          >
            <input
              ref={inputRef}
              className="d-none"
              type="file"
              accept="image/png, image/jpeg"
              onChange={() => {
                handleDisplayFileDetails();
              }}
            />
            <button
              onClick={handleUpload}
              className={css({
                background: "transparent",
                border: "none",
                fontSize: 15,
                color: "#ffffff",
                marginTop: 5,
                textDecoration: "underline",
              })}
            >
              Update Profile Picture
            </button>
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          overflowX: "hidden",
          height: "100%",
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              marginBottom: 0,
              color: "#ffffff",
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            {name}
          </p>
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
              fontSize: "3.5vmax",
            }}
          >
            Upcoming Live Shows
          </p>
        </div>
        <div
          style={{
            alignSelf: "center",
            width: "90%",
            overflow: "auto",
            minHeight: "400px",
          }}
        >
          {events_created.map((event: Event, i: number) => {
            return <EventItem key={i} event={event} />;
          })}
        </div>
        {isSelf && (
          <>
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
                  fontSize: "3.5vmax",
                }}
              >
                Live Shows Bought
              </p>
            </div>
            <div
              style={{
                alignSelf: "center",
                width: "90%",
                overflow: "auto",
                minHeight: "400px",
              }}
            >
              {events_bought.map((event: Event, i: number) => {
                return <EventItem key={i} event={event} />;
              })}
            </div>
          </>
        )}
      </div>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#181818",
        width: "100%",
        height: "calc(100vh - 60px)",
        overflow: "hidden",
      }}
    >
      <div
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        style={{ width: "33.33vw" }}
      >
        <img
          style={{
            opacity: hover ? 0.5 : 1,
            objectFit: "cover",
            height: "calc(100vh - 60px)",
            width: "33.33vw",
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            transition: ".5s ease",
          }}
          src={profileImg || profilePic}
        ></img>
        {isUser && (
          <div
            className={
              hover
                ? css({
                    height: "calc(100vh - 60px)",
                    width: "33.33vw",
                    backgroundColor: "black",
                    position: "absolute",
                    top: 60,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    opacity: hover ? 0.5 : 0,
                    transition: ".5s ease",
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                  })
                : ""
            }
          >
            {
              <div
                className={css({
                  display: "flex",
                  height: "100%",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                })}
              >
                <input
                  ref={inputRef}
                  className="d-none"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={() => {
                    handleDisplayFileDetails();
                  }}
                />
                <button
                  onClick={handleUpload}
                  className={css({
                    background: "transparent",
                    border: "none",
                    fontSize: 20,
                    color: "#ffffff",
                  })}
                >
                  {uploadedFileName
                    ? uploadedFileName
                    : "Update Profile Picture"}
                </button>
              </div>
            }
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flex: 3,
          flexDirection: "column",
          overflow: "auto",
          height: "100%",
        }}
      >
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
              {name}
            </p>
          </div>
          {/* <div
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
          </div> */}
        </div>
        {/* <div style={{ margin: 20, paddingLeft: 10 }}>
          <Button
            style={{
              border: "none",
              backgroundColor: "#d94b58",
              borderRadius: 20,
            }}
          >
            Follow to stay Updated
          </Button>
        </div> */}
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
              fontSize: "3.5vmax",
            }}
          >
            Upcoming Live Shows
          </p>
        </div>
        <div
          style={{
            alignSelf: "center",
            width: "90%",
            overflow: "auto",
            minHeight: "400px",
          }}
        >
          {events_created.map((event: Event, i: number) => {
            return <EventItem key={i} event={event} />;
          })}
        </div>
        {isSelf && (
          <>
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
                  fontSize: "3.5vmax",
                }}
              >
                Live Shows Bought
              </p>
            </div>
            <div
              style={{
                alignSelf: "center",
                width: "90%",
                overflow: "auto",
                minHeight: "400px",
              }}
            >
              {events_bought.map((event: Event, i: number) => {
                return <EventItem key={i} event={event} />;
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async ({
  query,
  params,
}) => {
  let isSelf = query && query.my ? true : false;
  const res = await getProfile(isSelf, params?.id as string);
  return {
    props: {
      profile: res.user,
      isSelf: isSelf,
    },
  };
};
export default Profile;
