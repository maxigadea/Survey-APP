import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from "antd";
import Styles from './Navbar.module.css';
import EthLogo from '../../Assets/eth-logo.png';
import { stateStore } from "../../store/StateStore";
import "antd/dist/antd.css";
import { observer } from 'mobx-react-lite';

interface ComponentProps {
  stateStore: typeof stateStore
}

export const NavBar: React.FC<ComponentProps> = observer(({ stateStore }) => {

  useEffect(() => {
    stateStore.checkChaindId();
  }, [stateStore.user.address])

  return (
    <nav className={Styles.menuBar}>
      <div className={Styles.logo}>
        <Image width={50} height={50} src={EthLogo} alt='Logo' />
      </div>
      <div className={Styles.menuCon}>
        <Button type="primary" onClick={stateStore.connectWallet}>
          <span >  {'Connect Wallet'} </span>
        </Button>
      </div>
    </nav>
  )
});