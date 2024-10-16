import React, { useEffect, useState } from "react";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { Col, Container, Row, Image } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { fetchPost } from "../utils/axiosHelper";

const PostPage = () => {
  // Sample data for the article
  const [post, setPost] = useState({
    title: "",
    content: ``,
    author: "",
    date: "",
    imageUrl: "/blog1.jpg", // Placeholder image
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pid = queryParams.get("id");

  const getPost = async (postid) => {
    const postData = await fetchPost(postid);
    setPost(postData);
  };

  useEffect(() => {
    getPost(pid);
  }, []);

  return (
    <>
      <Header />
      <Container className="mt-5">
        {/* Article Image with height restriction */}
        <Row>
          <Col>
            <Image
              src={post.imageUrl}
              alt="Article"
              fluid
              className="mb-4 rounded"
              style={{ maxHeight: "300px", width: "100%", objectFit: "cover" }}
            />
          </Col>
        </Row>

        {/* Title, Content, and Author Section */}
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h1 className="mb-3">{post.title}</h1>
            <hr />
            <p>{post.content}</p>
            <div className="author-info mt-4">
              <p>
                <strong>Written by:</strong> {post.author}
              </p>
              <p>
                <small>{post.date}</small>
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default PostPage;
