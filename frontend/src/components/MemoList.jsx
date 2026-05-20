import MemoCard from "./MemoCard";

function MemoList({ memos, onDeleteMemo, onEditMemo, onToggleImportant }) {
  if (memos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
          📝
        </div>

        <h3 className="text-lg font-bold text-slate-800">
          표시할 메모가 없습니다.
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          새 메모를 작성하거나 검색어와 카테고리 필터를 다시 확인해보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {memos.map((memo) => (
        <MemoCard
          key={memo.id}
          memo={memo}
          onDeleteMemo={onDeleteMemo}
          onEditMemo={onEditMemo}
          onToggleImportant={onToggleImportant}
        />
      ))}
    </div>
  );
}

export default MemoList;
