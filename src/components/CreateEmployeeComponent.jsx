import React, { Component } from 'react';
import EmployeeService from '../service/EmployeeService';

class CreateEmployeeComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      emailId: ''
    }
    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
  }

  saveEmployee = (event) => {
    event.preventDefault();
    let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId };
    console.log('employee =>' + JSON.stringify(employee));

    EmployeeService.createEmployee(employee).then(res => {
      this.props.history.push('/employees');
    });
  }

  changeFirstNameHandler = (event) =>{
    this.setState({firstName: event.target.value})
  };

  changeLastNameHandler = (event) =>{
    this.setState({lastName: event.target.value})
  };

  changeEmailHandler = (event) =>{
    this.setState({emailId: event.target.value})
  };

  cancel(){
    this.props.history.push('/employees');
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div>
              <div className="card col-md-6 offset-md-3 offset-md-3 mt-5">
                <h3 className="text-center mt-3">Add Employee</h3>
                <div className="card-body m-3">
                  <form>
                    <div className="form-group mb-3">
                      <label>First Name: </label>
                      <input placeholder="First Name" name="firstName" className="form-control" value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                    </div>
                    <div className="form-group mb-3">
                      <label>Last Name: </label>
                      <input placeholder="Last Name" name="lastName" className="form-control" value={this.state.lastName} onChange={this.changeLastNameHandler} />
                    </div>
                    <div className="form-group mb-3">
                      <label>Email Address: </label>
                      <input placeholder="Email Address" name="emailId" className="form-control" value={this.state.emailId} onChange={this.changeEmailHandler} />
                    </div>

                    <button className="btn btn-success mt-3" onClick={this.saveEmployee}>Save</button>
                    <button className="btn btn-danger mt-3" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateEmployeeComponent;