// Express 서버를 만들기 위해 express를 불러옵니다.
const express = require("express");

// 프론트엔드와 백엔드 주소가 다를 때 요청을 허용하기 위해 cors를 사용합니다.
const cors = require("cors");

// Express 앱 생성
const app = express();

// 서버 포트 번호
const PORT = 3000;

// CORS 허용
app.use(cors());

// JSON 형식의 요청 body를 읽을 수 있게 설정
app.use(express.json());

// DB 대신 메모리 배열을 사용합니다.
// 서버를 껐다 켜면 이 데이터는 초기화됩니다.
let memos = [
  {
    id: 1,
    title: "React 공부하기",
    content: "컴포넌트, props, state 개념 복습하기",
    category: "공부",
    important: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "포트폴리오 정리",
    content: "메인 프로젝트 설명과 화면 캡처 정리하기",
    category: "업무",
    important: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// 새로운 메모 id를 만들기 위한 변수
let nextId = 3;

// 기본 확인용 API
app.get("/", (req, res) => {
  res.send("Memo App Backend Server is running!");
});

// 메모 목록 조회 API
// GET /api/memos
app.get("/api/memos", (req, res) => {
  res.json(memos);
});

// 메모 추가 API
// POST /api/memos
app.post("/api/memos", (req, res) => {
  const { title, content, category } = req.body;

  // 제목과 내용이 비어 있으면 에러 응답을 보냅니다.
  if (!title || !content) {
    return res.status(400).json({
      message: "제목과 내용은 필수입니다.",
    });
  }

  const newMemo = {
    id: nextId,
    title,
    content,
    category: category || "기타",
    important: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  memos.push(newMemo);
  nextId += 1;

  res.status(201).json(newMemo);
});

// 메모 수정 API
// PUT /api/memos/:id
app.put("/api/memos/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, content, category } = req.body;

  const memo = memos.find((memo) => memo.id === id);

  if (!memo) {
    return res.status(404).json({
      message: "수정할 메모를 찾을 수 없습니다.",
    });
  }

  if (!title || !content) {
    return res.status(400).json({
      message: "제목과 내용은 필수입니다.",
    });
  }

  memo.title = title;
  memo.content = content;
  memo.category = category || "기타";
  memo.updatedAt = new Date().toISOString();

  res.json(memo);
});

// 메모 중요 상태 변경 API
// PATCH /api/memos/:id
app.patch("/api/memos/:id", (req, res) => {
  const id = Number(req.params.id);

  const memo = memos.find((memo) => memo.id === id);

  if (!memo) {
    return res.status(404).json({
      message: "중요 상태를 변경할 메모를 찾을 수 없습니다.",
    });
  }

  // true면 false로, false면 true로 변경
  memo.important = !memo.important;
  memo.updatedAt = new Date().toISOString();

  res.json(memo);
});

// 메모 삭제 API
// DELETE /api/memos/:id
app.delete("/api/memos/:id", (req, res) => {
  const id = Number(req.params.id);

  const memo = memos.find((memo) => memo.id === id);

  if (!memo) {
    return res.status(404).json({
      message: "삭제할 메모를 찾을 수 없습니다.",
    });
  }

  memos = memos.filter((memo) => memo.id !== id);

  res.json({
    message: "메모가 삭제되었습니다.",
    deletedId: id,
  });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
