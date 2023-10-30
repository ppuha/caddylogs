import { Table } from "./modules/components.js"

const e = React.createElement

const App = ({}) => {
  const pageSize = 20
  const [logs, setLogs] = React.useState([])
  const [page, setPage] = React.useState(0)

  const [sortOn, setSortOn] =
    React.useState({
      on: "Timestamp",
      reverse: false,
      getValue: log => log.ts
    })

  const getData = {
    url: "/log/access.log", 
    mapper: body => 
      body
      .then(body => body.text())
      .then(content => "[" + content.split("\n").slice(0, -1).join(",") + "]")
      .then(content => JSON.parse(content)), 
    setter: setLogs
  }

  const columns = [
    { name: "Timestamp", getValue: x => new Date(x.ts * 1000) },
    { name: "Status", getValue: x => x.status },
    { name: "URI", getValue: x => x.request.uri },
    { name: "Level", getValue: x => x.level }
  ]

  return e(Table, { 
    data: logs, 
    getData: getData,
    columns: columns, 
    sortOn: sortOn, 
    setSortOn: setSortOn, 
    page: page, 
    setPage: setPage, 
    pageSize:pageSize 
  }, [])
}

ReactDOM
  .createRoot(document.getElementById("root"))
  .render(React.createElement(App, {}, []))
