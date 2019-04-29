window.addEventListener("load", function() {
  const fetch = require("isomorphic-fetch");

  // promise: then (theneable)
  // catch method
  // Promise Stages:
  // 1. Pending (in process)
  // 2. Resolved (success)
  // 3. Rejected (error)
  // 4. Settled (done = success | error)
  fetch("http://localhost:8000/api/blog.json")
    .then(function(res) {
      //   if (res.status === 500) {
      //     return Promise.reject(new Error("INTERNAL_SERVER_ERROR"));
      //   }

      //   if (res.status === 400) {
      //     return Promise.reject(new Error("UNAUTHORIZED"));
      //   }
      return res.json();
    })
    .then(function(data) {
      data.blog_posts.map(function(post) {
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

        console.log("blogPost:", blogPost);
        console.log("container:", container);
      });
    })
    .catch(function(err) {
      //   console.log("err: ", err);
      //   // error strategy
      //   switch (err.message) {
      //     case "INTERNAL_SERVER_ERROR":
      //       return; // some error handling
      //   }
    });
});

// // CPS - Continuation Passing Style
// function multiplier(factor1, factor2, cb) {
//   cb(factor1 * factor2);
// }

// multiplier(2, 2, function(result) {
//   console.log(result);
// });
