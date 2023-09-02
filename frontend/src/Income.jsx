import './Income.css'
import {useState} from 'react'
import Display from './Display'



const Income = (props) => {
    const {token} = props

    const[title, settitle] = useState('')
    const[amount, setamount] = useState('')
    const[category, setcategory] = useState('')
    const[description, setdescription] = useState('')
    const [response, setresponse] = useState('')

    const deleteIncome = (id) => {
        try { 
        fetch(`http://localhost:5000/api/v1/income/${id}`,{
            method: 'delete',
            headers:{'content-type': 'application/json',
            'authorization': `Bearer ${token}`},
        })
        .then(response => response.json())
        .then(response => setresponse(response))
        props.getIncome()
        } catch (error) {
            console.log(error)
        }
    }

    async function addIncome () {
        try {
        const res = await 
        fetch('http://localhost:5000/api/v1/income',{
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
        props.getIncome()
        } catch (error) {
            setresponse('unknown error occured')
        }
    }

    return (
        <div style={{display: 'block'}}>
            <div className="income-header">
                ${props.totalincome}
            </div>
            <label className='response'>{response}</label>
            <div className='overall-container'>
                <div className='income-input-container'>
                        <input className='income-input'
                        type='text'
                        name='title'
                        placeholder='Title'
                        onChange={(event) => {settitle(event.target.value)}} />

                        <input className='income-input'
                        type='number'
                        name='amount'
                        placeholder='Amount'
                        onChange={(event) => {setamount(event.target.value)}}/>

                        <input className='income-input'
                        type='select'
                        name='category'
                        placeholder='Select Category'
                        list='category'
                        onChange={(event) => {setcategory(event.target.value)}}
                        />
                        <datalist id='category'>
                                <option value='You Tube'></option>
                                <option value='Shopify'></option>
                                <option value='Crypto'></option>
                                <option value='Bank Transfer'></option>
                                <option value='Salary'></option>
                                <option value='Trade'></option>
                                <option value='Stocks'></option>
                                <option value='Others'></option>
                        </datalist>

                        <input className='reference'
                        type='text'
                        name='description'
                        placeholder='Add Description'
                        onChange={(event) => {setdescription(event.target.value)}}/>

                        <input className='income-btn'
                        type='submit'
                        value='Add Income'
                        onClick={addIncome}/>
                </div>
                <div className='income-display'>
                    {props.income.map((items) => 
                        <Display key={items._id} items={items} deleteIncome={deleteIncome}/>
                    )
                    } 
                </div>      
            </div>
        </div>
    );
};

export default Income;