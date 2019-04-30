import fetch from "isomorphic-fetch";

const fromJsonToNode = post => {
  const container = document.querySelector("#blog");
  const blogPost = document.createElement("div");
  blogPost.setAttribute("class", "col-sm col-md-6 blog__container");

  const blogTitle = document.createElement("h3");
  blogTitle.setAttribute("class", "blog__title");
  blogTitle.textContent = post.title;
  blogPost.appendChild(blogTitle);

  const blogDate = document.createElement("p");
  blogDate.setAttribute("class", "blog__date");
  blogDate.textContent = "Published: " + new Date(post.publication_date);
  blogPost.appendChild(blogDate);

  const readMore = document.createElement("button");
  readMore.setAttribute("class", "blog__read");
  readMore.textContent = "Read";
  blogPost.appendChild(readMore);

  const picture = document.createElement("div");
  picture.setAttribute("class", "col-md-6 blog__picture");

  const image = document.createElement("img");
  image.setAttribute("class", "blog__image");
  image.setAttribute("src", post.background_image);

  container.appendChild(blogPost);
  picture.appendChild(image);
  container.appendChild(picture);
};

export const init = async () => {
  const res = await fetch("http://localhost:8000/api/blog.json");
  const data = res.json();

  data.blog_posts.map(fromJsonToNode);
};
