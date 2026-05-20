# Memo App

React와 Node.js Express를 사용해서 만든 메모 관리 앱입니다.  
TodoList 앱을 확장하여 메모 작성, 수정, 삭제, 중요 표시, 검색, 카테고리 필터 기능을 구현했습니다.

## 주요 기능

- 메모 목록 조회
- 메모 추가
- 메모 수정
- 메모 삭제
- 중요 메모 표시
- 중요 메모만 보기
- 제목/내용 검색
- 카테고리 필터
- 메모 개수 표시
- Tailwind CSS 기반 반응형 UI

## 기술 스택

### Frontend

- Vite
- React
- Tailwind CSS
- fetch API

### Backend

- Node.js
- Express
- CORS
- Memory Array

## 폴더 구조

```txt
memo-app/
  backend/
    server.js
    package.json

  frontend/
    src/
    package.json
    vite.config.js

  docs/
    Memo_App_PRD.pdf

  README.md
  .gitignore
```

## 실행 방법

### 1. 백엔드 실행

```bash
cd backend
npm install
npm run dev
```

백엔드 서버 주소:

```txt
http://localhost:3000
```

### 2. 프론트엔드 실행

```bash
cd frontend
npm install
npm run dev
```

프론트엔드 주소:

```txt
http://localhost:5173
```

## API 명세

| 기능           | Method | URL              |
| -------------- | ------ | ---------------- |
| 메모 목록 조회 | GET    | `/api/memos`     |
| 메모 추가      | POST   | `/api/memos`     |
| 메모 수정      | PUT    | `/api/memos/:id` |
| 중요 상태 변경 | PATCH  | `/api/memos/:id` |
| 메모 삭제      | DELETE | `/api/memos/:id` |

## PRD 문서

- [PRD 문서 보기](docs/Memo_App_PRD.pdf)

## 학습 포인트

- React state 관리
- useEffect를 이용한 초기 데이터 로딩
- fetch API를 이용한 백엔드 연동
- Express REST API 구현
- 배열 기반 CRUD 처리
- Tailwind CSS 조건부 스타일링
- 프론트엔드와 백엔드 분리 구조 이해
