import { IModel } from './IModel'

export interface IGroup extends IModel {
  permalink: string
  name: string
  body: string
}
