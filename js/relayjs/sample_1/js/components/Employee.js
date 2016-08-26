import React from 'react';
import Relay from 'react-relay';

import RemoveEmployeeMutation from '../mutations/RemoveEmployeeMutation';

class Employee extends React.Component {
  _removeEmployee = () => {
    this.props.relay.commitUpdate(
      new RemoveEmployeeMutation({employee: this.props.employee, viewer: this.props.viewer})
    )
  }

  render() {
    return <div>
      {this.props.employee.name}
      <button onClick={this._removeEmployee}>Remove</button>
    </div>
  }
}

export default Relay.createContainer(Employee, {
  fragments: {
    employee: () => Relay.QL `
      fragment on Employee {
        name,
        ${RemoveEmployeeMutation.getFragment('employee')}
      }
    `,
    viewer: () => Relay.QL `
      fragment on User {
        ${RemoveEmployeeMutation.getFragment('viewer')}
      }
    `
  }
});


