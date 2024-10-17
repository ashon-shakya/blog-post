import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const PostCard = ({ post }) => {
  return (
    <>
      <Card className="post">
        <Card.Img
          variant="top"
          src={post.image}
          style={{ maxHeight: "300px", width: "100%", objectFit: "cover" }}
        />
        <Card.Body className="text-start">
          <Card.Title className="d-flex justify-content-between ">
            <Link
              to="/article"
              className="post"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {post.title}
            </Link>

            {post.owner ? (
              <FontAwesomeIcon
                icon={faTrash}
                size="sm"
                style={{ cursor: "pointer", color: "black" }}
                title="Delete Article"
                onClick={() => alert("Delete this article?")} // Example action
              />
            ) : (
              ""
            )}
          </Card.Title>
          <hr />
          <Card.Text>{post.content}</Card.Text>
          <strong className="author-info">- {post.author.username}</strong>
        </Card.Body>
      </Card>
    </>
  );
};

export default PostCard;
