const http = require("http");
const fetch = require("node-fetch-commonjs");

const data = fetch("https://randomuser.me/api/?results=10").then((data) =>
  data.json()
);

data.then((data) => {
  http
    .createServer(async (req, res) => {
      //homepage
      if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
            <ul>
                <li>
                <a href="/app">App</a>
                </li>
                <li>
                    <a href="/search">Search</a>
                    </li>
                <li>
                    <a href="/sort">Sort</a>
                    </li>
            </ul>
            `);
      }
      //display a user
      else if (req.url === "/app") {
        const data = await fetch("https://randomuser.me/api/").then((data) =>
          data.json()
        );
        res.writeHead(200, { "Content-Type": "text/html" });
        const d = data.results[0];
        res.end(`
            <center>
            <p>
            <a href="/">Back Home</a>
            </p>
                <img src=${d.picture.large} alt="me" />
                <p>Hi, my name is</p>
                <h1>${d.name.first} ${d.name.last}</h1>
            </center>`);
      }
      //search a user from the list of 10
      else if (req.url === "/search") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(
          `
          <body>
          <p>
                    <a href="/">Back Home</a>
                </p>
                <input id="search" placeholder="search with name" value="" onchange={handlechange()} />
                <input id="gender" placeholder="search with gender" value="" onchange={handlechange()} />
                <input id="country" placeholder="search with country" value="" onchange={handlechange()} />
                <div id="container"></div>
                
                <script>
                ${JSON.stringify(data.results)}.map((x) => {
                    let p = document.createElement('p');
                    p.innerText = x.name.first + " " + x.name.last
                    document.getElementById("container").appendChild(p);
                })
                
                let search = document.getElementById("search")
                let gender = document.getElementById("gender")
                let country = document.getElementById("country")
                function handlechange() {   
                    document.getElementById("container").innerHTML = ''
                    let newData = ${JSON.stringify(
                      data.results
                    )}.filter((x) => {
                            let name = x.name.first + " " + x.name.last
                            let a = name.toLowerCase().includes(search.value.toLowerCase()) && (x.gender.toLowerCase()===gender.value || gender.value==false) && x.location.country.toLowerCase().includes(country.value);
                            return a;
                        })
                        newData.map((x) => {
                            let img = document.createElement('img');
                            let h3 = document.createElement('h3');
                            let p = document.createElement('p')
                            let h4 = document.createElement('h4')
                            img.src = x.picture.large
                            h3.innerText = "Hi, I am " + x.name.first + " " + x.name.last
                            p.innerText = "Phone Number: " + x.phone
                            h4.innerText = x.location.country
                        document.getElementById("container").appendChild(img);
                        document.getElementById("container").appendChild(h3);
                        document.getElementById("container").appendChild(p);
                        document.getElementById("container").appendChild(h4);
                    })
                    
                    
                }
                </script>
                </body>
        `
        );
      }
      //sort all the users in asc or desc
      else if (req.url === "/sort") {
        res.writeHead(200, { "Content-Type": "text/html" });
        let names = data.results.map((x) => x.name.first + " " + x.name.last);
        res.end(
          `
          <body>
                <p>
                <a href="/">Back Home</a>
                </p>
                <button onclick="asc()">Ascending</button>
                <button onclick="desc()">Descending</button>
                <div id="cnt"></div>
            <script>
            ${JSON.stringify(names)}.map((name) => {
                let p = document.createElement('p');
                p.innerText = name
                document.getElementById("cnt").appendChild(p);
            })
            function asc() {
                document.getElementById("cnt").innerHTML = '';
                ${JSON.stringify(names)}.sort().map((name) => {
                    let p = document.createElement('p');
                    p.innerText = name
                    document.getElementById("cnt").appendChild(p);
                })
            }
            function desc() {
                document.getElementById("cnt").innerHTML = '';
                ${JSON.stringify(names)}.sort().reverse().map((name) => {
                    let p = document.createElement('p');
                    p.innerText = name
                    document.getElementById("cnt").appendChild(p);
                })   
            }
            </script>
            </body>
            `
        );
      }
    })
    .listen(3000);
});
