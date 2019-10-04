import { IModel } from './IModel'

export interface IUser extends IModel {
  username: string
  name: string
  bio: string
  profile_picture_name: string
  viewer_follows: string
  follows_viewer: string
}
