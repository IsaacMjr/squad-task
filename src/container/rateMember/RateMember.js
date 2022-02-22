import React, { useState } from "react";
import "./RateMember.css";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../squad-config";

// material-ui components
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import Textarea from "@material-ui/core/TextareaAutosize";
import Rating from "@material-ui/lab/Rating";
import Button from "@material-ui/core/Button";

// initialize material styles
const useStyles = makeStyles({
  backdrop: {
    backgroundColor: "rgba(58, 164, 164, 0.3)",
    zIndex: "1",
  },
});

function RateMember({ user }) {
  const classes = useStyles();
  const params = useParams();
  //   console.log(member);
  const [openBackdrop, setOpenBackdrop] = useState(true);
  const [reviewComment, setReviewComment] = useState("");
  const [rate, setRate] = useState(0);

  // handle submit review and redirect to previous page
  const navigate = useNavigate();
  const submitReview = () => {
    db.collection("groups")
      .doc(params.groupId)
      .collection("reviews")
      .add({
        reviewer: user.displayName.toLower(),
        reviewMessage: reviewComment,
        reviewedPerson: params.memberId.toLower(),
        reviewRating: rate,
      })
      .then(() => {
        setRate(0);
        setReviewComment("");
        alert("review has been sent");
      })
      .then(() => {
        navigate(`/groupRoom/${params.groupId}`);
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <Backdrop open={openBackdrop} className={classes.backdrop}>
      <div className="rate">
        <h2> {params.memberId}&nbsp; review</h2>
        <p> what do u think about this group member</p>
        <div className="rate-textarea">
          <Textarea
            minRows={5}
            style={{ width: "30vw" }}
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
          />
        </div>
        <div className="rate-stars">
          <p> leave a rating for the participant</p>
          <Rating
            value={rate}
            onChange={(event, newRate) => {
              setRate(newRate);
            }}
          />
        </div>
        <div className="rate-submit">
          <Button variant="contained" color="secondary" onClick={submitReview}>
            submit
          </Button>
        </div>
      </div>
    </Backdrop>
  );
}

export default RateMember;
