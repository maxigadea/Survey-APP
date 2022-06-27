import type { NextPage } from 'next';
import { stateStore } from '../../store/StateStore';
import Survey from '../../utils/Survey.json'
import { Layout, Typography, Input, Button } from "antd";
import Image from 'next/image';
import Styles from './QuizMain.module.css';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { values } from 'mobx';

interface ComponentProps {
    stateStore: typeof stateStore
}

const Content = Layout;

const QuizOverview: React.FC<ComponentProps> = observer(({ stateStore }) => {
    console.log(values(stateStore.answers))
    return (
        <>
            <Layout>
                <Typography.Title className={Styles.title}>Answers Overview</Typography.Title>
                <Image className={Styles.img} width={300} height={400} src={Survey.image} alt='Logo' priority={true} />
                <Content>
                    {
                       values(stateStore.answers).map((answ) => {
                            return (
                                <div className={Styles.divContainer}>
                                    <label className={Styles.label}>{answ}</label>
                                </div>
                            )
                        })
                    }
                </Content>
                <div className={Styles.menuCon}>
                    <Button className={Styles.button} type="primary" onClick={stateStore.validateAnswers}>
                        <span className={Styles.span}>  {'Done'} </span>
                    </Button>
                </div>
            </Layout>
        </>
    )
})

export default QuizOverview;
