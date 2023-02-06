window.onscroll = function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    fetch_data();
  }
};
let page = 0;
const results = 40;

async function fetch_data() {
  page += 1;

  const resp = await fetch(
    `http://localhost:3000/?page=${page}&results=${results}&seed=abc`
  );
  const data = await resp.json();

  let table = document.getElementById("tableBody");
  data.results.map((user) => {
    let tab_row = document.createElement("tr");
    let img_row = document.createElement("td");
    let img = document.createElement("img");
    img.src = user.picture.thumbnail;
    img_row.appendChild(img);
    let name_row = document.createElement("td");
    name_row.innerText = user.name.first;
    let city_row = document.createElement("td");
    city_row.innerText = user.location.city;
    let state_row = document.createElement("td");
    state_row.innerText = user.location.state;
    let country_row = document.createElement("td");
    country_row.innerText = user.location.country;
    let username_row = document.createElement("td");
    username_row.innerText = user.login.username;
    tab_row.appendChild(img_row);
    tab_row.appendChild(name_row);
    tab_row.appendChild(city_row);
    tab_row.appendChild(state_row);
    tab_row.appendChild(country_row);
    tab_row.appendChild(username_row);
    table.appendChild(tab_row);
  });
}
function sortTable(colnum) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById("myTable");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[colnum];
      y = rows[i + 1].getElementsByTagName("td")[colnum];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
function search() {
  let value = document.getElementById("searchInput").value.toLowerCase();
  let table = document.getElementById("tableBody");
  let row = table.rows;
  for (i = 0; i < row.length; i++) {
    cols = row[i].getElementsByTagName("TD");
    let flag = false;
    for (let data of cols) {
      if (data.innerText.toLowerCase().includes(value)) {
        flag = true;
        break;
      }
    }
    if (flag == false) {
      row[i].style.display = "none";
    } else {
      row[i].style.display = "";
    }
  }
}
