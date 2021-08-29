import DiscussionView from './view';
import { normalizeRecord, Record, useOpenBoardContract } from './helper';
import { OpenBoard } from '../../types/contracts';
import { useCallback, useEffect, useState } from 'react';
import { useActiveWeb3React, useWeb3ReactActivate } from '../../hooks';

const MAX_CAPACITY = 100;

const loadHistoricalRecords = async (
  contract: OpenBoard,
): Promise<Array<Record>> => {
  const recordId = (await contract.recordId()).toNumber();
  const lastIndex = Math.min(recordId, MAX_CAPACITY);

  const records: Array<Record> = [];

  for (let i = 0; i < lastIndex; ++i) {
    const batchSize = 10;
    const lastBatch = Math.min(i + batchSize, lastIndex);
    const calls = [];
    while (i < lastBatch) {
      calls.push(contract.records(i));
      ++i;
    }
    const originRecords = await Promise.all(calls);
    records.push(...originRecords.map(normalizeRecord));
  }

  records.sort((a, b) => b.id - a.id);
  return records;
};

const Discussion = () => {
  const { account } = useActiveWeb3React();
  const activateInjectedWeb3 = useWeb3ReactActivate();
  const contract: OpenBoard | undefined = useOpenBoardContract();
  const [records, setRecords] = useState<Array<Record>>([]);
  const [messageValue, setMessageValue] = useState<string>('');

  const submitMessage = useCallback(() => {
    if (!contract || !messageValue) {
      return;
    }

    contract
      .submitMessage(messageValue)
      .then(() => setMessageValue(''))
      .catch(console.error);
  }, [contract, messageValue]);

  useEffect(() => {
    if (!contract) {
      return;
    }

    let cancelled = false;
    loadHistoricalRecords(contract)
      .then((records) => !cancelled && setRecords(records))
      .catch(console.error);

    const filter = contract.filters.NewRecord();
    const listener = (newRecord: any) => {
      if (!cancelled) {
        setRecords((prevState) => [normalizeRecord(newRecord), ...prevState]);
      }
    };
    contract.on(filter, listener);

    return () => {
      cancelled = true;
      contract.removeListener(filter, listener);
    };
  }, [contract, account]);

  return (
    <DiscussionView
      records={records}
      account={typeof account === 'string' ? account : ''}
      connectWallet={activateInjectedWeb3}
      messageValue={messageValue}
      onMessageValueChange={setMessageValue}
      submitMessage={submitMessage}
    />
  );
};

export default Discussion;
