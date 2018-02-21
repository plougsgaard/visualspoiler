import React from 'react'
import _ from 'lodash/fp'
import Reboot from 'material-ui/Reboot'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import UploadButton from './UploadButton'
import CardView from './CardView'
import extractCards from './extractCards'

class App extends React.Component {
  state = {
    show: true,
    step: 5,
    cards: []
  }
  componentDidMount () {

  }
  render () {
    return (
      <div>
        <Reboot />
        <CardView
          cards={this.state.cards}
          cardWidthTarget={50 * this.state.step}
        />
        {this.state.show && (
          <Card style={{ position: 'absolute', top: '2em', left: '2em' }}>
            {!_.isEmpty(this.state.cards) && (
              <CardContent>
                <Typography variant='headline' component='h2' style={{ marginBottom: '1em' }}>
                  Card size
                </Typography>
                <Slider
                  value={this.state.step}
                  onChange={step => this.setState(_.set('step', step))}
                  min={2}
                  max={15}
                  step={1} />
              </CardContent>
            )}
            <CardActions>
              <Button size='small' color='secondary' onClick={e => this.setState(_.set('show', false))}>Begone!</Button>
              <UploadButton
                buttonProps={{ size: 'small', color: 'primary' }}
                onFileSelected={deck => this.setState(_.set('cards', extractCards(deck)))}>
                Upload deck
              </UploadButton>
            </CardActions>
          </Card>
        )}
      </div>
    )
  }
}

export default App
