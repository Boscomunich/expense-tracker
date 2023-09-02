import './Display.css'
import {FaShoppingBag, FaCarAlt, FaChild, FaGlobe} from 'react-icons/fa'
import {GiHealthNormal, GiFamilyHouse, GiMoneyStack} from 'react-icons/gi'
import {AiOutlineInsurance, AiFillMessage, AiFillDelete} from 'react-icons/ai'
import {BsFillCalendarDateFill, BsFillCalendarMonthFill, BsFillPersonFill} from 'react-icons/bs'

const ExpenseDisplay = ({items, deleteExpense}) => {

    //this component is for the expense tab in the expense.jsx

    const { _id, title, amount, category, description, createdAt } = items

    return (
        <>
            <div className="display-container">
                <div className="display-icon">
                    {category ==='Groccries'?
                    <FaShoppingBag className="react-icons"/>
                    :category === 'Car Payment'?
                    <FaCarAlt className="react-icons"/>
                    :category === 'Healthcare' ?
                    <GiHealthNormal className="react-icons"/>
                    :category === 'Rent' ?
                    <GiFamilyHouse className="react-icons"/>
                    :category === 'Child Warefare' ?
                    <FaChild className="react-icons"/>
                    :category === 'Insurance' ?
                    <AiOutlineInsurance className="react-icons"/>
                    :category === 'Savings/Investment' ?
                    <GiMoneyStack className="react-icons"/>
                    :category === 'Utilities' ?
                    <BsFillCalendarMonthFill className="react-icons"/>
                    :category === 'Personal Expense'?
                    <BsFillPersonFill className="react-icons"/>
                    :<FaGlobe className="react-icons"/>
                    }</div>
                <div className="info-container">
                    <div className="info-name">{title}</div>
                    <div className="otherinfo-container">
                        <div className="info">${amount}</div>
                        <div className="info"><BsFillCalendarDateFill/>{createdAt.slice(0,10)}</div>
                        <div className="info"><AiFillMessage/>{description}</div>
                    </div>
                </div>
                <button className="display-delete" onClick={() => deleteExpense(_id)}><AiFillDelete className="react-icons"/></button>
            </div>
        </>
    );
};
export default ExpenseDisplay;