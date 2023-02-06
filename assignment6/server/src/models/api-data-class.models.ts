import ApiData from "./api-data-interface.model";

export default class Model {
    image!: string;
    title!: string;
    html!: string;
    teaser!: string;
    author!: string;
    type!: string;
  
    constructor(data: ApiData) {
      this.image = data.image;
      this.title = data.title;
      this.html = data.html;
      this.teaser = data.teaser;
      this.author = data.author;
      this.type = data.type;
    }
  }
  