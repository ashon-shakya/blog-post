import express from "express";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
} from "../models/postSchema.js";
import { authenticateJWT } from "../middleware/authenticate.js";
import { getUserById } from "../models/userSchema.js";

const router = express.Router();

// get all posts
router.get("/", async (req, res) => {
  try {
    let data = await getPosts();

    let postData = [...data];

    const respObj = {
      status: true,
      message: "All Posts Fetched!",
      data: postData,
    };

    return res.status(200).send(respObj);
  } catch (err) {
    const errObj = {
      status: false,
      message: err.message || "Error fetching post",
    };

    return res.status(500).send(errObj);
  }
});

// create post
router.post("/", authenticateJWT, async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const { user } = req;

    const postData = await createPost({
      title,
      content,
      image,
      author: user._id,
    });

    const respObj = {
      status: true,
      message: "Post Created Successfully!",
    };

    return res.status(201).send(respObj);
  } catch (err) {
    const errObj = {
      status: false,
      message: err.message || "Error creating post",
    };

    return res.status(500).send(errObj);
  }
});

// get post by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const postData = await getPostById(id);

    const respObj = {
      status: true,
      message: "Successfully Fetched Post",
      data: postData,
    };

    return res.status(200).send(respObj);
  } catch (err) {
    const errObj = {
      status: false,
      message: err.message || "Error fetching Post",
    };

    return res.status(500).send(errObj);
  }
});

// delete post
router.delete("/:id", authenticateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const postData = await getPostById(id);

    if (!postData) {
      const errObj = {
        status: false,
        message: "Post not found",
      };

      return res.status(404).send(errObj);
    }

    if (postData.author.toString() !== user._id) {
      const errObj = {
        status: false,
        message: "You are not authorized to delete the Post!",
      };

      return res.status(403).send(errObj);
    }

    await deletePost(id);

    const respObj = {
      status: true,
      message: "Post Deleted Successfully!",
    };

    return res.status(200).send(respObj);
  } catch (err) {
    const errObj = {
      status: false,
      message: err.message || "Error Deleting Post",
    };

    return res.status(500).send(errObj);
  }
});

export default router;
