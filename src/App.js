import React from 'react'
import _ from 'lodash/fp'

import CardView from './CardView'
import extractCards from './extractCards'
import testData from './testData'

class App extends React.Component {
  state = {
    cards: []
  }
  componentWillMount () {
    this.setState(_.set('cards', extractCards(testData)))
  }
  render () {
    return (
      <div>
        <CardView
          cards={this.state.cards}
        />
      </div>
    )
  }
}

export default App
