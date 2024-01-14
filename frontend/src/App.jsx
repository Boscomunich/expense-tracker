import { Component } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import Dashboard from './Dashboard';
import Income from './Income'
import Expense from './Expense';
import Register from './Register';
import Login from './Login';
import Protected from './Protectected';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      id: '',
      token:'',
      route:'',
      totalincome:'',
      totalexpense:'',
      expense:[],
      income:[],
      balance:''
    }
  }

  loadUser = (data) => {
    this.setState({
      username: data.username,
      id: data.id,
      token: data.token
    })
  }
  routeChange = (route) => {
    this.setState({route: route})
  }

  getExpense = () => {
  fetch('https://transaction-api-3caf.onrender.com/api/v2/expense',{
            method: 'get',
            headers:{'content-type': 'application/json',
            'authorization': `Bearer ${this.state.token}`}
            })
            .then(response => response.json())
            .then(response => this.setState({expense:response}))
          }
  getIncome = () => {
    fetch('https://transaction-api-3caf.onrender.com/api/v1/income',{
            method: 'get',
            headers:{'content-type': 'application/json',
            'authorization': `Bearer ${this.state.token}`}
            })
            .then(response => response.json())
            .then(response => this.setState({income:response}))
  }
  getTotalIncome = () => {
    let totalIncome = 
    this.state.income.reduce((total,income) => total + income.amount, 0)
    this.setState({totalincome:totalIncome})
  }
  getTotalExpense = () => {
    let totalExpense = 
    this.state.expense.reduce((total,expense) => total + expense.amount, 0)
    this.setState({totalexpense:totalExpense})
  }
  //update ui with the latest data
  componentDidUpdate(prevProps, prevState){
    if(prevState.route !== this.state.route || prevState.expense.length !== this.state.expense.length || prevState.income.length !== this.state.income.length){
    this.getIncome();
    this.getExpense();
    this.getTotalIncome();
    this.getTotalExpense();
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route element={<Protected route={this.state.route}/>}>
            <Route path='/' element={<Home routeChange={this.routeChange} username={this.state.username}/>}>
              <Route index element={<Dashboard totalincome={this.state.totalincome} totalexpense={this.state.totalexpense} expense={this.state.expense} income={this.state.income} routeChange={this.routeChange}/>}/>
              <Route path='/income' element={<Income token={this.state.token} totalincome={this.state.totalincome} income={this.state.income} getIncome={this.getIncome}/>}/>
              <Route path='/expense' element={<Expense token={this.state.token} totalexpense={this.state.totalexpense} expense={this.state.expense} getExpense={this.getExpense}/>}/>
            </Route>
          </Route>
            <Route path='/login' element={<Login loadUser={this.loadUser} routeChange={this.routeChange}/>}/>
            <Route path='/register' element={<Register loadUser={this.loadUser} routeChange={this.routeChange}/>}/>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
