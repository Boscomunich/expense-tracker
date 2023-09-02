import { Outlet, NavLink } from "react-router-dom";
import './Home.css'
import {AiFillAppstore} from 'react-icons/ai';
import {AiFillLayout} from 'react-icons/ai'
import {AiOutlineCreditCard} from 'react-icons/ai'
import {AiOutlineLogout} from 'react-icons/ai'

const Home = (props) => {
    //contains the navigation component in the home page

    return (
        <>
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