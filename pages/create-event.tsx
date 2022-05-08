import { createEvent, getEvent } from "@actions/event";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { loading } from "slices/loadingSlice";
import { css, cx } from "@emotion/css";
import { makeStyles, TextField } from "@material-ui/core";
import { Event } from "@typings/event";
import format from "date-fns/format";
import { Formik, FormikValues } from "formik";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import router from "next/router";
import Router from "next/router";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import ImageUploading, { ImageType } from "react-images-uploading";
import { toast } from "react-toastify";
import styles from "../styles/Navbar.module.css";
import Spinner from "react-bootstrap/Spinner";

const useStyles = makeStyles({
  underline: {
    "&:before": {
      borderBottomWidth: "0px",
    },
    "&:after": {
      borderBottom: "2px solid #d94b58",
    },
  },
  root: {
    color: "#ffffff",
    fontSize: "3.5vmax",
  },
});
const errorStyle = css({
  fontSize: 14,
  color: "#ff3333",
});
interface Props {
  event: Event;
  id: string;
}
const CreateEvent = (props: Props) => {
  const [eventState, setEventState] = useState(props.event);
  useEffect(() => {
    setEventState(props.event || {});
  }, [props]);

  const [loadingState, setLoadingState] = useState(false);
  const classes = useStyles();
  const [formSubmittedOnce, setFormSubmittedOnce] =
    React.useState<boolean>(false);
  const maxNumber = 69;

  const buttonStyle = {
    borderRadius: "50px",
    fontFamily: "Poppins-Medium",
    border: "1px solid #d94b58",
    color: "#ffffff",
    fontSize: 14,
  };
  const uploadStyle = css({
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  });
  const smallHeading = css({
    marginTop: 20,
    color: "#DE636F",
  });
  const { data: session, status } = useSession();
  const [url, setUrl] = useState<string>();
  const submitEvent = async (val: FormikValues) => {
    const { title, description, date, time, price, poster, banner } = val;
    let posterBase64 =
      poster[0] &&
      (poster[0].data_url.includes(",")
        ? poster[0].data_url.split(",")[1]
        : poster[0].data_url);
    let bannerBase64 =
      banner[0] &&
      (banner[0]?.data_url?.includes(",")
        ? banner[0]?.data_url?.split(",")[1]
        : banner[0]?.data_url);
    try {
      setLoadingState(true);
      const res = await createEvent(
        title,
        description,
        date,
        time,
        price,
        session?.user.email,
        posterBase64,
        bannerBase64
      );
      toast.dark("Event created successfully");
      setTimeout(() => router.push(`/event-details/${res.event.id}`), 500);
    } catch (e) {
      const err = e?.response?.data?.message;
      if (e?.response?.status === 401) {
        toast.dark("Please Login First");
      }
      toast.dark(err);
    }
    setLoadingState(false);
  };
  interface ErrorForm {
    title?: string;
    description?: string;
    price?: string;
    date?: string;
    time?: string;
    poster?: string;
  }
  const validateForm = (val: FormikValues) => {
    let errors: ErrorForm = {};
    const { title, description, date, time, price, poster } = val;
    if (title.length === 0) {
      errors.title = "Enter title";
    }
    if (description.length === 0) {
      errors.description = "Enter description";
    }
    if (!date) {
      errors.date = "Select Date";
    }
    console.log(price);
    if (!price || price < 0) {
      errors.price = "Select a positive number";
    }
    if (!time) {
      errors.time = "Select Time";
    }
    if (!poster || !poster[0].data_url) {
      errors.poster = "Please Upload Poster Image";
    }
    return errors;
  };
  const { title, description, price, date, time, id, poster, banner } =
    eventState || {};
  const key = date ? "1" : "2";
  return (
    <>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          width: "100%",
        })}
      >
        <div
          className={css({
            fontSize: "3.5vmax",
            alignSelf: "center",
            fontWeight: 500,
            color: "#ffffff",
            marginTop: 20,
          })}
        >
          Create Your <span style={{ color: "#d94b58" }}>Live</span> Show
        </div>
        <div>
          <Formik
            enableReinitialize
            initialValues={{
              title: title || "",
              description: description || "",
              date: (date && date.split("T")[0]) || undefined,
              time: props.id ? time : null,
              price: price || 0,
              poster: [{ data_url: poster }] || [],
              banner: [{ data_url: banner }] || [],
            }}
            onSubmit={submitEvent}
            validateOnChange={formSubmittedOnce}
            validate={validateForm}
          >
            {({ values, setFieldValue, submitForm, errors }) => {
              return (
                <div
                  className={cx(
                    uploadStyle,
                    css({ height: "100%", justifyContent: "space-around" })
                  )}
                >
                  <div
                    className={css({
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 40,
                      justifyContent: "space-around",
                      flexWrap: "wrap",
                      width: "100%",
                      height: "100%",
                    })}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        justifyContent: "space-around",
                        padding: "0px 20px",
                      }}
                    >
                      <div>
                        <div className={smallHeading}>Title*</div>
                        <TextField
                          value={values.title}
                          placeholder="Title"
                          onChange={(e) => {
                            setFieldValue("title", e.target.value);
                          }}
                          InputProps={{
                            classes: {
                              underline: classes.underline,
                              root: classes.root,
                            },
                          }}
                          error={!!errors.title}
                        />
                        {errors.title && (
                          <div className={errorStyle}>{errors.title}</div>
                        )}
                      </div>
                      <div>
                        <div className={smallHeading}>Description*</div>
                        <TextField
                          value={values.description}
                          multiline
                          placeholder="Description"
                          onChange={(e) => {
                            setFieldValue("description", e.target.value);
                          }}
                          InputProps={{
                            classes: {
                              underline: classes.underline,
                              root: classes.root,
                            },
                          }}
                          error={!!errors.description}
                        />
                        {errors.description && (
                          <div className={errorStyle}>{errors.description}</div>
                        )}
                      </div>
                      <div>
                        <div className={smallHeading}>Price*</div>
                        <TextField
                          type="number"
                          value={values.price}
                          placeholder="Price"
                          onChange={(e) => {
                            setFieldValue("price", e.target.value);
                          }}
                          InputProps={{
                            classes: {
                              underline: classes.underline,
                              root: classes.root,
                            },
                            inputProps: { min: 0 },
                          }}
                          error={!!errors.price}
                        />
                        {errors.price && (
                          <div className={errorStyle}>{errors.price}</div>
                        )}
                      </div>
                      <div>
                        <div className={smallHeading}>Date*</div>
                        <TextField
                          key={values.poster?.[0]?.data_url}
                          type="date"
                          value={values.date}
                          placeholder="Date"
                          onChange={(e) => {
                            setFieldValue("date", e.target.value);
                          }}
                          InputProps={{
                            classes: {
                              underline: classes.underline,
                              root: classes.root,
                            },
                          }}
                          error={!!errors.date}
                        />
                        {errors.date && (
                          <div className={errorStyle}>{errors.date}</div>
                        )}
                      </div>
                      <div>
                        <div className={smallHeading}>Time*</div>
                        <TextField
                          key={values.poster?.[0]?.data_url}
                          type="time"
                          value={values.time}
                          placeholder="Time"
                          onChange={(e) => {
                            setFieldValue("time", e.target.value);
                          }}
                          InputProps={{
                            classes: {
                              underline: classes.underline,
                              root: classes.root,
                            },
                          }}
                          error={!!errors.time}
                        />
                        {errors.time && (
                          <div className={errorStyle}>{errors.time}</div>
                        )}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        marginTop: 40,
                      }}
                    >
                      <div className={uploadStyle}>
                        <div className={smallHeading}>Upload Poster Image*</div>
                        <ImageUploading
                          value={values.poster}
                          onChange={(e) => {
                            setFieldValue("poster", e);
                          }}
                          maxNumber={maxNumber}
                          dataURLKey="data_url"
                        >
                          {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                          }) => (
                            // write your building UI
                            <div>
                              <div
                                className={cx(
                                  uploadStyle,
                                  css({ margin: "50px 0px" })
                                )}
                              >
                                {imageList.map((image, index) => (
                                  <div key={index}>
                                    <img
                                      src={image["data_url"]}
                                      alt=""
                                      width="100"
                                    />
                                  </div>
                                ))}
                              </div>
                              <div>
                                <Button
                                  className={styles.sign}
                                  style={buttonStyle}
                                  onClick={onImageUpload}
                                  {...dragProps}
                                  variant="outline-primary"
                                >
                                  Click or Drop here
                                </Button>
                                &nbsp;
                                <Button
                                  className={styles.sign}
                                  style={buttonStyle}
                                  onClick={onImageRemoveAll}
                                  variant="outline-primary"
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          )}
                        </ImageUploading>
                      </div>
                      {errors.poster && (
                        <div
                          className={cx(
                            errorStyle,
                            css({ textAlign: "center" })
                          )}
                        >
                          {errors.poster}
                        </div>
                      )}
                      <div className={cx(uploadStyle, css({ marginTop: 50 }))}>
                        <div className={smallHeading}>Upload Banner Image</div>
                        <ImageUploading
                          value={values.banner}
                          onChange={(e) => {
                            setFieldValue("banner", e);
                          }}
                          maxNumber={maxNumber}
                          dataURLKey="data_url"
                        >
                          {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                          }) => (
                            // write your building UI
                            <div>
                              <div
                                className={cx(
                                  uploadStyle,
                                  css({ margin: "50px 0px" })
                                )}
                              >
                                {imageList.map((image, index) => (
                                  <div key={index}>
                                    <img
                                      src={image["data_url"]}
                                      alt=""
                                      width="100"
                                    />
                                  </div>
                                ))}
                              </div>
                              <div>
                                <Button
                                  className={styles.sign}
                                  style={buttonStyle}
                                  onClick={onImageUpload}
                                  {...dragProps}
                                  variant="outline-primary"
                                >
                                  Click or Drop here
                                </Button>
                                &nbsp;
                                <Button
                                  className={styles.sign}
                                  style={buttonStyle}
                                  onClick={onImageRemoveAll}
                                  variant="outline-primary"
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          )}
                        </ImageUploading>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button
                      className={styles.sign}
                      style={{
                        borderRadius: "50px",
                        borderWidth: 2,
                        fontFamily: "Poppins-Medium",
                        borderColor: "#d94b58",
                        color: "#ffffff",
                        margin: "50px 0px",
                        fontSize: 14,
                      }}
                      onClick={() => {
                        setFormSubmittedOnce(true);
                        submitForm();
                      }}
                      disabled={loadingState}
                      variant="outline-primary"
                    >
                      Create{" "}
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
                  </div>
                </div>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (query.id) {
    let id = query.id;
    let res = await getEvent(id as string);
    return {
      props: {
        event: res.event,
        id: id,
      },
    };
  } else {
    return {
      props: {
        event: null,
        id: null,
      },
    };
  }
};
export default CreateEvent;
