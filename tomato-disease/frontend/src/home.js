import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  AppBar, Toolbar, Typography, Avatar, Container, Grid, Button,
  Card, CardContent, CardMedia, CircularProgress, Paper
} from "@material-ui/core";
import { DropzoneArea } from 'material-ui-dropzone';
import Clear from '@material-ui/icons/Clear';
import KULogoColor from "./KU-Logo-Color.png";
import image from "./bg.png";
import { common } from '@material-ui/core/colors';
import axios from "axios";
import { useCallback } from "react";

const ColorButton = withStyles(() => ({
  root: {
    color: "black",
    backgroundColor: common.white,
    '&:hover': {
      backgroundColor: '#ffffff7a',
    },
  },
}))(Button);

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  },
  clearButton: {
    width: "100%",
    borderRadius: "15px",
    padding: "12px",
    color: "#000000a6",
    fontSize: "16px",
    fontWeight: 600,
  },
  mainContainer: {
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: "93vh",
    marginTop: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  gridContainer: {
    width: "80%",
    maxWidth: "1200px",
  },
  imageCard: {
    maxWidth: "100%",
    height: "auto",
    backgroundColor: 'transparent',
    boxShadow: '0px 5px 20px rgb(0 0 0 / 20%)',
    borderRadius: '15px',
    textAlign: "center",
  },
  media: {
    width: "100%",
    maxHeight: "300px",
    objectFit: "contain",
  },
  uploadArea: {
    border: "2px dashed #fff",
    padding: "20px",
    borderRadius: "15px",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  detail: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
    minHeight: "200px",
  },
  descriptionBox: {
    backgroundColor: "#f0f8ff", // Light blue for visual separation
    padding: "15px",
    marginTop: "15px",
    borderRadius: "10px",
    textAlign: "center",
  },
  descriptionText: {
    marginTop: "15px",
    fontSize: "16px",
    color: "#333",
  },
  appbar: {
    background: '#006400',
    boxShadow: 'none',
    color: 'white'
  },
  kuDetails: {
    marginLeft: "10px",
    display: "flex",
    flexDirection: "column",
    color: "white",
  },
  loader: {
    color: '#be6a77 !important',
    marginTop: "15px",
  }
}));

const diseaseDescriptions = {
  "Tomato Bacterial spot": "A bacterial infection causing dark, water-soaked spots on leaves and fruits. Small, circular-to-irregular dark lesions on leaves, often surrounded by a yellow halo.",
  "Tomato Early blight": "A fungal disease causing dark, concentric-ring lesions on older leaves and stems.",
  "Tomato Late blight": "A highly destructive disease that spreads rapidly in wet conditions. Irregularly shaped, water-soaked lesions that enlarge rapidly into pale green to brownish-black blotches. During humid conditions, a white cottony growth may form on the underside of the leaves",
  "Tomato Leaf Mold": "Causes yellow spots on leaves with fuzzy, purple mold underneath.",
  "Tomato Septoria leaf spot": "Produces small, circular spots with gray centers and dark borders.",
  "Tomato Spider mites Two spotted spider mite": "Leads to yellowing and speckled leaves covered with fine webbing.",
  "Tomato Target Spot": "Creates circular, dark brown spots with concentric rings on leaves.",
  "Tomato Tomato YellowLeaf Curl Virus": "Causes yellowing, curling of leaves, and stunted plant growth.",
  "Tomato Tomato mosaic virus": "Creates mottled, yellow-green patterns on leaves, affecting fruit quality.",
  "Tomato healthy": "The tomato plant appears to be in good health with no visible disease."
};

export const ImageUpload = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsloading] = useState(false);

//  const sendFile = async () => {
//    if (!selectedFile) return;
//    let formData = new FormData();
//    formData.append("file", selectedFile);
//    try {
//      let res = await axios.post(process.env.REACT_APP_API_URL, formData);
//      if (res.status === 200) setData(res.data);
//    } catch (error) {
//      console.error("Error:", error);
//      alert("Failed to get prediction. Please try again.");
//    } finally {
//      setIsloading(false);
//    }
//  };

const sendFile = useCallback(async () => {
  if (!selectedFile) return;
  let formData = new FormData();
  formData.append("file", selectedFile);
  try {
//    let res = await axios.post(process.env.REACT_APP_API_URL, formData);
//    let res = await axios.post(`${process.env.REACT_APP_API_URL}/predict`, formData);
    let res = await axios.post('https://tomato-disease-detection-docker-d9ehgeexdfdbdff0.eastasia-01.azurewebsites.net/predict', formData);


//    let res = await axios.post('https://tomato-disease-detection-g6fnbjbwa7edhrc7.eastasia-01.azurewebsites.net/predict', formData);

    if (res.status === 200) setData(res.data);
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to get prediction. Please try again.");
  } finally {
    setIsloading(false);
  }
}, [selectedFile]);

  const clearData = () => {
    setData(null);
    setSelectedFile(null);
    setPreview(null);
  };
//
//  useEffect(() => {
//    if (!selectedFile) return;
//    const objectUrl = URL.createObjectURL(selectedFile);
//    setPreview(objectUrl);
//    setIsloading(true);
//    sendFile();
//  }, [selectedFile]);

useEffect(() => {
  if (!selectedFile) return;
  const objectUrl = URL.createObjectURL(selectedFile);
  setPreview(objectUrl);
  setIsloading(true);
  sendFile();
}, [selectedFile, sendFile]);

  return (
    <>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6" noWrap>Tomato Disease Classification</Typography>
          <div className={classes.grow} />
          <Avatar src={KULogoColor} />
          <div className={classes.kuDetails}>
            <Typography variant="body1">Kathmandu University</Typography>
            <Typography variant="body2">Department of Electrical and Electronics Engineering</Typography>
          </div>
        </Toolbar>
      </AppBar>

      <Container className={classes.mainContainer} maxWidth={false} disableGutters={true}>
        <Grid container className={classes.gridContainer} spacing={4}>

          {/* Left: Upload Section */}
          <Grid item xs={12} md={6}>
            <Card className={classes.imageCard}>
              <CardContent>
                {!preview ? (
                  <DropzoneArea
                    acceptedFiles={['image/*']}
                    dropzoneText={"Drag & Drop an image of a tomato leaf here or click to upload"}
                    onChange={(files) => {
                      if (files.length > 0) setSelectedFile(files[0]);
                    }}
                    className={classes.uploadArea}
                  />
                ) : (
                  <CardMedia className={classes.media} image={preview} component="img" />
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Right: Results Section */}
          <Grid item xs={12} md={6}>
            <Card className={classes.detail}>
              {isLoading ? (
                <>
                  <CircularProgress className={classes.loader} />
                  <Typography variant="h6">Processing...</Typography>
                </>
              ) : data ? (
                <>
                  <Typography variant="h5"><strong>Classified as: </strong> <strong>{data.class}</strong></Typography>
                  <Typography variant="h6">Confidence Level:{(parseFloat(data.confidence) * 100).toFixed(2)}%</Typography>

                  <Paper elevation={3} className={classes.descriptionBox}>
                  <Typography className={classes.descriptionText}>{diseaseDescriptions[data.class]}</Typography>
                  </Paper>
                  <ColorButton className={classes.clearButton} onClick={clearData} startIcon={<Clear />}>Clear</ColorButton>
                </>
              ) : null}
            </Card>
          </Grid>

        </Grid>
      </Container>
    </>
  );
};
