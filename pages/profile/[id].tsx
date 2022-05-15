import React, { useState, useEffect, useRef } from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import EditIcon from "@material-ui/icons/Edit";
import Button from "react-bootstrap/Button";
import { useAppSelector } from "@app/hooks";
import { GetServerSideProps } from "next";
import {
  getProfile,
  updateDescription,
  updateProfilePic,
} from "@actions/profile";
import { User } from "@typings/profile";
import { Event } from "@typings/event";
import EventItem from "@components/EventItem";
import { css } from "@emotion/css";
import { useSession } from "next-auth/react";
import getBase64 from "@utils/getBase64";
import Circle from "@components/Circle";
import Modal from "react-bootstrap/Modal";
import { Input } from "@material-ui/core";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

interface Props {
  profile: User;
  isSelf: boolean;
  cookies: string;
}

const Profile = (props: Props) => {
  const { cookies } = props;
  console.log(cookies);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window !== undefined && window.innerWidth < 800 && !isMobile) {
      setIsMobile(true);
    }
  });
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    username,
    email,
    events_bought,
    events_created,
    profilePic,
    name,
    description,
  } = props.profile;
  const { data: session, status } = useSession();
  const user = session?.user;
  const [isUser, setIsUser] = useState(props.isSelf);
  const [profileImg, setProfileImg] = useState<string | undefined>(undefined);
  const [hover, setHover] = useState(false);
  const [newDescription, setNewDescription] = useState(description);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const handleUpload = () => {
    inputRef.current?.click();
  };
  const handleDisplayFileDetails = async () => {
    try {
      const img = await getBase64(inputRef.current?.files?.[0]!);
      const res = await updateProfilePic(
        user.email,
        img.split(",")[1],
        cookies
      );
      toast.promise(updateProfilePic(user.email, img.split(",")[1], cookies), {
        pending: "Uploading Profile Picture",
        success: "Uploaded Profile Picture Successfully",
        error: "Error Uploading",
      });
      setProfileImg(res.profile_pic);
    } catch (e) {
      const err = e?.response?.data?.message;
      toast.dark(err);
    }
  };
  const onHover = () => {
    setHover(true);
  };
  const onLeave = () => {
    setHover(false);
  };
  const { isSelf } = props;
  const updateDescriptionFunc = async (description: string) => {
    try {
      setLoadingState(true);
      const res = await updateDescription(email, description, cookies);
      toast.dark("Description Updated Successfully");
      setLoadingState(false);
    } catch (e) {
      const err = e?.response?.data?.message;
      toast.dark(err);
    }
  };
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
          className={css({
            paddingLeft: 20,
            fontSize: 20,
            color: "#ffffff",
            marginTop: 10,
          })}
        >
          <p className={css({ margin: 0 })}>
            {newDescription.length === 0
              ? isUser
                ? "Tell Us About Yourself"
                : ""
              : newDescription}
            &nbsp;{" "}
            {isUser && (
              <EditIcon
                className={css({
                  fontSize: 20,
                  cursor: "pointer",
                  textDecoration: "underline",
                  "&:hover": {
                    color: "#d94b58",
                  },
                })}
                onClick={() => {
                  setModalOpen(true);
                }}
              />
            )}
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
      <Modal
        show={isModalOpen}
        onHide={() => setModalOpen(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        contentClassName={css({
          backgroundColor: "#ffffff",
          borderRadius: 20,
        })}
      >
        <Modal.Header closeButton style={{ border: "none", color: "#d94b58" }}>
          <Modal.Title
            style={{ color: "#000000", marginLeft: 10 }}
            id="contained-modal-title-vcenter"
          >
            Edit Description
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Input
              className={css({
                width: "100%",
              })}
              placeholder="Tell Us About Yourself"
              multiline
              value={newDescription}
              onChange={(e) => {
                setNewDescription(e.target.value);
              }}
            ></Input>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center", border: "none" }}>
          <div style={{ marginLeft: 10 }}>
            <p
              style={{
                color: "#000000",
                cursor: "pointer",
                marginTop: 15,
                paddingLeft: 10,
                fontSize: 15,
              }}
              onClick={() => {
                setNewDescription(description.length === 0 ? "" : description);
                setModalOpen(false);
              }}
            >
              Cancel
            </p>
          </div>
          <Button
            style={{
              border: "none",
              backgroundColor: "#d94b58",
              borderRadius: 20,
            }}
            onClick={() => updateDescriptionFunc(newDescription)}
          >
            Proceed
            {loadingState && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </Button>
        </Modal.Footer>
      </Modal>
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
          overflowY: "auto",
          overflowX: "hidden",
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
          className={css({
            paddingLeft: 20,
            fontSize: 25,
            color: "#ffffff",
          })}
        >
          <p className={css({ margin: 0 })}>
            {newDescription.length === 0
              ? isUser
                ? "Tell Us About Yourself"
                : ""
              : newDescription}
            &nbsp;{" "}
            {isUser && (
              <EditIcon
                className={css({
                  cursor: "pointer",
                  textDecoration: "underline",
                  "&:hover": {
                    color: "#d94b58",
                  },
                })}
                onClick={() => {
                  setModalOpen(true);
                }}
              />
            )}
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
      <Modal
        show={isModalOpen}
        onHide={() => setModalOpen(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        contentClassName={css({
          backgroundColor: "#ffffff",
          borderRadius: 20,
        })}
      >
        <Modal.Header closeButton style={{ border: "none", color: "#d94b58" }}>
          <Modal.Title
            style={{ color: "#000000", marginLeft: 10 }}
            id="contained-modal-title-vcenter"
          >
            Edit Description
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Input
              className={css({
                width: "100%",
              })}
              placeholder="Tell Us About Yourself"
              multiline
              value={newDescription}
              onChange={(e) => {
                setNewDescription(e.target.value);
              }}
            ></Input>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center", border: "none" }}>
          <div style={{ marginLeft: 10 }}>
            <p
              style={{
                color: "#000000",
                cursor: "pointer",
                marginTop: 15,
                paddingLeft: 10,
                fontSize: 15,
              }}
              onClick={() => {
                setNewDescription(description.length === 0 ? "" : description);
                setModalOpen(false);
              }}
            >
              Cancel
            </p>
          </div>
          <Button
            style={{
              border: "none",
              backgroundColor: "#d94b58",
              borderRadius: 20,
            }}
            onClick={() => updateDescriptionFunc(newDescription)}
          >
            Proceed
            {loadingState && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async ({
  query,
  params,
  req,
}) => {
  let isSelf = query && query.my ? true : false;
  const cookies = req.headers.cookie;
  const res = await getProfile(isSelf, params?.id as string, cookies);
  return {
    props: {
      profile: res.user,
      isSelf: isSelf,
      cookies: cookies,
    },
  };
};
export default Profile;
