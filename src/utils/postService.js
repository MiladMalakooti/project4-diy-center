import tokenService from "./tokenService";
import userService from "./userService";
const BASE_URL = "/api/posts/";

export default {
  create_post,
  index,
  userIndex,
  addLike,
  addComment,
  removeComment,
  deletePost,
  updatePost,
};

function create_post(post) {
  return fetch(BASE_URL + "create-post", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(post)
  }).then(res => {
    if (res.ok) return res.json();
    throw new Error("Bad Cridentials");
  });
}

function index() {
  if (userService.getUser()) {
    const options = {
      method: "GET",
      headers: { Authorization: "Holder " + tokenService.getToken() }
    };
    return fetch(BASE_URL, options).then(res => res.json());
  }
}

function userIndex() {
  if (userService.getUser()) {
    const username = userService.getUser();
    return fetch(BASE_URL + username.user_name, {
      method: "GET",
      headers: { Authorization: "Holder " + tokenService.getToken() }
    }).then(res => res.json());
  }
}

function addLike(postId) {
  const options = {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(postId)
  };
  return fetch(BASE_URL + "likebtn", options).then(res => res.json());
}

function addComment(postId) {
  const options = {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(postId)
  };
  return fetch(BASE_URL + "createcomment", options).then(res => res.json());
}

function removeComment(post) {
  const options = {
    method: "POST",
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(post)
  };
  return fetch(BASE_URL + 'deletecomment', options).then(res => res.json());
}

function deletePost(post) {
  const options = {
    method: "POST",
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(post)
  }
  return fetch(BASE_URL + 'deletepost', options).then(res=>res.json())
}

function updatePost(post) {
  const options = {
    method: "POST",
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(post)
  }
  return fetch(BASE_URL + 'updatepost', options).then(res => res.json);
}