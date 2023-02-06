import ApiData from "../models/api-data-interface.model";

const fetchAll = async (url: string) => {
  try {
    const response = await fetch(url);
    const data: ApiData[] = await response.json();
    return data;
  } catch (err) {
    console.log("There is some error fetching data", err);
    return <ApiData[]>[];
  }
};

export default fetchAll;
