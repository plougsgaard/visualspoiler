import React from 'react'
import _ from 'lodash/fp'
import Reboot from 'material-ui/Reboot'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import { FormGroup, FormControlLabel } from 'material-ui/Form'
import Switch from 'material-ui/Switch'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import UploadButton from './UploadButton'
import CardView from './CardView'
import extractCards from './extractCards'

class App extends React.Component {
  state = {
    show: true,
    showNumberOfCards: true,
    showNumberOfCardsEvenIfJustOne: false,
    step: 5,
    cards: []
  }
  componentDidMount () {

  }
  render () {
    return (
      <div className={_.isEmpty(this.state.cards) ? 'cover-page' : ''}>
        <Reboot />
        <CardView
          cards={this.state.cards}
          cardWidthTarget={50 * this.state.step}
          showNumberOfCards={this.state.showNumberOfCards}
          showNumberOfCardsEvenIfJustOne={this.state.showNumberOfCardsEvenIfJustOne}
        />
        {this.state.show && (
          <Card style={{ position: 'absolute', top: '2em', left: '2em' }}>
            {!_.isEmpty(this.state.cards) && (
              <CardContent>
                <p>Size</p>

                <Slider
                  style={{ margin: '1em 0 1.5em 0' }}
                  value={this.state.step}
                  onChange={step => this.setState(_.set('step', step))}
                  min={2}
                  max={15}
                  step={1} />

                <p>Options</p>

                <FormGroup column>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.showNumberOfCards}
                        onChange={e => this.setState(_.set('showNumberOfCards', e.target.checked))}
                        value='showNumberOfCards'
                      />
                    }
                    label='Show number of cards'
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.showNumberOfCardsEvenIfJustOne}
                        onChange={e => this.setState(_.set('showNumberOfCardsEvenIfJustOne', e.target.checked))}
                        value='showNumberOfCardsEvenIfJustOne'
                      />
                    }
                    label='Even just one'
                  />
                </FormGroup>
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
