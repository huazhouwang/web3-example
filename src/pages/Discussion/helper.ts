import { OpenBoard, OpenBoard__factory } from '../../types/contracts';
import { useContract } from '../../hooks';
import moment from 'moment';

const CONTRACT_ADDRESS = '0xa5954b05e2d7dbc2894bfe2732207ce2d8f656c7';

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
