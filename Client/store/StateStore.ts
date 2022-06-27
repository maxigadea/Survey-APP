import { makeAutoObservable, observable, action, values, runInAction } from 'mobx';
import { contractABI, contractAddress } from '../utils/constants';
import { ethers } from 'ethers';



interface Users {
    id: number
    name: string
    address: string
    balance: number
    ropsten: boolean
}


class StateStoreIMPL {

    user: Users = {
        id: 0,
        name: "",
        address: "",
        balance: 0,
        ropsten: false
    };

    answers: string[] = []
    surveyIds: string[] = []

    surveyId: number = 1;
    currentSurvey: number = 0;
    surveyFinished: boolean = false;
    restTime: number = 0;

    constructor() {
        makeAutoObservable(this, {
            user: observable,
            currentSurvey: observable,
            addUser: action,
            checkChaindId: action,
            connectWallet: action,
            switchNetwork: action,
            getEthereumContract: action,
            getBalance: action,
            setSurveyFinished: action
        });
    }
    setSurveyCount = () => {
        this.currentSurvey++;
    }

    setSurveyFinished = () => {
        this.surveyFinished = true;

    }

    finishAnswer = (Answers: []) => {
        this.surveyFinished = true;
        if (Answers) {
            this.answers = Answers;
            this.surveyIds = Object.keys(Answers);;
        } else {
            this.answers.push("Not answered")
        }
    }

    //actions, functions that can be change the state
    addUser = (address: string) => {
        this.user = {
            id: Number(address),
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
                    this.user.ropsten = false;
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
    };

    validateAnswers = async () => {
        const answerIds = values(this.surveyIds).map(value => { return Number(value) });
        console.log(answerIds);
        const transactionContract = this.getEthereumContract();
        const transactionHash = await transactionContract.submit(this.surveyId, answerIds);
        this.getBalance();
        window.location.href = '/';
        console.log(transactionHash);
    }

    checkisconnected = async () => {
        const response = await window.ethereum.request({ method: 'eth_accounts' })
        if (response.length > 0) {
            return response;
        } else {
            runInAction(() => {
                this.user = {
                    id: 0,
                    name: '',
                    address: '',
                    balance: 0,
                    ropsten: false
                }
            })
        }
    };

}

export const stateStore = new StateStoreIMPL();
