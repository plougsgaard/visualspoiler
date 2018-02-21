import _ from 'lodash/fp'

const regex = /.*CatID="(\d+)".*Quantity="(\d+)".*Name="(.+)".*/i

const extractCards = _.flow(
  _.split('\n'),
  _.filter(_.includes('Cards')),
  _.map(line => {
    const [everything, id, count, name] = regex.exec(line)
    return { id, count, name }
  })
)

export default extractCards
