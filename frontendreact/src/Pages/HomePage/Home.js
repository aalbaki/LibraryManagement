import home from './Home.module.css';
import './Home.css';
import img from '../../Images/book.png';
import search from '../../Images/search.png';
import btn from '../../Images/switch.jpg'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState} from 'react';

// import Logout, {log} from '../../Utilties/logout.js';

function Home()
{

  const [cookie,setcookie]=useState('');
  const logout=()=>{
     document.cookie=`ID=,expires=Thu, 01 Jan 1970 00:00:00 UTC,`;
     setcookie('');
     navigate('/login');
  }
  useEffect(()=>{
    const cookie=document.cookie.split(';')[0].split('=')[1]
    setcookie(cookie);
    if(!cookie)
       logout();
},[]);
   
  const location=useLocation();
  const navigate=useNavigate();
  return(
    <div className='Page'>
        <div className='subpage1'>
            <div className='logo'>
             <h2>Library</h2>
              <img src={img} width='50' height='50'/>
            </div>
            <div className='sectiontop'>
                <h2>Lib</h2>
                <h2 onClick={()=>navigate('/additems')}>Add Items</h2>
                <h2 onClick={()=>navigate('/collection')}>Add Collections</h2>
                <h2>Publish</h2>
                <h2>Dashboard</h2>
            </div>
            <div className='sectiontop'>
                <h2>Settings</h2>
                <h2>Support</h2>
                <h2 onClick={()=>logout()}>Log Out</h2>
                <button>Upgrade</button>
            </div>
            </div>
        <div className='subpage2'>
          <div className='searchbar'>
            <div className='search'>
              <img src={search} width='25px' height='25px'/>
              <input type='text' placeholder='Start Searching'></input>
            </div>
            <div className='logout'>
               <h3>Hi! {location.state.data}</h3>
               <img src={btn} width='50' height='50'/>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Home;