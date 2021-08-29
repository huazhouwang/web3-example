import { OpenBoard, OpenBoard__factory } from '../../types/contracts';
import { useContract } from '../../hooks';
import moment from 'moment';

const CONTRACT_ADDRESS = '0x0F5Fca31B06818ac537a91AB1B83d647E6609AB7';

export const useOpenBoardContract = () =>
  useContract(CONTRACT_ADDRESS, OpenBoard__factory) as OpenBoard;

export interface Record {
  id: number;
  sender: string;
  message: string;
  date: string;
  isDonated: boolean;
  donatedValue: number;
}

export const normalizeRecord = (origin: any): Record => ({
  id: origin.id.toNumber(),
  sender: origin.sender,
  message: origin.message,
  date: moment(origin.timestamp * 1e3).fromNow(),
  isDonated: origin.isDonated,
  donatedValue: origin.donatedValue.toString(),
});
