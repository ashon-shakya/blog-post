import express from "express";
import {
  createPost,
  deletePostById,
  getPost,
  getPostById,
  searchPost,
} from "../models/postSchema.js";
import { authenticateJwt } from "../middleware/authenticate.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const postData = await getPost();

  const respObj = {
    status: true,
    message: "post fetched",
    data: postData,
  };

  return res.status(200).send(respObj);
});

router.post("/", authenticateJwt, async (req, res) => {
  const { title, content, image } = req.body;
  const { user } = req;

  const postData = await createPost({
    title,
    content,
    image,
    author: user.userid,
  });

  const respObj = {
    status: true,
    message: "Post created",
    data: postData,
  };

  return res.status(200).send(respObj);
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const postData = await getPostById(id);

    const respObj = {
      status: true,
      message: "Post found!",
      data: postData,
    };

    return res.status(200).send(respObj);
  } catch (err) {
    console.log(err);
    const errObj = {
      status: false,
      message: "Error fetching post",
    };

    return res.status(500).send(errObj);
  }
});

router.delete("/:id", authenticateJwt, async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const postData = await getPostById(id);

    if (user.userid === postData.author._id.toString()) {
      await deletePostById(id);
      res.send("DELETE OK");
    } else {
      res.status(500).send("NOT ALLOWED TO DELETE");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("erro deleting");
  }
});

router.get("/search/:searchParam", async (req, res) => {
  const { searchParam } = req.params;

  const data = await searchPost(searchParam);

  return res.send(data);
});

export default router;
