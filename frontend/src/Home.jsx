import { Outlet, NavLink } from "react-router-dom";
import './Home.css'
import {AiFillAppstore} from 'react-icons/ai';
import {AiFillLayout} from 'react-icons/ai'
import {AiOutlineCreditCard} from 'react-icons/ai'
import {AiOutlineLogout} from 'react-icons/ai'
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useState, } from 'react';

const Home = (props) => {
    //contains the navigation component in the home page
     const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
    setIsOpen(!isOpen);
    };


    return (
        <>  <div className="floating-button">
            <button onClick={handleClick}>
            {isOpen ? <FaMinus className='react-icons' /> : <FaPlus className='react-icons' />}
            </button>
            {isOpen && (
            <div className="content">
                <NavLink to='/' style={{textDecoration: 'none'}}><div>Dashboard</div></NavLink>
                <NavLink to='/income' style={{textDecoration: 'none'}}><div>Income</div></NavLink>
                <NavLink to='/expense' style={{textDecoration: 'none'}}><div>Expense</div></NavLink>
                <div
                onClick={()=>{props.routeChange('')}}>Logout</div>
            </div>
            )}
        </div>
            <div className="home">
                <div className="dashboard-container">
                    <div className="dashboard">
                        <AiFillAppstore className="react-icons"/>
                        <h1 style={{backgroundColor:' whitesmoke'}}>{props.username}</h1>
                    </div><br/>
                    <div className="dashboard">
                        <AiFillLayout className="react-icons"/>
                        <NavLink to='.'><h2 style={{backgroundColor:' whitesmoke'}}>Dashboard</h2></NavLink>
                    </div>
                    <div className="dashboard">
                        <img src="/assets/income.png" style={{height:'20px', width:'20px'}}/>
                        <NavLink to='/income'><h2 style={{backgroundColor:' whitesmoke'}}>Income</h2></NavLink>
                    </div>
                    <div className="dashboard">
                        <AiOutlineCreditCard className='react-icons'/>
                        <NavLink to='expense'><h2 style={{backgroundColor:' whitesmoke'}}>Expenses</h2></NavLink>
                    </div>
                    <button className="sign-out" onClick={()=>{props.routeChange('')}}>
                        <AiOutlineLogout className="react-icons"/>
                        <p style={{backgroundColor:' whitesmoke'}}>Sign Out</p>
                    </button>
                </div>
                <Outlet/>
            </div>
        </>
    );
};

export default Home;