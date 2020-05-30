import React from 'react'
import { View } from 'react-native'
import { createPollFragmentContainer } from '../../fragments/Poll'
import { pluralise } from '../../helpers/pluralize'
import dayjs from 'dayjs'
import { Text, useTheme } from 'react-native-paper'
import { useEnvironment } from '../../providers/SessionProvider'
import { voteMutation } from '../../data/mutations/voteMutation'
import { TouchableOpacity } from 'react-native'
import Colors from 'color'

export function PollView({ discussion, hasViewer, requireViewer }) {
  const {
    poll,
    voting_has_ended,
    hide_votes,
    viewer_owns,
    vote_count,
    poll_closes_at,
    viewer_has_voted,
  } = discussion

  const { colors } = useTheme()

  const environment = useEnvironment()

  if (!poll) return null

  let totalVotes = 0
  if (viewer_owns || !hide_votes) {
    totalVotes = vote_count
  }

  function Choice(props) {
    const {
      choice: { title, vote_count, viewer_selected, _id },
      totalVotes,
      hide_votes,
      viewer_owns,
      voting_has_ended,
      hasViewer,
    } = props

    const width =
      viewer_owns || !hide_votes
        ? ((vote_count / totalVotes) * 100).toFixed(2)
        : 100

    let className = 'choice s__dark__bg bd'
    if (viewer_selected) className = `${className} active`
    if (!viewer_has_voted && !voting_has_ended)
      className = `${className} elevated`

    function countVote() {
      if (totalVotes < 200) return ''
      return vote_count
    }

    function onChoiceClick(option) {
      if (viewer_has_voted || voting_has_ended) return
      // if (voting_has_ended)
      //   return notification.error({
      //     message: 'Sorry',
      //     description: 'Voting had ended',
      //     placement: 'bottomRight'
      //   })

      voteMutation({ option: _id, environment }, requireViewer)
    }

    const perc =
      viewer_owns || !hide_votes ? `${countVote()} (${width}%)` : countVote()

    return (
      <TouchableOpacity
        underlayColor={colors.separator}
        style={[
          {
            paddingHorizontal: 20,
            marginBottom: 10,
            borderRadius: 4,
            position: 'relative',
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: colors.separator,
          },
          viewer_selected && { borderColor: colors.primary },
        ]}
        onPress={() => onChoiceClick(_id)}>
        {(viewer_owns || !hide_votes) && (
          <View
            style={{
              width: `${width}%`,
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              backgroundColor: Colors(colors.primary).alpha(0.2),
            }}
          />
        )}
        <Text style={{ fontSize: 16, paddingVertical: 10 }}>
          {voting_has_ended || viewer_has_voted} {title}{' '}
          {!!vote_count && ` - ${perc}`}
        </Text>
      </TouchableOpacity>
    )
  }

  function pollStatus() {
    if (viewer_has_voted) return 'You have voted'
    if (voting_has_ended) return 'Voting has ended'

    const time = dayjs(poll_closes_at * 1000)
    return `Closes ${time.fromNow()}`
  }

  function voteCount() {
    if (vote_count > 200)
      return `${vote_count} ${pluralise('vote', vote_count)} / `
    return ''
  }

  return (
    <View style={{ marginTop: 20 }}>
      {poll.edges.map(p => (
        <Choice
          hasViewer={hasViewer}
          key={p.node.id}
          voting_has_ended={voting_has_ended}
          choice={p.node}
          hide_votes={hide_votes}
          viewer_owns={viewer_owns}
          totalVotes={totalVotes}
        />
      ))}
      <Text>
        {voteCount()}
        {pollStatus()}
      </Text>
    </View>
  )
}

PollView = createPollFragmentContainer(PollView)
