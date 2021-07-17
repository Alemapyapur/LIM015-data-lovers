
export const selectName = (data,name) =>
(data.filter(search => search.name.toUpperCase().includes(name.toUpperCase())))

export const selectFilter = (data,filterType) =>
(data.filter(search=> search.type.includes(filterType)))

export const calc =(data, filterType)=> {
const type = data.filter(search => search.type.includes(filterType))
  return Math.round(((type.length * 100) / data.length) * 100) / 100
}
export const selectWeak = (data, weakFilter) =>
(data.filter(search => search.weaknesses.includes(weakFilter)))


const orderAZ = (a, b) => (a["name"]).localeCompare(b["name"])
const orderZA = (a, b) => (a["name"]).localeCompare(b["name"])
const orderByStats = (a, b) => Number(a.stats["max-cp"].split(" ")[0]) - Number(b.stats["max-cp"].split(" ")[0])

const orderGeneration = (a, b) => Number(a.generation["name"].split(" ")[0]) - Number(b.generation["name"].split(" ")[0])

export const orderPokes = (data, order) => {
  switch (order) {
    case "stats":
      //console.log(data);
      return data.sort((a, b) => orderByStats(a, b))
    case "stats-reverse":
      return data.sort((a, b) => orderByStats(a, b)).reverse();
    case "order-generation":
      return data.sort((a, b) => orderGeneration(a, b));
    case "order-az":
      return data.sort((a, b) => orderAZ(a, b))
    case "order-za":
      return data.sort((a, b) => orderZA(a, b)).reverse();
  }
}






