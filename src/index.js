const dotenv=require('dotenv')
const { ethers } = require('ethers');
const { contractABI } = require('./abi');
dotenv.config();

const provider = new ethers.InfuraProvider('sepolia',process.env.INFURA_API_KEY);

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = process.env.CONTRACT_ADDRESS;

const votingContract = new ethers.Contract(contractAddress, contractABI, wallet);

async function vote(candidateId) {
    try {
        const tx = await votingContract.vote(candidateId);
        console.log(`Voting for candidate ${candidateId}...`);
        await tx.wait(); 
        console.log('Vote successful!', tx);
    } catch (error) {
        console.error('Error voting:', error);
    }
}

async function getAllCandidates() {
    try {
        const candidateAddresses = await votingContract.getAllCandidateAddresses();
        console.log('Candidate Addresses:', candidateAddresses);
    } catch (error) {
        console.error('Error fetching candidates:', error);
    }
}

(async () => {
    await vote(1);

    await getAllCandidates();
})();
