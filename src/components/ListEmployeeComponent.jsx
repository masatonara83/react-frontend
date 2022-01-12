import React, { Component } from 'react';
import EmployeeService from '../service/EmployeeService';

class ListEmployeeComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      employees : []
    }
    this.addEmployee = this.addEmployee.bind(this);
    this.editEmployee = this.editEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }

  deleteEmployee(id){
    EmployeeService.deleteEmployee(id).then( res => {
      this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
    });
  }

  viewEmployee(id){
    this.props.history.push(`/view-employee/${id}`);
  }

  editEmployee(id){
    this.props.history.push(`/add-employee/${id}`)
  }

  componentDidMount(){
    EmployeeService.getEmployees().then((res) => {
      this.setState({ employees : res.data})
    })
  }

  addEmployee(){
    this.props.history.push('/add-employee/_add');
  }

  render() {
    return (
      <div>
        <h2 className="text-center mt-3">Employees List</h2>
        <div className="row">
          <button style={{marginBottom: '10px', width: '180px'}} className="btn btn-primary" onClick={this.addEmployee}>従業員の追加</button>
        </div>
        <div className="row">
          <table className="table table-warning table-striped table-bordered">
            <thead>
              <tr>
                <th>Employee First Name</th>
                <th>Employee List Name</th>
                <th>Employee Email Id</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {
                this.state.employees.map(
                  employee =>
                  <tr key = {employee.id}>
                    <td> { employee.firstName} </td>
                    <td> { employee.lastName} </td>
                    <td> { employee.emailId} </td>
                    <td>
                      <button style={{color: 'white'}} onClick= {() => this.editEmployee(employee.id)} className="btn btn-info">update</button>
                      <button style={{marginLeft: "10px", color: 'white'}} onClick= {() => this.deleteEmployee(employee.id)} className="btn btn-danger">delete</button>
                      <button style={{marginLeft: "10px", color: 'white'}} onClick= {() => this.viewEmployee(employee.id)} className="btn btn-info">view</button>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListEmployeeComponent;