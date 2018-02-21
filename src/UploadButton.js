import React from 'react'
import _ from 'lodash/fp'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'

const handleUpload = (onFileSelected) => (fileEvent) => {
  const reader = new window.FileReader()
  reader.onloadend = (loadEvent) => onFileSelected(loadEvent.target.result)
  reader.readAsText(_.first(fileEvent.target.files))
}

export default class Upload extends React.PureComponent {
  static propTypes = {
    onFileSelected: PropTypes.func.isRequired,
    children: PropTypes.node,
    buttonProps: PropTypes.object
  }
  static defaultProps = {
    children: 'Upload',
    buttonProps: {}
  }
  render () {
    return (
      <div>
        <input
          style={{ display: 'none' }}
          id='upload'
          type='file'
          onChange={handleUpload(this.props.onFileSelected)}
        />
        <label htmlFor='upload'>
          <Button component='span' {...this.props.buttonProps}>
            {this.props.children}
          </Button>
        </label>
      </div>
    )
  }
}
