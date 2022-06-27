import type { NextPage } from 'next';
import {NavBar} from '../../components/Navbar/Navbar';
import QuizContainer from '../../components/QuizMain/QuizContainer';
import { stateStore } from '../../store/StateStore';



const Quiz: NextPage = () => {
  return (
    <>
      <NavBar stateStore={stateStore} />
      <QuizContainer  stateStore={stateStore}/>
    </>
  )
}

export default Quiz;
