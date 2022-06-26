import type { NextPage } from 'next';
import {NavBar} from '../components/Navbar/Navbar';
import { Welcome } from '../components/Welcome/Welcome';
import { stateStore } from '../store/StateStore';


const Home: NextPage = () => {
  return (
    <>
       <NavBar stateStore={stateStore} />
       <Welcome stateStore={stateStore}/>
    </>
  )
}

export default Home
