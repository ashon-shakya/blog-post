import axios from "axios";
const rootAPI = import.meta.env.VITE_API_URL;
const postEP = rootAPI + "/post";
const authEP = rootAPI + "/auth";
const userEP = rootAPI + "/user";

export const userLogin = async (loginInfo) => {
  try {
    const { data } = await axios.post(`${authEP}/login`, loginInfo);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const fetchPosts = async () => {
  try {
    const { data } = await axios.get(postEP);
    const tempData = data.data.map((i) => {
      return {
        _id: i._id,
        title: i.title,
        content: i.content,
        image: i.image,
        author: i.author.username,
      };
    });
    return tempData;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const fetchPost = async (postId) => {
  try {
    const {
      data: { data },
    } = await axios.get(`${postEP}/${postId}`);
    const tempData = {
      _id: data._id,
      title: data.title,
      content: data.content,
      author: data.author.username,
      image: data.image,
    };
    return tempData;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};
