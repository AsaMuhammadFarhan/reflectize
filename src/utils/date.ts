export const startDayOfDate = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);

export const monthsName = [
  {
    name: "January",
    code: "01",
  },
  {
    name: "February",
    code: "02",
  },
  {
    name: "March",
    code: "03",
  },
  {
    name: "April",
    code: "04",
  },
  {
    name: "May",
    code: "05",
  },
  {
    name: "June",
    code: "06",
  },
  {
    name: "July",
    code: "07",
  },
  {
    name: "August",
    code: "08",
  },
  {
    name: "September",
    code: "09",
  },
  {
    name: "October",
    code: "10",
  },
  {
    name: "November",
    code: "11",
  },
  {
    name: "December",
    code: "12",
  },
] as const;

export const getArrayofYearbyStartYear = (start?: number, end?: number) => {
  const thisYear = end ?? new Date().getFullYear();
  const fromYear = start ?? 1990;
  const yearsStock: number[] = [];

  for (let index = fromYear; index <= thisYear; index++) {
    yearsStock.push(index);
  }

  return yearsStock;
};

export const yearsStock = getArrayofYearbyStartYear(2024);