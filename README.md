# node-board

## express로 회원기능, 게시판 기능, 댓글 기능 만들어보기

## MVC
- model : db관련 코드만 작성
- controller : db제외 서비스 코드만 작성
- view : front-end는 작성x 

### 회원기능
- 회원가입 시 email, password, nickname저장
- 로그인 시 성공하면 jwt token발급

### 게시판 기능
- 게시글을 읽는 기능은 token없어도 가능
- 그 외 작성, 수정, 삭제는 헤더에 token필요


[postman API 명세서](https://documenter.getpostman.com/view/16655599/UUxwC96x)
