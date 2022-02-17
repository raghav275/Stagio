import { createEvent } from "@actions/event";
import { useAppSelector } from "@app/hooks";
import { css, cx } from "@emotion/css";
import { makeStyles, TextField } from "@material-ui/core";
import { Formik, FormikValues } from "formik";
import { useSession } from "next-auth/react";
import React from "react";
import Button from "react-bootstrap/Button";
import ImageUploading, { ImageType } from "react-images-uploading";
import { toast } from "react-toastify";
import styles from "../styles/Navbar.module.css";

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
    fontSize: 40,
  },
});
const errorStyle = css({
  fontSize: 14,
  color: "#ff3333",
});
const CreateEvent = () => {
  const userState = useAppSelector((state) => state.user);
  // console.log(userState);
  const classes = useStyles();
  const [formSubmittedOnce, setFormSubmittedOnce] =
    React.useState<boolean>(false);
  // const [poster, setPoster] = React.useState<ImageType[]>([]);
  // const [banner, setBanner] = React.useState<ImageType[]>([]);
  const maxNumber = 69;
  const onChange = (
    imageList: ImageType[],
    state: React.Dispatch<React.SetStateAction<ImageType[]>>,
    addUpdateIndex?: number[]
  ) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    state(imageList);
  };
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
    color: "#d94b58",
  });
  const { data: session, status } = useSession();
  const submitEvent = async (val: FormikValues) => {
    const { title, description, date, time, price, poster, banner } = val;
    let posterBase64 = poster[0] && poster[0].data_url.split(",")[1];
    let bannerBase64 = banner[0] && banner[0].data_url.split(",")[1];
    try {
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
    } catch (e) {
      const err = e?.response?.data?.message;
      if (e?.response?.status === 401) {
        toast.dark("Please Login First");
      }
      toast.dark(err);
    }
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
    if (price < 0) {
      errors.price = "Select a positive number";
    }
    if (!time) {
      errors.time = "Select Time";
    }
    if (!poster) {
      errors.poster = "Upload Poster Image";
    }
    return errors;
  };
  return (
    <>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
        })}
      >
        <div
          className={css({
            fontSize: 40,
            alignSelf: "center",
            fontWeight: 500,
            color: "#ffffff",
            marginTop: 20,
          })}
        >
          Create Your <span style={{ color: "#d94b58" }}>Live</span> Show
        </div>
        <Formik
          initialValues={{
            title: "",
            description: "",
            date: undefined,
            time: undefined,
            price: 0,
            poster: [],
            banner: [],
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
                    }}
                  >
                    <div>
                      <div className={smallHeading}>Title</div>
                      <TextField
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
                    </div>
                    <div>
                      <div className={smallHeading}>Description</div>
                      <TextField
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
                    </div>
                    <div>
                      <div className={smallHeading}>Price</div>
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
                        }}
                        error={!!errors.price}
                      />
                    </div>
                    <div>
                      <div className={smallHeading}>Date</div>
                      <TextField
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
                    </div>
                    <div>
                      <div className={smallHeading}>Time</div>
                      <TextField
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
                      <div className={smallHeading}>Upload Poster Image</div>
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
                    variant="outline-primary"
                  >
                    Create
                  </Button>
                </div>
              </div>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default CreateEvent;
