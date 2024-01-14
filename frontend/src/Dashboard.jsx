import './Dashboard.css'
import { useState, useEffect } from 'react';
import { LineChart, Line, Tooltip, CartesianGrid, YAxis, XAxis, Legend, ResponsiveContainer } from 'recharts';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Dashboard = ({totalincome, totalexpense, expense, income, routeChange}) => {
    //app state
    const[balance, setbalance] = useState('')
    const[recent, setrecent] = useState([])
    const[changeChart, setchangeChart] = useState('income')
    const [isOpen, setIsOpen] = useState(false);

    //combine income and expense array to get the latest data to update recent history in the ui
    const recentHistory = () => {
        const history = expense.concat(income)
        const sorted = history.sort((a,b)=>
        new Date(b.createdAt) -  new Date(a.createdAt)).slice(0,3)
        setrecent(sorted)
    }
    //subtracts total income from total expense
    const calculateBalance = () => {
        let balance = totalincome - totalexpense
        setbalance(balance)
    }

    useEffect(() => {
        calculateBalance()
        recentHistory()
    }, [expense, income])

    const minIncome = Math.min(...income.map(item => item?.amount ))
    const maxIncome = Math.max(...income.map(item => item?.amount ))

    const minExpense = Math.min(...expense.map(item => item?.amount ))
    const maxExpense = Math.max(...expense.map(item => item?.amount ))
        
    const handleClick = () => {
    setIsOpen(!isOpen);
    };

    return (
        <>
        <div className="floating-button">
            <button onClick={handleClick}>
            {isOpen ? <FaMinus className='react-icons' /> : <FaPlus className='react-icons' />}
            </button>
            {isOpen && (
            <div className="content">
                <NavLink to='/' style={{textDecoration: 'none'}}><div>Dashboard</div></NavLink>
                <NavLink to='/income' style={{textDecoration: 'none'}}><div>Income</div></NavLink>
                <NavLink to='/expense' style={{textDecoration: 'none'}}><div>Expense</div></NavLink>
                <div
                onClick={()=>routeChange('')}>Logout</div>
            </div>
            )} 
        </div>
            <div className='main-container'>
                <div className="dashboard-main-div">
                    {/*changes graph between income graph and expense graph*/}
                    <button onClick={()=>{
                        if (changeChart === 'expense'){
                            setchangeChart('income')}
                            else{
                                setchangeChart('expense')
                            }
                        }
                    } style={{backgroundColor: changeChart === 'income' ? 'green' : 'red'}}>switch</button>
                    <div className='all-transaction' >{
                        changeChart === 'income' ?
                        <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={500}
                            height={300}
                            data={income}
                            margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                            }}
                            >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="createdAt" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                    :
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={500}
                            height={300}
                            data={expense}
                            margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                            }}
                            >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="createdAt" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                    }</div>
                    <div className="revenue">
                        <div>
                            Total Income
                            <br/>
                            <br/>
                            <label className='income-header'>{`$${totalincome}`}</label>
                        </div>
                        <div>
                            Total Expenses
                            <br/>
                            <br/>
                            <label className='income-header' style={{color:'red'}}>{`$${totalexpense}`}</label>
                        </div>
                    </div>
                    <div className='balance'>
                        Total Balance
                        <br/>
                        <br/>
                        {balance >= 0 ?
                        <label className='income-header'>{`$${balance}`}</label>
                        :<label className='income-header' style={{color:'red'}}>{`$${balance}`}</label>}
                    </div>
                </div>
                <div className='history'>
                    <label>Recent History</label>
                    <div>{
                        recent.map((recent) =>
                        <div className='recent-history' key={recent._id}>
                        <div>{recent.description}</div>
                        <div style={{color: recent.type === 'expense' ? 'red' : 'green'}}>{recent.amount}</div>
                        </div>
                        )
                    }</div>
                    <br/>
                    <label>Salary</label>
                    <div className='min-max'>
                        <div>
                            <label>Min Income</label><br/>
                            <div style={{color:'green'}}>{minIncome == Infinity? 0 : minIncome}</div>
                        </div>
                        <div>
                            <label>Max Income</label><br/>
                            <div style={{color:'green'}}>{maxIncome == -Infinity? 0 : maxIncome}</div>
                        </div>
                    </div>
                    <label>Expense</label>
                    <div className='min-max'>
                        <div>
                            <label>Min Expense</label><br/>
                            <div style={{color:'red'}}>{minExpense == Infinity? 0 : minExpense}</div>
                        </div>
                        <div>
                            <label>Max Expense</label><br/>
                            <div style={{color:'red'}}>{maxExpense == -Infinity? 0 : maxExpense}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;