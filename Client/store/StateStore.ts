import { makeObservable, observable, action, values, runInAction } from 'mobx';
import { contractABI, contractAddress } from '../utils/constants';
import { ethers } from 'ethers';


interface Users {
    name: string
    address: string
    balance: number
    ropsten: boolean
}

class StateStoreIMPL {

    user: Users = {
        name: "",
        address: "",
        balance: 0,
        ropsten: false
    };

    constructor() {
        makeObservable(this, {
            user: observable,
            addUser: action,
            checkChaindId: action,
            connectWallet: action,
            switchNetwork: action,
            getEthereumContract: action,
            getBalance: action,
        });
    }

    //actions, functions that can be change the state
    addUser = (address: string) => {
        this.user = {
            name: "current",
            address,
            balance: 0,
            ropsten: false
        }
    };

    checkChaindId = async () => {
        const targetNetworkId = '0x3';
        if (window.ethereum) {
            const currentChainId = await window.ethereum.request({
                method: 'eth_chainId',
            });

            if (currentChainId == targetNetworkId) {
                runInAction(() => {
                    this.user.ropsten = true;
                })
            } else {
                runInAction(() => {
                    return this.user.ropsten = false;
                })
            };
        };
    };

    switchNetwork = async () => {
        const targetNetworkId = '0x3';
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: targetNetworkId }],
        });
        // refresh
        window.location.reload();
    };

    connectWallet = async () => {
        let metamask;

        if (typeof window !== 'undefined') {
            metamask = window.ethereum;
        }
        try {
            if (!metamask) return alert('Please install metamask')
            const accounts = await metamask.request({ method: 'eth_requestAccounts' })
            stateStore.addUser(accounts[0])
            window.location.href = '/quizz'
            console.log(values(stateStore.user))
        } catch (error) {
            console.error(error);
            throw new Error('No ethereum object. ')
        }
    };

    getEthereumContract = () => {
        let metamask;

        if (typeof window !== 'undefined') {
            metamask = window.ethereum;
        }
        try {
            if (!metamask) return alert('Please install metamask')
            const provider = new ethers.providers.Web3Provider(metamask);
            const signer = provider.getSigner()
            const transactionContract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            )
            debugger
            return transactionContract;
        } catch (error) {
            console.error(error);
            throw new Error('No ethereum object. ')
        }
    };

    getBalance = async () => {
        const transactionContract = this.getEthereumContract();
        const transactionHash = await transactionContract.balanceOf(stateStore.user.address);
        const response = ethers.utils.formatEther(transactionHash)
        if (response) {
            this.user.balance = Number(response);
        }
    }

}

export const stateStore = new StateStoreIMPL();
