import { IModel } from './IModel'

export interface IDiscussion extends IModel {
  permalink: string
  name: string
  body: string
  excerpt: string
  parsed_body: string
  parsed_excerpt: string
}
