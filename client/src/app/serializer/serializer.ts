import {Resource} from "../model/resource";

export interface Serializer {
  fromJson(json: any): Resource;

  toJson(resource: Resource): any;
}
