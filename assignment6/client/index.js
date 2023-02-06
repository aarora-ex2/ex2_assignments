//HTML tags invoked using variables
const articleContainer = document.getElementById("article__container");
let sidebar_items = document.querySelectorAll(".sidebar__items");
const article = document.querySelector(".article");
const showMoreBtn = document.querySelector(".show_btn");
const title = document.getElementById("title");
const search = document.getElementById("search");

//Variables Used
let page = 1;
let url;
// let searchTerm = "";
let clickedItem = "";

//Window OnLoad() function
window.onload = () => {
  articleContainer.appendChild(createBanner());
  title.innerText = "Home Advice & Inspiration";
  showMoreBtn.style.display = "none";
  listArticles();
};

const baseUrl = "http://localhost:3000";
//Fetch data from the API
async function fetch_data(type, categ, searchTerm) {
  url = `${baseUrl}/?page=${
    type == "category" ? 1 : page
  }&type=${type}&categ=${categ}&search=${searchTerm}`;

  console.log(url);

  const response = await fetch(url);
  return await response.json();
}

//List articles in html after fetching data
function buttonHide(len) {
  if (len < 16) {
    showMoreBtn.style.display = "none";
  } else {
    showMoreBtn.style.display = "inline";
  }
}
async function listArticles(type = "articles", categ = "", searchTerm = "") {
  fetch_data(type, categ, searchTerm)
    .then((articles) => {
      if (articles.length === 0) {
        const p = document.createElement("p");
        p.innerText = "No articles found.";
        articleContainer.appendChild(p);
      }
      buttonHide(articles.length);

      for (const article of articles) {
        articleContainer.appendChild(postArticle(article));
      }
    })
    .catch((e) => console.log(e));
}

//Create a format of every article
function postArticle(article) {
  const a = document.createElement("a");
  const figure = document.createElement("figure");
  const div = document.createElement("div");
  const img = document.createElement("img");
  const h2 = document.createElement("h2");
  const p = document.createElement("p");
  const span = document.createElement("span");
  span.innerText = article.author;
  h2.innerText = article.title;
  p.innerHTML = article.teaser;

  img.src = article.image;
  a.href =
    window.location.href +
    `articles/?title=${article.title.toLowerCase().split(" ").join("-")}`;

  figure.classList.add("article");
  div.classList.add("article__title__desc");
  figure.appendChild(img);
  div.appendChild(h2);
  div.appendChild(p);
  div.appendChild(span);
  figure.appendChild(div);
  a.appendChild(figure);

  return a;
}

//Create banner for view all
function createBanner() {
  const figure = document.createElement("figure");
  const div = document.createElement("div");
  const img = document.createElement("img");
  const div1 = document.createElement("div");
  const h1 = document.createElement("h1");
  const p = document.createElement("p");

  figure.classList.add("advice__banner");
  div.classList.add("advice__banner__content");
  img.classList.add("advice__banner__img");
  div1.classList.add("advice__banner__details");

  img.src =
    "https://d2awz7twruaixb.cloudfront.net/assets/images/hl-nlc-hero-image-content-landing-page.jpg";

  h1.innerText = "Home advice & inspiration";
  p.innerText =
    "Learn from home experts & get inspiration from the latest home design trends";

  div1.appendChild(h1);
  div1.appendChild(p);
  div.appendChild(img);
  div.appendChild(div1);
  figure.appendChild(div);

  return figure;
}

//Event Listeners
showMoreBtn.addEventListener("click", () => {
  page += 1;
  listArticles();
  console.log(page);
});

sidebar_items.forEach((s) =>
  s.addEventListener("click", (e) => {
    // e.preventDefault();
    document.querySelector(".sidebar__items.active").classList.remove("active");
    s.classList.add("active");
    showMoreBtn.style.display = "none";
    page = 1;
    if (
      e.target.innerText != "View All Articles" &&
      e.target.innerText != clickedItem
    ) {
      articleContainer.innerHTML = "";
      clickedItem = e.target.innerText;
      title.innerText = e.target.innerText;
      listArticles("category", title.innerText.toLowerCase());
    } else if (e.target.innerText == "View All Articles") {
      articleContainer.innerHTML = "";
      articleContainer.appendChild(createBanner());
      title.innerText = "Home Advice & Inspiration";
      listArticles();
    }
  })
);

//Handle Changes made in input for search
search.addEventListener("change", (e) => {
  showMoreBtn.style.display = "none";
  if (e.target.value != "") {
    articleContainer.innerHTML = "";
    title.innerText = `Search Results for ${e.target.value}`;
    // searchTerm = e.target.value;
    listArticles("articles", "", e.target.value);
  }
});
