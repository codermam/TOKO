import { useMemo, useState } from "react";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function DataTable({ columns, rows }) {
  const [search, setSearch] = useState("");
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [pageSize, setPageSize] = useState(25);
  const [page, setPage] = useState(1);

  const filteredRows = useMemo(() => {
    if (!search.trim()) return rows;

    const query = search.toLowerCase();

    return rows.filter((row) =>
      columns.some((col) =>
        String(row[col] ?? "")
          .toLowerCase()
          .includes(query)
      )
    );
  }, [rows, columns, search]);

  const sortedRows = useMemo(() => {
    if (!sortCol) return filteredRows;

    const data = [...filteredRows];

    data.sort((a, b) => {
      const first = a[sortCol];
      const second = b[sortCol];

      const firstNum = Number(first);
      const secondNum = Number(second);

      let result;

      if (
        Number.isFinite(firstNum) &&
        Number.isFinite(secondNum) &&
        first !== "" &&
        second !== ""
      ) {
        result = firstNum - secondNum;
      } else {
        result = String(first ?? "").localeCompare(
          String(second ?? "")
        );
      }

      return sortDir === "asc" ? result : -result;
    });

    return data;
  }, [filteredRows, sortCol, sortDir]);

  const totalPages = Math.max(
    1,
    Math.ceil(sortedRows.length / pageSize)
  );

  const currentPage = Math.min(page, totalPages);

  const startIndex = (currentPage - 1) * pageSize;

  const currentRows = sortedRows.slice(
    startIndex,
    startIndex + pageSize
  );

  function handleSort(column) {
    if (sortCol === column) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortCol(column);
      setSortDir("asc");
    }

    setPage(1);
  }

  return (
    <section className="card overflow-hidden animate-fade">

      <div className="p-5 border-b border-base-300 bg-base-100">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div>

            <div className="flex items-center gap-2 mb-2">

              <div className="w-3 h-3 rounded-full bg-success animate-pulse" />

              <span className="text-xs font-mono-data uppercase tracking-widest opacity-60">
                Dataset Preview
              </span>

            </div>

            <h3 className="text-2xl font-display font-bold">
              Data Explorer
            </h3>

            <p className="text-sm opacity-60 mt-1">
              {rows.length.toLocaleString()} rows · {columns.length} columns
            </p>

          </div>


          <div className="flex flex-col sm:flex-row gap-3">

            <label className="input input-bordered flex items-center gap-2 w-full sm:w-72">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 opacity-50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m21 21-4.3-4.3m0 0A7.5 7.5 0 1 0 6.1 6.1a7.5 7.5 0 0 0 10.6 10.6Z"
                />
              </svg>

              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search rows..."
              />

            </label>


            <select
              className="select select-bordered"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size} rows
                </option>
              ))}
            </select>

          </div>

        </div>

      </div>


      <div className="overflow-auto max-h-[520px]">

        <table className="table table-zebra">

          <thead className="sticky top-0 z-10">

            <tr>

              {columns.map((column) => (

                <th
                  key={column}
                  onClick={() => handleSort(column)}
                  className="cursor-pointer select-none whitespace-nowrap"
                >

                  <div className="flex items-center gap-2">

                    {column}

                    {sortCol === column ? (
                      sortDir === "asc" ? "↑" : "↓"
                    ) : (
                      <span className="opacity-30">↕</span>
                    )}

                  </div>

                </th>

              ))}

            </tr>

          </thead>


          <tbody>

            {currentRows.length ? (

              currentRows.map((row, index) => (

                <tr
                  key={index}
                  className="transition"
                >

                  {columns.map((column) => (

                    <td
                      key={column}
                      className="whitespace-nowrap max-w-xs truncate"
                    >
                      {String(row[column] ?? "")}
                    </td>

                  ))}

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan={columns.length}
                  className="py-16 text-center"
                >

                  <div className="flex flex-col items-center gap-3">

                    <span className="text-5xl">🔎</span>

                    <p className="font-semibold">
                      No matching data
                    </p>

                    <p className="text-sm opacity-60">
                      Try another search keyword.
                    </p>

                  </div>

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>


      <div className="p-5 border-t border-base-300 bg-base-200 flex flex-col md:flex-row items-center justify-between gap-4">

        <p className="text-sm opacity-70">
          Showing{" "}
          <b>{sortedRows.length ? startIndex + 1 : 0}</b>
          {" - "}
          <b>
            {Math.min(
              startIndex + pageSize,
              sortedRows.length
            )}
          </b>
          {" "}of{" "}
          <b>{sortedRows.length}</b>
        </p>


    

      </div>

    </section>
  );
}