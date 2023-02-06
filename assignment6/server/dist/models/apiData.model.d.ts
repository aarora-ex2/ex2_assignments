export interface ApiData {
    image: string;
    html: string;
    title: string;
    teaser: string;
    author: string;
    type: string;
}
export declare class Model {
    image: string;
    title: string;
    html: string;
    teaser: string;
    author: string;
    type: string;
    constructor(data: ApiData);
}
