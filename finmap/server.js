// express만 포함하여 간단한 웹사이트를 만드는 경우

const express = require("express");
const app = express();
const path = require("path");

// app.use(express.json());
// express.static: 정적 파일을 제공하기 위한 미들웨어
app.use(express.static(path.join(__dirname, '.')));

app.listen(4000, '0.0.0.0', function() {
  console.log("4000 포트, 서비스 시작.");
});

app.get("/", function(request, response){
  response.sendFile(path.resolve(__dirname + "/index.html"));
  console.log("sent index.html wep page ");
});



// app.post("/userCheck", function(request, response){
//   response.send('0');
//   console.log('userCheck: 생성 가능한 아이디');
// });


// express 외에 다른 기능 때문에 서버에 대한 권한이 더 필요한 경우
// ex) https 서버: SSL/TLS

// const express = require("express");
// const http = require("http");
// const app = express();
// const server = http.createServer(app);

// server.listen(8080, function(){

// });