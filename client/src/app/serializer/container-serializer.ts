import {Serializer} from "./serializer";
import {Resource} from "../model/resource";
import {Container} from "../model/container";

export class ContainerSerializer implements Serializer {
  fromJson(json: any): Resource {
    return new Container(json.id);
  }

  toJson(resource: Resource): any {
    return {
      id: resource.id
    }
  }

}
