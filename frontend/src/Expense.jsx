import './Income.css'
import {useState} from 'react'
import ExpenseDisplay from './ExpenseDisplay'



const Expense = (props) => {
    const {token} = props

    const[title, settitle] = useState('')
    const[amount, setamount] = useState('')
    const[category, setcategory] = useState('')
    const[description, setdescription] = useState('')
    const [response, setresponse] = useState('')

    const deleteExpense = (id) => {
        try { 
        fetch(`http://localhost:5000/api/v2/expense/${id}`,{
            method: 'delete',
            headers:{'content-type': 'application/json',
            'authorization': `Bearer ${token}`},
        })
        .then(response => response.json())
        .then(response => setresponse(response))
        props.getExpense()
        } catch (error) {
            console.log(error)
        }
    }

    async function addExpense () {
        try {
        const res = await 
        fetch('http://localhost:5000/api/v2/expense',{
            method: 'post',
            headers:{'content-type': 'application/json',
            'authorization': `Bearer ${token}`},
            body: JSON.stringify({
            title: title,
            amount: amount,
            category: category,
            description: description})
        })
        const response = await res.json()
        setresponse(response)
        props.getExpense()
        } catch (error) {
            setresponse('unknown error occured')
        }
    }

    return (
        <div style={{display: 'block'}} className='income-container'>
            <div className="income-header" style={{color:'red'}}>
                ${props.totalexpense}
            </div>
            <label className='expense-response'>{response}</label>
            <div className='overall-container'>
                <div className='income-input-container'>
                        <input className='income-input'
                        type='text'
                        name='title'
                        placeholder='Title'
                        onChange={(event) => {settitle(event.target.value)}}
                        />

                        <input className='income-input'
                        type='number'
                        name='amount'
                        placeholder='Amount'
                        onChange={(event) => {setamount(event.target.value)}}
                        />

                        <input className='income-input'
                        type='select'
                        name='category'
                        placeholder='Select Category'
                        list='category'
                        onChange={(event) => {setcategory(event.target.value)}}
                        />
                        <datalist id='category'>
                                <option value='Groccries'></option>
                                <option value='Car Payment'></option>
                                <option value='Healthcare'></option>
                                <option value='Rent'></option>
                                <option value='Child Warefare'></option>
                                <option value='Insurance'></option>
                                <option value='Savings/Investment'></option>
                                <option value='Utilities'></option>
                                <option value='Personal Expense'></option>
                                <option value='Others'></option>
                        </datalist>

                        <input className='reference'
                        type='text'
                        name='description'
                        placeholder='Add Description'
                        onChange={(event) => {setdescription(event.target.value)}}
                        />

                        <input className='expense-btn'
                        type='submit'
                        value='Add Expense'
                        onClick={addExpense}
                        />
                </div>
                <div className='income-display'>
                    {props.expense.map((items) => 
                        <ExpenseDisplay key={items._id} items={items} deleteExpense={deleteExpense}/>
                    )
                    } 
                </div>      
            </div>
        </div>
    );
};



export default Expense;