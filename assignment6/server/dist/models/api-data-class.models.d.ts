import ApiData from "./api-data-interface.model";
export default class Model {
    image: string;
    title: string;
    html: string;
    teaser: string;
    author: string;
    type: string;
    constructor(data: ApiData);
}
