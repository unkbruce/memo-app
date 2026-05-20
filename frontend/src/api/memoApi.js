// 백엔드 서버 주소
const BASE_URL = "http://localhost:3000/api/memos";

// 메모 목록 조회
export async function getMemos() {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("메모 목록을 불러오지 못했습니다.");
  }

  return response.json();
}

// 메모 추가
export async function createMemo(memoData) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memoData),
  });

  if (!response.ok) {
    throw new Error("메모를 추가하지 못했습니다.");
  }

  return response.json();
}

// 메모 수정
export async function updateMemo(id, memoData) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memoData),
  });

  if (!response.ok) {
    throw new Error("메모를 수정하지 못했습니다.");
  }

  return response.json();
}

// 메모 중요 상태 변경
export async function toggleImportant(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("중요 상태를 변경하지 못했습니다.");
  }

  return response.json();
}

// 메모 삭제
export async function deleteMemo(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("메모를 삭제하지 못했습니다.");
  }

  return response.json();
}
