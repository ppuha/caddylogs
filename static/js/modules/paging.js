export const e = React.createElement;

import { range } from "./utils.js";

export const Paging = ({ page, setPage, pageCount }) => {
  let getRange = () =>
    page <= 5
      ? range(0, 10)
      : page >= pageCount - 10
        ? range(pageCount - 10, pageCount)
        : range(page - 5, page + 5);

  let getPage = (i) =>
    e(
      "li",
      { className: "page-item" },
      e(
        "button",
        { className: "page-link", onClick: (_) => setPage(i) },
        i.toString(),
      ),
    );

  return e(
    "ul",
    { className: "pagination" },
    (page > 10 ? [getPage(0)] : [])
      .concat(getRange().map(getPage))
      .concat(page < pageCount - 10 ? [getPage(pageCount)] : []),
  );
};
