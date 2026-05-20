import { useEffect, useState } from "react";
import MemoForm from "./components/MemoForm";
import MemoList from "./components/MemoList";
import {
  createMemo,
  deleteMemo,
  getMemos,
  toggleImportant,
  updateMemo,
} from "./api/memoApi";

function App() {
  const [memos, setMemos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingMemo, setEditingMemo] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [showOnlyImportant, setShowOnlyImportant] = useState(false);

  const categories = ["전체", "공부", "업무", "개인", "기타"];

  const fetchMemos = async () => {
    try {
      setIsLoading(true);
      const data = await getMemos();
      setMemos(data);
    } catch (error) {
      console.error(error);
      alert("메모 목록을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMemo = async (memoData) => {
    try {
      const newMemo = await createMemo(memoData);
      setMemos((prevMemos) => [...prevMemos, newMemo]);
    } catch (error) {
      console.error(error);
      alert("메모 추가 중 오류가 발생했습니다.");
    }
  };

  const handleEditMemo = (memo) => {
    setEditingMemo(memo);
  };

  const handleUpdateMemo = async (id, memoData) => {
    try {
      const updatedMemo = await updateMemo(id, memoData);

      setMemos((prevMemos) =>
        prevMemos.map((memo) => (memo.id === id ? updatedMemo : memo)),
      );

      setEditingMemo(null);
    } catch (error) {
      console.error(error);
      alert("메모 수정 중 오류가 발생했습니다.");
    }
  };

  const handleCancelEdit = () => {
    setEditingMemo(null);
  };

  const handleToggleImportant = async (id) => {
    try {
      const updatedMemo = await toggleImportant(id);

      setMemos((prevMemos) =>
        prevMemos.map((memo) => (memo.id === id ? updatedMemo : memo)),
      );

      if (editingMemo?.id === id) {
        setEditingMemo(updatedMemo);
      }
    } catch (error) {
      console.error(error);
      alert("중요 상태 변경 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteMemo = async (id) => {
    const isConfirm = confirm("정말 이 메모를 삭제하시겠습니까?");

    if (!isConfirm) return;

    try {
      await deleteMemo(id);

      setMemos((prevMemos) => prevMemos.filter((memo) => memo.id !== id));

      if (editingMemo?.id === id) {
        setEditingMemo(null);
      }
    } catch (error) {
      console.error(error);
      alert("메모 삭제 중 오류가 발생했습니다.");
    }
  };

  const normalizedSearchText = searchText.toLowerCase();

  const filteredMemos = memos
    .filter((memo) => {
      const title = memo.title.toLowerCase();
      const content = memo.content.toLowerCase();

      const matchesSearch =
        title.includes(normalizedSearchText) ||
        content.includes(normalizedSearchText);

      const matchesCategory =
        selectedCategory === "전체" || memo.category === selectedCategory;

      const matchesImportant = !showOnlyImportant || memo.important;

      return matchesSearch && matchesCategory && matchesImportant;
    })

    // 즐겨찾기 메모가 위로 오게 정렬합니다.
    .sort((a, b) => {
      if (a.important === b.important) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }

      return b.important - a.important;
    });

  useEffect(() => {
    fetchMemos();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-600">
            Memo App
          </div>

          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">
            메모 관리 앱
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
            React와 Node.js Express를 연결해서 만드는 실습용 메모 앱입니다.
            메모를 작성하고, 수정하고, 즐겨찾기와 검색까지 연습할 수 있습니다.
          </p>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-7 px-5 py-8 lg:grid-cols-[360px_1fr]">
        <aside className="lg:sticky lg:top-6 lg:h-fit">
          <MemoForm
            onAddMemo={handleAddMemo}
            onUpdateMemo={handleUpdateMemo}
            editingMemo={editingMemo}
            onCancelEdit={handleCancelEdit}
          />
        </aside>

        <section>
          <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  메모 목록
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  전체 {memos.length}개 중 {filteredMemos.length}개의 메모가
                  보입니다.
                </p>
              </div>

              <button
                type="button"
                onClick={fetchMemos}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
              >
                새로고침
              </button>
            </div>

            <input
              type="text"
              placeholder="제목 또는 내용으로 검색하세요"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="mb-4 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition"
                      : "rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
                  }
                >
                  {category}
                </button>
              ))}
            </div>
            <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm font-bold text-slate-700">
              <input
                type="checkbox"
                checked={showOnlyImportant}
                onChange={(e) => setShowOnlyImportant(e.target.checked)}
                className="h-4 w-4"
              />
              중요 메모만 보기
            </label>
          </div>

          {isLoading ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm">
              메모를 불러오는 중입니다...
            </div>
          ) : (
            <MemoList
              memos={filteredMemos}
              onDeleteMemo={handleDeleteMemo}
              onEditMemo={handleEditMemo}
              onToggleImportant={handleToggleImportant}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
