import LoginForm from "../components/Login";
import NewsFeed from "../components/NewsFeed";
import Navbar from "../components/Navbar";

const Home = () => {
    return (
        <>
          <div className='backgroundHome'>
            <Navbar />
             <LoginForm />
             <NewsFeed />
          </div>
        </>
    )
}

export default Home;