import collection from './Collection.module.css';
import './Collection.css';
import img from '../../Images/book.png';
import search from '../../Images/search.png';
import btn from '../../Images/switch.jpg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const render_url='https://library-management-hoi8.onrender.com'

const url=`${render_url}/collection/`;
function Collection()
{
  const [message,setmessage]=useState('');
  const [collectionName,setCollectionName]=useState({collectionname:'',language:'Arabic'});
  const updateCollection=()=>{
    fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(collectionName)})
    .then(e=>e.json())
    .then(e=>alert(e));
  }
  const navigate=useNavigate();
  
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
              <h1>Add Your Collection</h1>
            </div>
            <div className='logout'>
               <h3>username</h3>
               <img src={btn} width='50' height='50'/>
            </div>
          </div>
          <hr/>
        <div className='collectionform'>
            <div className='bar1'>
                <h2>Collection Title</h2>
                <input type='text' placeholder='Collection Title' onChange={(e)=>setCollectionName({...collectionName,collectionname:e.target.value})}/>
                <h4>Limit 40 characters. e.g. (My Books, Movie Wishlist, Console Games, Family CD Collection).</h4>
            </div>
            <div className='bar2'>
                <h2>Language</h2>
                <select onChange={(e)=>setCollectionName({...collectionName,language:e.target.value})}>
                    <option>Arabic</option>
                    <option>Bengali</option>
                    <option>Dutch</option>
                    <option>English</option>
                    <option>Hindi</option>
                </select>
                <h4>The display language of the items in this collection. Determines how best to sort alphabetically.</h4>
            </div>
            <button onClick={()=>updateCollection()}>Add Collection</button>
        </div>
        </div>
    </div>
  );
}

export default Collection;
