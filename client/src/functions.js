export function selectData(searchTerms, searchData) {
  const inputKeys = Object.keys(searchTerms);
  let selectedData = searchData.slice();
  for (let key of inputKeys) {
    selectedData = selectedData.filter((entry) => {
      return entry[key].includes(searchTerms[key]) ? entry : null;
    });
  }
  if (selectedData.length === 0) {
    return false;
  }
  return selectedData;
}

export function sortData(sort, data) {
  let sortedData = data.slice();
  const { field, reversed } = sort;
  sortedData.sort((a, b) => {
    if (a[field] > b[field]) {
      return reversed ? -1 : 1;
    } else {
      return reversed ? 1 : -1;
    }
  });
  return sortedData;
}
