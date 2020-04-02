import React, { Component } from 'react';
import propTypes from 'prop-types'
class Percent extends Component {
  
    render() {
        return (
            <div className="progress active">
  <div className="progress-bar bg-primary progress-bar-striped" role="progressbar" aria-valuenow={20} aria-valuemin={0} aria-valuemax={100} style={{width: `${this.props.percent}%`}}>
   {this.props.percent}% Complete
  </div>
</div>

        );
    }
}
ProgressEvent.propTypes={
    percent:propTypes.number.isRequired

}
export default Percent;