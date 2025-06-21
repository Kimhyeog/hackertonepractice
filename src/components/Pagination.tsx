type PaginationProps = {
  currentPage: number;
  totalPage: number;
  onChangePage: (page: number) => void;
};

function Pagination({ currentPage, totalPage, onChangePage }: PaginationProps) {
  return (
    <div className="mt-4 flex gap-2">
      {/* 이전 버튼 */}
      <button
        disabled={currentPage <= 1}
        className={`px-2 py-1 rounded ${
          currentPage <= 1
            ? "opacity-50 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
        onClick={() => onChangePage(currentPage - 1)}
      >
        이전
      </button>
      {/* 현재 페이지수 출력 */}
      <span>{" " + currentPage + " "}</span>
      {/* 다음 버튼 */}
      <button
        disabled={currentPage >= totalPage}
        className={`px-2 py-1 rounded ${
          currentPage >= totalPage
            ? "opacity-50 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
        onClick={() => onChangePage(currentPage + 1)}
      >
        다음
      </button>
    </div>
  );
}

export default Pagination;
