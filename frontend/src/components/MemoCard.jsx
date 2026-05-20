function MemoCard({ memo, onDeleteMemo, onEditMemo, onToggleImportant }) {
  const createdDate = new Date(memo.createdAt).toLocaleDateString("ko-KR");

  return (
    <article
      className={
        memo.important
          ? "rounded-2xl border border-yellow-200 bg-yellow-50/40 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          : "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
      }
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="mb-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
            {memo.category}
          </span>

          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-black text-slate-900">{memo.title}</h3>

            {memo.important && (
              <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-bold text-yellow-700">
                중요
              </span>
            )}
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => onToggleImportant(memo.id)}
            className={
              memo.important
                ? "rounded-xl bg-yellow-100 px-3 py-2 text-sm font-bold text-yellow-700 transition hover:bg-yellow-200"
                : "rounded-xl bg-slate-100 px-3 py-2 text-sm font-bold text-slate-500 transition hover:bg-slate-200"
            }
            title="중요 메모"
          >
            {memo.important ? "★" : "☆"}
          </button>

          <button
            type="button"
            onClick={() => onEditMemo(memo)}
            className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
          >
            수정
          </button>

          <button
            type="button"
            onClick={() => onDeleteMemo(memo.id)}
            className="rounded-xl bg-red-50 px-3 py-2 text-sm font-bold text-red-600 transition hover:bg-red-100"
          >
            삭제
          </button>
        </div>
      </div>

      <p className="mb-5 line-clamp-3 text-sm leading-6 text-slate-600">
        {memo.content}
      </p>

      <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-400">
        <span>작성일: {createdDate}</span>
        <span>ID: {memo.id}</span>
      </div>
    </article>
  );
}

export default MemoCard;
