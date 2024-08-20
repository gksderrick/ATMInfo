# 한경 아카데미 풀스택 과정, express 서버

## 서버: node.js, express
`npm start`: `node server.js`
- node 서버 시작 명령어 (nodemon 작동 X)

<hr>

## 서버 실시간 업데이트: nodemon
`npm run dev`: `nodemon -L --exec 'node server.js'`
- package.json의 실행 옵션 dev 추가
- -L 옵션: 서버가 wsl에 설치되어있어서 watch가 정상적으로 작동하지 않는다. 레거시 옵션을 추가하면 감시 및 업데이트가 정상적으로 이루어진다.

<hr>

## 외부 접속: ngrok (터널링)
`ngrok http --domain=hookworm-square-lark.ngrok-free.app 8080`
- `ngrok http http://localhost:8080` 혹은 `ngrok http 8080`이 기본 명령어.
- ngrok에서 지원하는 고정 도메인을 사용한 명령어. 도메인 변경은 불가능하다.