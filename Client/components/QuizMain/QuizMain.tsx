import type { NextPage } from 'next';
import { stateStore } from '../../store/StateStore';
import Survey from '../../utils/Survey.json'
import { Layout, Typography, Input, Button } from "antd";
import Image from 'next/image';
import Styles from './QuizMain.module.css';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

interface ComponentProps {
  stateStore: typeof stateStore
}

const Content = Layout;

const QuizMain: React.FC<ComponentProps> = observer(({ stateStore }) => {

  var restTime = Survey.questions[stateStore.currentSurvey].lifetimeSeconds;
  useEffect(() => {
    const intervalo = setInterval(() => {
      if (stateStore.restTime > 0) restTime -= 1000;
      if (stateStore.restTime === 0) {
        if (stateStore.currentSurvey < Survey.questions.length - 1) {
          stateStore.setSurveyCount()
        }
      }
    }, restTime);

    return () => clearInterval(intervalo);
  }, [restTime]);


  return (
    <>
      <Layout>
        <Typography.Title className={Styles.title}>Questions of the day</Typography.Title>
        <Image className={Styles.img} width={300} height={400} src={Survey.questions[stateStore.currentSurvey].image} alt='Logo' priority={true} />
        <Typography.Title className={Styles.title}>{Survey.questions[stateStore.currentSurvey].text}</Typography.Title>
        <Content>
          <div className={Styles.divContainer}>
            <label className={Styles.label}>{Survey.questions[stateStore.currentSurvey].options[0].text}</label>
            <input type="checkbox" value={Survey.questions[stateStore.currentSurvey].options[0].text} />
          </div>
          <div className={Styles.divContainer}>
            <label className={Styles.label}>{Survey.questions[stateStore.currentSurvey].options[1].text}</label>
            <input type="checkbox" value={Survey.questions[stateStore.currentSurvey].options[1].text} />
          </div>
          <div className={Styles.divContainer}>
            <label className={Styles.label}>{Survey.questions[stateStore.currentSurvey].options[2].text}</label>
            <input type="checkbox" value={Survey.questions[stateStore.currentSurvey].options[2].text} />
          </div>
        </Content>
        <div className={Styles.menuCon}>
          <Button className={Styles.button} type="primary" >
            <span >  {'Next'} </span>
          </Button>
        </div>
      </Layout>
    </>
  )
})

export default QuizMain;
