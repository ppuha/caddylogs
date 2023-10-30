export const e = React.createElement

import { range } from "./utils.js"

export const Paging = ({ page, setPage, pageCount }) => {

  let getRange = () => {
    if (page <= 5) {
      return range(0, 10)
    } else if (page >= pageCount - 10) {
      return range(pageCount - 10, pageCount)
    } else {
      return range(page - 5, page + 5)
    }
  }

  let getPage = (i) => e("li", { className: "page-item" },
    e("button", { className: "page-link", onClick: _ => setPage(i) },
      i.toString()
    )
  )

  return e("ul", { className: "pagination" },
    ((page > 10) ? [getPage(0)] : [])  
    .concat(getRange().map(getPage)) 
    .concat((page < 10) ? [getPage(pageCount)] : [])
  )
}
