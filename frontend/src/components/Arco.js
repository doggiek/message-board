import React from "react";
import { Comment, Avatar } from "@arco-design/web-react";
import {
  IconHeartFill,
  IconMessage,
  IconStarFill,
  IconHeart,
  IconStar,
} from "@arco-design/web-react/icon";
import "@arco-design/web-react/dist/css/arco.css";
import "./arco.css";

const Arco = () => {
  const [like, setLike] = React.useState(true);
  const [star, setStar] = React.useState(true);
  const actions = [
    <button
      className="custom-comment-action"
      key="heart"
      onClick={() => setLike(!like)}
    >
      {like ? <IconHeartFill style={{ color: "#f53f3f" }} /> : <IconHeart />}
      {83 + (like ? 1 : 0)}
    </button>,
    <button
      className="custom-comment-action"
      key="star"
      onClick={() => setStar(!star)}
    >
      {star ? <IconStarFill style={{ color: "#ffb400" }} /> : <IconStar />}
      {3 + (star ? 1 : 0)}
    </button>,
    <button className="custom-comment-action" key="reply">
      <IconMessage /> Reply
    </button>,
  ];
  return (
    <div style={{ width: "80%", padding: "20px" }}>
      <Comment
        // actions={actions}
        align="right"
        author="Balzac"
        avatar={
          <Avatar>
            <img
              alt="avatar"
              src="https://ui-avatars.com/api/name=Riya&background=random"
            />
          </Avatar>
        }
        content={
          <div>
            A design is a plan or specification for the construction of an
            object or system or for the implementation of an activity or
            process, or the result of that plan or specification in the form of
            a prototype, product or process.
          </div>
        }
        datetime="1 hour"
      />
    </div>
  );
};

export default Arco;
