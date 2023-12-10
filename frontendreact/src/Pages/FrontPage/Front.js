import './Front.css';
import img from '../../Images/book.png';
import img2 from '../../Images/Image2.jpg';
import video from '../../Videos/video.mp4';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Front(){

 const [scrolled,setscrolled]=useState(false);
   useEffect(()=>{
    const handleScroll=()=>{
    const scroll=window.scrollY;
    setscrolled(scroll>0);}
    window.addEventListener('scroll',handleScroll);
   },[]);

  const navigate=useNavigate();

    return (
        <div>
        <div className='firstbackground'>
            <div id='navbar' className={scrolled?'scrolled':'noscroll'}>
                <div className='logo' onClick={()=>navigate('/')}>
                <h1>Library Management</h1>
                <img src={img} alt='book' width="50px" height="50px"/>
                </div>
                    <nav>
                        <h2>Price</h2>
                        <h2>Support</h2>
                        <h2>Contact Us</h2>
                        <button name='login' onClick={()=>{navigate('/login');}}>Login</button>
                        <button name='started' onClick={()=>navigate('/signup')}>Get Started</button>
                    </nav>
                </div>
                <div className='centerpart'>
                    <h1>Cloud Cataloging</h1>
                    <h3>Your library has never looked so good.<br/>
                     Books, Movies, Music and Video Games.</h3>
                     <button>Get Started</button>
                </div>
        </div>
        <div className='centerimage'>
            <img src={img}></img>
        </div>
        <div className='secondbackground'>
                <div className='centerpart'>
                    <h2>Create & Share Your Collection</h2>
                    <h3>Our library management service caters to libraries, schools, organizations, and home catalogs. 
                        Our online software lets you create multiple collections, catalog books, movies, music, and video games, 
                        create tags, leave notes, import/export, share your collections and much more. We offer two
                         different subscription options to best fit your needs. Libib is the best place for cataloging and
                          managing your media available online. Now which version is the best for you?</h3>
                        <button>Compare Plans</button>
                </div>
        </div>
            <div className='thirdbackground'>
                <div className='centerpart'>
                <h2>Create & Share Your Collection</h2>
                    <h3>Automatic Data for Books, Movies, Music and Video Games
                    </h3>
                    </div>
                <div className='img'>
                    <video width="600" height="350" autoPlay loop>
                        <source src={video} type='video/mp4'></source>
                        </video>
                    </div>
            </div>
            <div className='thirdbackground two'>
                <img src={img2} width="700" height="500"/>
                <div className='centerpart'>
                <h2>Cloud Sync keeps your collections updated across multiple devices.</h2>
                    <h3>Access your collections from anywhere on virtually any device.</h3>
                    </div>
            </div>
        </div>
        )
}

export default Front;

