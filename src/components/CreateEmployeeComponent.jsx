import React, { Component } from 'react';
import EmployeeService from '../service/EmployeeService';

class CreateEmployeeComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      //step2
      id: this.props.match.params.id,
      firstName: '',
      lastName: '',
      emailId: ''
    }
    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
  }

  //step 3
  componentDidMount(){

    //step 4

    if(this.state.id === '_add'){
      return
    } else{
      EmployeeService.getEmployeeById(this.state.id).then((res) => {
        let employee = res.data;
        this.setState({firstName: employee.firstName, lastName: employee.lastName, emailId: employee.emailId});
      });
    };
  }

  saveOrUpdateEmployee = (event) => {
    event.preventDefault();
    let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId };
    console.log('employee =>' + JSON.stringify(employee));

    //step 5
    if(this.state.id === '_add'){
      EmployeeService.createEmployee(employee).then(res => {
        this.props.history.push('/employees');
      });
    } else{
      EmployeeService.updateEmployee(employee, this.state.id).then(res => {
        this.props.history.push('/employees');
      })
    }
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

  getTitle(){
    if(this.state.id === '_add'){
      return <h3 className="text-center mt-3">Add Employee</h3>
    } else {
      return <h3 className="text-center mt-3">Update Employee</h3>
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div>
              <div className="card col-md-6 offset-md-3 offset-md-3 mt-5">
                {
                  this.getTitle()
                }
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

                    <button className="btn btn-success mt-3" onClick={this.saveOrUpdateEmployee}>Save</button>
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