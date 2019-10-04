import { createPollFragmentContainer } from '../../fragments/Poll'
import { pluralise } from 'helpers/pluralize'
import moment from 'moment'
import { Text } from 'react-native'
import { useEnvironment } from '../../providers/ViewerProvider'
import { voteMutation } from '../../data/mutations/voteMutation'

export function PollView({ discussion, hasViewer, requireViewer }) {
  const {
    poll,
    voting_has_ended,
    hide_votes,
    viewer_owns,
    vote_count,
    poll_closes_at,
    viewer_has_voted
  } = discussion

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
      hasViewer
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
      if (viewer_has_voted) return
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
      <View onPress={() => onChoiceClick(_id)}>
        {(viewer_owns || !hide_votes) && (
          <View style={{ width: `${width}%` }} />
        )}
        <Text className="vote-text">
          {voting_has_ended || viewer_has_voted} {title}{' '}
          {!!vote_count && ` - ${perc}`}
        </Text>
      </View>
    )
  }

  function pollStatus() {
    if (viewer_has_voted) return 'You have voted'
    if (voting_has_ended) return 'Voting has ended'

    const time = moment(poll_closes_at * 1000)
    return `Closes ${time.fromNow()}`
  }

  function voteCount() {
    if (vote_count > 200)
      return `${vote_count} ${pluralise('vote', vote_count)} / `
    return ''
  }

  return (
    <View>
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
