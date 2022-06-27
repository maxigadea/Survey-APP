import type { NextPage } from 'next';
import { stateStore } from '../../store/StateStore';
import Survey from '../../utils/Survey.json'
import { Layout, Typography, Input, Button, Form } from "antd";
import Image from 'next/image';
import Styles from './QuizMain.module.css';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

interface ComponentProps {
  stateStore: typeof stateStore
}

const Content = Layout;

const QuizMain: React.FC<ComponentProps> = observer(({ stateStore }) => {

  const [answers, setAnswers] = useState();

  var restTime = Survey.questions[stateStore.currentSurvey].lifetimeSeconds;
  useEffect(() => {
    const intervalo = setInterval(() => {
      if (stateStore.restTime > 0) restTime -= 1000;
      if (stateStore.restTime === 0) {
        if (stateStore.currentSurvey < Survey.questions.length - 1) {
          stateStore.setSurveyCount()
          document.querySelectorAll('input[type=checkbox]').forEach(function (checkElement) {
            checkElement.checked = false;
          });
        }
      }
    }, restTime);
    return () => clearInterval(intervalo);
  }, [restTime]);


  const handleChanges = (e) => {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value
    });
  };
  console.log(answers);

  const handleSend = (e) => {
    e.preventDefault();
    stateStore.finishAnswer(answers)
  };

  return (
    <>
      <Layout>
        <Typography.Title className={Styles.title}>Questions of the day</Typography.Title>
        <Image className={Styles.img} width={300} height={400} src={Survey.questions[stateStore.currentSurvey].image} alt='Logo' priority={true} />
        <Typography.Title className={Styles.title}>{Survey.questions[stateStore.currentSurvey].text}</Typography.Title>
        <Form>
          <Content>
            {
              Survey.questions[stateStore.currentSurvey].options.map((option, i) => {
                return (
                  <div key={i} className={Styles.divContainer}>
                    <label className={Styles.label}>{option.text}</label>
                    <input id="checkboxOne" name={`${i}`} onChange={handleChanges} type="checkbox" value={option.text} />
                  </div>)
              })
            }
          </Content>
        </Form>
        <div className={Styles.menuCon}>
          <Button className={Styles.button} type="primary" onClick={handleSend}>
            <span className={Styles.span}>Finish Quiz</span>
          </Button>
        </div>
      </Layout>
    </>
  )
})

export default QuizMain;
