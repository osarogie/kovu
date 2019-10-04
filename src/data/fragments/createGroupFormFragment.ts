import { createFragmentContainer, graphql } from 'react-relay'
import { ReactNode } from 'react'

export const createGroupFormFragment = (Component: ReactNode) =>
  createFragmentContainer(
    Component,
    graphql`
      fragment createGroupFormFragment_group on Group {
        id
        _id
        name
        body
        is_private
      }
    `
  )
