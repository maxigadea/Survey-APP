import type { NextPage } from 'next';
import { stateStore } from '../../store/StateStore';
import Survey from '../../utils/Survey.json'
import { Layout, Typography, Input, Button } from "antd";
import Image from 'next/image';
import Styles from './QuizMain.module.css';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import QuizMain from './QuizMain';
import QuizOverview from './QuizzOverview';

interface ComponentProps {
    stateStore: typeof stateStore
}

const QuizContainer: React.FC<ComponentProps> = observer(({ stateStore }) => {

    return stateStore.surveyFinished === false ?
        (
            <>
                <QuizMain stateStore={stateStore} />
            </>
        ) :
        (
            <>
                <QuizOverview stateStore={stateStore} />
            </>
        )
})

export default QuizContainer;
