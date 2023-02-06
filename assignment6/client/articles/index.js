const pageTitle = document.getElementById("title");
const articleContainer = document.getElementById("article__container");

pageTitle.innerText = "";

function getParams() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams;
}
let title = getParams().get("title");
console.log(title);

async function fetchArticle() {
  const response = await fetch(
    `http://localhost:3000/articles/?title=${title}`
  );
  return await response.json();
}

async function listArticle() {
  fetchArticle().then((data) => {
    data.map((d) => {
      articleContainer.appendChild(createTemplate(d));
      pageTitle.innerText = d.title;
    });
  });
}
listArticle();

function createTemplate(d) {
  let div = document.createElement("div");
  let h1 = document.createElement("h1");
  let p = document.createElement("p");
  let img = document.createElement("img");
  let desc = document.createElement("p");

  h1.innerText = d.title;
  h1.classList.add("article__title");
  img.src = d.image;
  img.classList.add("img");
  p.innerText = "by " + d.author;
  p.classList.add("author");
  desc.innerHTML = d.html;

  div.appendChild(h1);
  div.appendChild(p);
  div.appendChild(img);
  div.appendChild(desc);
  return div;
}
