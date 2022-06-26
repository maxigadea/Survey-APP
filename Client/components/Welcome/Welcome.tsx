import React, { useState } from 'react'
import Survey from '../../utils/Survey.json'
import { Layout, Typography, Button } from "antd";
import Image from 'next/image';
import Styles from './Welcome.module.css';
import { stateStore } from "../../store/StateStore";
import { values } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router'


interface ComponentProps {
    stateStore: stateStore
}

export const Welcome: React.FC<ComponentProps> = observer(({ stateStore }) => {
    const router = useRouter();
    
    return (
        <Layout>
            <Typography.Title className={Styles.title}>{Survey.title}</Typography.Title>
            <Image className={Styles.img} width={400} height={500} src={Survey.image} alt='Logo' />
            <div className={Styles.menuCon}>
                <Button className={Styles.button} type="primary" onClick={stateStore.connectWallet}>
                    <span className={Styles.span}>  {'Start Quiz'} </span>
                </Button>
            </div>
        </Layout>
    )
});