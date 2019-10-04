import { IIdentifier } from '../contracts/IIdentifier'
import { IModel } from '../contracts/IModel'
import { NavigationParams } from 'react-navigation'

export interface IDiscussionFormParams extends NavigationParams {
  id: IIdentifier
  culture: IModel
  discussion: IModel
  editing_mode: boolean
}
