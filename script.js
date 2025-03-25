function playClickSound() {
  let audio = new Audio("menu-click-89198.mp3");
  audio.play();
}

document.addEventListener("DOMContentLoaded", function () {

  if (document.getElementById("displayName")) {
    document.getElementById("displayName").innerText =
      (localStorage.getItem("firstName") || "") + " " +
      (localStorage.getItem("middleInitial") || "") + " " +
      (localStorage.getItem("lastName") || "");
    document.getElementById("displayBirthday").innerText =
      localStorage.getItem("birthday") || "";
    document.getElementById("displayBio").innerText =
      localStorage.getItem("bio") || "";
    document.getElementById("displayQuote").innerText =
      localStorage.getItem("favoriteQuote") || "";

    let pic = localStorage.getItem("profilePic");
    if (pic) document.getElementById("displayPic").src = pic;
  }

  loadPosts();
});

function saveProfile() {
  playClickSound();
  localStorage.setItem("firstName", document.getElementById("firstName").value || "");
  localStorage.setItem("middleInitial", document.getElementById("middleInitial").value || "");
  localStorage.setItem("lastName", document.getElementById("lastName").value || "");
  localStorage.setItem("birthday", document.getElementById("birthday").value || "");
  localStorage.setItem("bio", document.getElementById("bio").value || "");
  localStorage.setItem("favoriteQuote", document.getElementById("favoriteQuote").value || "");

  let fileInput = document.getElementById("profilePic");
  if (fileInput && fileInput.files.length > 0) {
    let file = fileInput.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      localStorage.setItem("profilePic", e.target.result);
      window.location.href = "profile.html";
    };
    reader.readAsDataURL(file);
  } else {
    window.location.href = "profile.html";
  }
}

document.body.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    playClickSound();
  }
});

function addPost() {
  playClickSound();
  let postText = document.getElementById("newPost").value.trim();
  if (postText !== "") {
    savePostToLocalStorage(postText);
    renderPost(postText);
    document.getElementById("newPost").value = "";
  }
}

function toggleReaction(element) {
  playClickSound();
  element.classList.toggle("active");
}

function savePostToLocalStorage(postText) {
  let savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
  savedPosts.unshift(postText);
  localStorage.setItem("posts", JSON.stringify(savedPosts));
}

function loadPosts() {
  let savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
  savedPosts.forEach((postText, index) => renderPost(postText, index));
}

function renderPost(postText, index) {
  let posts = document.getElementById("posts");
  let postDiv = document.createElement("div");
  postDiv.classList.add("post");
  postDiv.innerHTML =
    postText +
    ' <span class="heart" onclick="toggleReaction(this)">❤️</span>'+
    ' <button onclick="deletePost(' + index + ')">Delete</button>';
  posts.prepend(postDiv);
}

function deletePost(index) {
  playClickSound();
  let savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
  savedPosts.splice(index, 1);
  localStorage.setItem("posts", JSON.stringify(savedPosts));
  document.getElementById("posts").innerHTML = "";
  loadPosts();
}