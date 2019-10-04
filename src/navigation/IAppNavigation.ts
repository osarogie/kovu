import { IIdentifier } from '../contracts/IIdentifier'
import { IGroupFormParams } from './IGroupFormParams'
import { IUser } from '../contracts/IUser'
import { IDiscussion } from '../contracts/IDiscussion'
import { IGroup } from '../contracts/IGroup'
import { IDiscussionFormParams } from './IDiscussionFormParams'

export interface IAppNavigation {
  goBack(routeKey?: string | null | undefined): boolean
  openDiscussionForm(params?: Partial<IDiscussionFormParams>): boolean
  openViewerProfile(): boolean
  openProfile(id: IIdentifier, user?: IUser): boolean
  openLogin(): boolean
  openGroup(id: IIdentifier, group?: IGroup): boolean
  openDiscussion(id: IIdentifier, discussion: IDiscussion): boolean
  openComments(discussionID: IIdentifier, discussion: IDiscussion): boolean
  openSearch(): boolean
  openProfileForm(): boolean
  openChangePassword(): boolean
  openGroupForm(params?: Partial<IGroupFormParams>): boolean
  openProfilePicture(picture_name: string): boolean
}
