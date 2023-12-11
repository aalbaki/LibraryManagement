import ItemPage from './ItemPage.module.css';
import './ItemPage.css';
import img from '../../Images/book.png';
import search from '../../Images/search.png';
import btn from '../../Images/switch.jpg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const render_url='https://librarymanagementfrontend-jpz0.onrender.com'

const api_key='AIzaSyAA5BNl9WcPT7OZiyktXKTZI1lWPwjcbsY';
const url=`${render_url}/collection/find`;

function Item()
{
  const [searchTerm,setSearchTerm]=useState('');
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${api_key}`;

  const [book,setbooks]=useState([]);
  const [genre,setgenre]=useState('General');
  
  const [cartItem,setItemCart]=useState([]);
 
  const setItemsCart=async (newbook)=>{
      setItemCart(!cartItem.includes(newbook)?[...cartItem,newbook]:cartItem) 
       console.log(cartItem);
  }
  const books=()=>{
    fetch(apiUrl,{method:'GET'}).then(e=>e.json()).then(e=>{
      if(e.error) {setSearchTerm('')} else {setbooks(e.items)};
    }).catch(e=>console.log(e));
  }
  const selectGenre=(genre)=>{
    genre=genre.toLowerCase();
    if(book!=null)
    {
      console.log(genre);
     const bookCategory=book.filter(b=>b.volumeInfo.categories?.toString().toLowerCase()?.includes(genre)||
       b.volumeInfo?.description?.toString().toLowerCase().includes(genre) || 
       b.volumeInfo?.title?.toString().toLowerCase().includes(genre))
     ;
      setbooks(bookCategory);
    }
  }
  const navigate=useNavigate();
  
  const [collectionname,setcollection]=useState([]);

  useEffect(()=>{
    findCollections();
  },[collectionname,cartItem]);

  const findCollections=async ()=>{
     await fetch(url,{method:'Get',headers:{'Content-Type':'application/json'}}).then(e=>e.json())
     .then(e=>{setcollection(e);});
  }

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
                <h2>Selection Collection</h2>
                <select>
                   {
                   collectionname.map((e,index)=>(
                    <option key={index}>{e}</option>
                   )
                  )}
                </select>
                <h4>Choose the collection you're adding items to.</h4>
            </div>
            <div className='bar2'>
                <h2>Selection Item Type</h2>
                <select onChange={(e)=>setgenre(e.target.value)}>
                   <option>General</option>
                   <option>Fiction</option>
                   <option>Romance</option>
                   <option>Fantasy</option>
                   <option>Science</option>
                   <option>Drama</option>
                   <option>Poetry</option>
                   <option>Mystery</option>
                </select>
                <h4>The type of item are you adding.</h4>
            </div>
            <div className='bar3'>
                <h2>Search for Books </h2>
                <input type='text' placeholder='Search' onChange={(e)=>setSearchTerm(e.target.value)}/>
                <h4>Search by ISBN or keyword. ISBN search will auto-add an item.</h4>
                <button onClick={()=>{books();selectGenre(genre)}}>Search</button>
            </div>

        
            {searchTerm!=null &&  searchTerm!='' && book.length>0?
                <div className='results'>
                <hr/>
              <h1>Results</h1>
              <div className='bookshelf'>
                {book.map((b,index)=>(
                  <div className='newbook' key={index}>
                   <div className='imageblock'>
                     <img src={b.volumeInfo.imageLinks?.smallThumbnail} width='100' height='100'/>
                     <button onClick={()=>setItemsCart(b)}>Add Item</button>
                   
                   </div>
                    <div className='bookcontent'>
                      <h2>{b.volumeInfo.title}</h2>
                      <h3>{b.volumeInfo.subtitle}</h3>
                      <h3>Country:<span>{b.accessInfo.country}</span></h3>
                      
                      <h4>{b.searchInfo?.textSnippet}
                      </h4>
                      <h3>Category:<span>{b.volumeInfo.categories}</span></h3>
                      <h3>AUthor:<span>{b.volumeInfo.authors}</span></h3>
                    </div>
                  </div>
                ))}
              </div>
           </div>:''
          }
        </div>
        </div>
    </div>
  );
}

export default Item;