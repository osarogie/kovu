import { IIdentifier } from '../contracts/IIdentifier'
import { NavigationParams } from 'react-navigation'
import { IGroup } from '../contracts/IGroup'

export interface IGroupFormParams extends NavigationParams {
  id: IIdentifier
  editing_mode: boolean
  group: IGroup
}
