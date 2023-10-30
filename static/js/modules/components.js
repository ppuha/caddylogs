import { Paging } from "./paging.js"
import { getComparator } from "./utils.js"

export const e = React.createElement

export const Header = ({ name, onClick }) => e("th", {}, [
  e("div", {}, [
    e("p", {}, name),
    e("button", { onClick: onClick(false) }, [
      e("i", { className: "fa fa-solid fa-sort-up" }, [])
    ]),
    e("button", { onClick: onClick(true) }, [
      e("i", { className: "fa fa-solid fa-sort-down" }, [])
    ])
  ])
])

export const Cell = ({ data, getValue }) =>
  e("td", {}, JSON.stringify(getValue(data)))

export const Row = ({ data, getValues }) =>
  e("tr", {}, [
    getValues.map(getValue =>
      e(Cell, { data: data, getValue: getValue })
    )
  ])

export const Table = ({ data, getData, columns, sortOn, setSortOn, page, setPage, pageSize }) => {

  React.useEffect(() => {
    const fetchLogs = () =>
      getData.mapper(fetch(getData.url))
      .then(data => getData.setter(data))
    
    fetchLogs()
  })

  const headerOnClick =
    (name, getValue) =>
      reverse =>
        _ => setSortOn({ on: name, getValue: getValue, reverse })

  return e("div", {}, [
    e(Paging, { page: page, setPage: setPage, pageCount: Math.ceil(data.length / pageSize) }, []),
    e("table", { className: "table" }, [
      e("thead", {}, 
        columns.map(column => 
          e(Header, {
            name: column.name,
            onClick: headerOnClick(column.name, column.getValue)
          }, [])
        )
      ),
      e("tbody", {},
        data.sort(getComparator(sortOn))
          .slice(page * pageSize, (page + 1) * pageSize)
          .map(el =>
            e(Row, {
              data: el,
              getValues: columns.map(column => column.getValue)
            }, []
          )
        )
      )
    ])
  ])
}
