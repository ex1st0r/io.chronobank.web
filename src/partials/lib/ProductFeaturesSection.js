import React from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'

import styles from './ProductFeaturesSection.sass'

const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 }
}

export default class ProductFeaturesSection extends React.Component {

  static propTypes = {
    features: PropTypes.array.isRequired,
    interval: PropTypes.number
  }

  static defaultProps = {
    interval: 5000
  }

  constructor (props) {
    super(props)
    this.state = {
      active: 0
    }
  }

  componentDidMount () {
    if (this.props.features.length) {
      this.interval = setInterval(() => {
        this.setState({
          active: (this.state.active + 1) % this.props.features.length
        })
      }, this.props.interval)
    }
  }

  componentWillUnmount () {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  render () {
    const { features } = this.props
    const activeFeature = features[this.state.active]
    return (
      <div className='root product-features-section'>
        <style jsx>{styles}</style>
        <div className='wrap'>
          <div className='heading'>
            <h3>Key features</h3>
          </div>
          <div className='content'>
            <div className='left'>
              <ul>
                {features.map((feature, index) => (
                  <li key={feature._id} className={(index === this.state.active) ? 'active' : null}
                    onClick={() => this.handleSelect(index)}
                  >
                    <a>{feature.title}</a>
                    <div className='inline'>
                      <img {...{
                        src: activeFeature.image ? `${activeFeature.image.secure_url}` : undefined,
                        srcSet: activeFeature.image2x ? `${activeFeature.image2x.secure_url} 2x` : undefined
                      }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className='main'>
              <div className='image'>
                <Transition in={true} key={activeFeature._id} timeout={300} appear={true}>
                  {(state) => (
                    <img style={transitionStyles[state]} {...{
                      src: activeFeature.image ? `${activeFeature.image.secure_url}` : undefined,
                      srcSet: activeFeature.image2x ? `${activeFeature.image2x.secure_url} 2x` : undefined
                    }} />
                  )}
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleSelect (index) {
    if (index < this.props.features.length) {
      this.setState({
        active: index
      })
      if (this.interval) {
        clearInterval(this.interval)
      }
      this.interval = setInterval(() => {
        this.setState({
          active: (this.state.active + 1) % this.props.features.length
        })
      }, this.props.interval)
    }
  }
}