const reverseComp = (comp) => (e0, e1) => comp(e0, e1) * -1;

export const getComparator = ({ getValue, reverse }) => {
  let c = (l0, l1) => {
    let e0 = getValue(l0);
    let e1 = getValue(l1);
    switch (typeof e0) {
      case "number":
        return e0 - e1;
      case "string":
        return e0.localeCompare(e1);
      default:
        return 0;
    }
  };
  return reverse ? reverseComp(c) : c;
};

export const range = (start, end) =>
  [...Array(end - start).keys()].map((i) => i + start);
