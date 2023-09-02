import './Display.css'
import {AiFillDelete, AiFillMessage, AiOutlineBarChart,AiFillBank} from 'react-icons/ai'
import {BsYoutube, BsFillCalendarDateFill,BsPersonWorkspace,BsFillHddNetworkFill} from 'react-icons/bs'
import {FaShopify, FaBitcoin, FaGlobe} from 'react-icons/fa'

const Display = ({items, deleteIncome}) => {
    //this component is for income tab in Income.jsx file

    const { _id, title, amount, category, description, createdAt } = items

    return (
        <>
            <div className="display-container">
                <div className="display-icon">
                    {category ==='You Tube'?
                    <BsYoutube className="react-icons"/>
                    :category === 'Shopify'?
                    <FaShopify className="react-icons"/>
                    :category === 'Crypto' ?
                    <FaBitcoin className="react-icons"/>
                    :category === 'Salary' ?
                    <BsPersonWorkspace className="react-icons"/>
                    :category === 'Bank Transfer' ?
                    <AiFillBank className="react-icons"/>
                    :category === 'Trade' ?
                    <AiOutlineBarChart className="react-icons"/>
                    :category === 'Stocks' ?
                    <BsFillHddNetworkFill className="react-icons"/>
                    :category === 'Others' ?
                    <FaGlobe className="react-icons"/>
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
                <button className="display-delete" onClick={() => deleteIncome(_id)}><AiFillDelete className="react-icons"/></button>
            </div>
        </>
    );
};

export default Display;