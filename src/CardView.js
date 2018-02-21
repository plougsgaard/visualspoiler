import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash/fp'
import sizeMe from 'react-sizeme'

const W = 480
const H = 680
const COLOR1 = '#fdfdfd'
const COLOR2 = '#ffff90'

class CardView extends React.PureComponent {
  static propTypes = {
    cards: PropTypes.array.isRequired,
    cardWidthTarget: PropTypes.number,
    showNumberOfCards: PropTypes.bool,
    showNumberOfCardsEvenIfJustOne: PropTypes.bool
  }
  static defaultProps = {
    cardWidthTarget: 250,
    showNumberOfCards: false,
    showNumberOfCardsEvenIfJustOne: false
  }
  render () {
    const rowSize = Math.round(this.props.size.width / this.props.cardWidthTarget)
    return (
      <div className='flow'>
        {_.map.convert({ cap: false })(({ id, count, name }, index) => {
          const rowNumber = index === 0 ? 0 : Math.floor(index / rowSize)
          const evenRow = rowNumber % 2 === 0
          const evenIndex = index % 2 === 0
          const backgroundColor = evenRow
            ? evenIndex ? COLOR1 : COLOR2
            : evenIndex
              ? rowSize % 2 === 0 ? COLOR2 : COLOR1
              : rowSize % 2 === 0 ? COLOR1 : COLOR2
          const showNumberOfCardsLabel = count > 1
            ? this.props.showNumberOfCards
            : this.props.showNumberOfCards && this.props.showNumberOfCardsEvenIfJustOne

          const w = this.props.size.width / rowSize
          const h = H * w / W
          const emblemWidth = Math.round(w / 6)
          return (
            <div
              key={index}
              style={{
                backgroundColor,
                width: w,
                height: h,
                animation: 'fadein 2s'
              }}>
              <div
                style={{ width: w, height: h, position: 'absolute', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                {showNumberOfCardsLabel && (
                  <div style={{
                    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    width: emblemWidth,
                    height: emblemWidth,
                    borderRadius: emblemWidth / 2,
                    backgroundColor: 'hsla(23, 19%, 42%, 0.7)',
                    fontSize: `${Math.round(emblemWidth / 2)}px`,
                    color: 'rgb(192, 189, 186)'
                  }}>
                    {count}
                  </div>
                )}
              </div>
              <img
                className='block'
                width={w}
                height={h}
                src={`https://api.scryfall.com/cards/mtgo/${id}?format=image&version=border_crop`}
                // src={`${10035}.jpg`}
                alt={id}
              />
            </div>
          )
        }, this.props.cards)}
      </div>
    )
  }
}

export default _.compose(
  sizeMe()
)(CardView)
