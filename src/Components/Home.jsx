import '../App.css'
import KitchenDisplayonHomePage from './KitchenDisplay';
import Footer from './footer';
import Header from './header';
function Home({setkitchenselected}) {
  
  return (
    <>
       <Header/>
        <KitchenDisplayonHomePage setkitchenselected={setkitchenselected}/>
       <Footer/>
    </>
  )
}

export default Home
