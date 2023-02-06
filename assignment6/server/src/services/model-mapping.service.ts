import Model from "../models/api-data-class.models";
import ApiData from "../models/api-data-interface.model";

export default function ModelMapping(data: ApiData[]) {
  let middleWareResponse: Model[] = [];
  data.map((item: ApiData) => {
    let mappedData = new Model(item);
    middleWareResponse.push(mappedData);
  });
  return middleWareResponse;
}
