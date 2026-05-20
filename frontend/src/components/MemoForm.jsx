import { useEffect, useState } from "react";

function MemoForm({ onAddMemo, onUpdateMemo, editingMemo, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("공부");

  // 수정 버튼을 눌렀을 때 editingMemo에 값이 들어옵니다.
  // 그 값을 입력창에 넣어주는 역할입니다.
  useEffect(() => {
    if (editingMemo) {
      setTitle(editingMemo.title);
      setContent(editingMemo.content);
      setCategory(editingMemo.category);
    }
  }, [editingMemo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const memoData = {
      title,
      content,
      category,
    };

    // editingMemo가 있으면 수정 상태입니다.
    if (editingMemo) {
      onUpdateMemo(editingMemo.id, memoData);
    } else {
      onAddMemo(memoData);
    }

    setTitle("");
    setContent("");
    setCategory("공부");
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setCategory("공부");
    onCancelEdit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <h2 className="mb-4 text-xl font-bold text-slate-800">
        {editingMemo ? "메모 수정" : "메모 작성"}
      </h2>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-semibold text-slate-700">
          제목
        </label>
        <input
          type="text"
          placeholder="메모 제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-semibold text-slate-700">
          내용
        </label>
        <textarea
          placeholder="메모 내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="5"
          className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-5">
        <label className="mb-1 block text-sm font-semibold text-slate-700">
          카테고리
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="공부">공부</option>
          <option value="업무">업무</option>
          <option value="개인">개인</option>
          <option value="기타">기타</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-700"
      >
        {editingMemo ? "수정하기" : "메모 추가"}
      </button>

      {editingMemo && (
        <button
          type="button"
          onClick={handleCancel}
          className="mt-3 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-bold text-slate-700 hover:bg-slate-100"
        >
          수정 취소
        </button>
      )}
    </form>
  );
}

export default MemoForm;
