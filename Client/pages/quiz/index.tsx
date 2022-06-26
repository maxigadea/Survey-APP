import type { NextPage } from 'next';
import {NavBar} from '../../components/Navbar/Navbar';
import QuizMain from '../../components/QuizMain/QuizMain';
import { stateStore } from '../../store/StateStore';



const Quiz: NextPage = () => {
  return (
    <>
      <NavBar stateStore={stateStore} />
      <QuizMain  stateStore={stateStore}/>
    </>
  )
}

export default Quiz;
