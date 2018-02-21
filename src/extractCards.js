import _ from 'lodash/fp'

const regex = /.*CatID="(\d+)".*Quantity="(\d+)".*Name="(.+)".*/i

const extractCards = _.flow(
  _.split('\n'),
  _.filter(_.includes('Cards')),
  _.map(line => {
    const match = regex.exec(line)
    return { id: _.get(1, match), count: _.get(2, match), name: _.get(3, match) }
  })
)

export default extractCards
