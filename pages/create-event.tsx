import Navbar from "@components/Navbar";
import { css, cx } from "@emotion/css";
import { makeStyles, TextField } from "@material-ui/core";
import styles from "../styles/Navbar.module.css";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import React from "react";
import ImageUploading, { ImageType } from "react-images-uploading";

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

const CreateEvent = () => {
  const classes = useStyles();
  const [poster, setPoster] = React.useState<ImageType[]>([]);
  const [banner, setBanner] = React.useState<ImageType[]>([]);
  const maxNumber = 69;
  const onChange = (
    imageList: ImageType[],
    state: React.Dispatch<React.SetStateAction<ImageType[]>>,
    addUpdateIndex?: number[]
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
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
    color: "#d94b58",
  });
  return (
    <>
      <div
        style={{
          marginBottom: 60,
          position: "sticky",
          top: 0,
          zIndex: 3,
          backgroundColor: "#050505",
        }}
      >
        <Navbar />
      </div>
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
          })}
        >
          Create Your <span style={{ color: "#d94b58" }}>Live</span> Show
        </div>
        <Formik
          initialValues={{
            title: "",
            description: "",
            date: new Date(),
            time: new Date(),
            price: null,
          }}
          onSubmit={(val) => {
            console.log(val);
          }}
        >
          {({ values, setFieldValue }) => {
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
                          setFieldValue("title", e);
                        }}
                        InputProps={{
                          classes: {
                            underline: classes.underline,
                            root: classes.root,
                          },
                        }}
                      />
                    </div>
                    <div>
                      <div className={smallHeading}>Description</div>
                      <TextField
                        multiline
                        placeholder="Description"
                        onChange={(e) => {
                          setFieldValue("description", e);
                        }}
                        InputProps={{
                          classes: {
                            underline: classes.underline,
                            root: classes.root,
                          },
                        }}
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
                      />
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
                        value={poster}
                        onChange={(e) => {
                          onChange(e, setPoster);
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
                        value={banner}
                        onChange={(e) => {
                          onChange(e, setBanner);
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
                    onClick={() => {}}
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
