import { Trans } from '@lingui/macro';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import * as React from 'react';
import { ConnectWalletPaper } from 'src/components/ConnectWalletPaper';
import { ListColumn } from 'src/components/lists/ListColumn';
import { ListHeaderTitle } from 'src/components/lists/ListHeaderTitle';
import { ListHeaderWrapper } from 'src/components/lists/ListHeaderWrapper';
import { ListItem } from 'src/components/lists/ListItem';
import { ListWrapper } from 'src/components/lists/ListWrapper';
import { Link } from 'src/components/primitives/Link';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { useRootStore } from 'src/store/root';

import { FaucetItemLoader } from '../faucet/FaucetItemLoader';
import { FaucetMobileItemLoader } from '../faucet/FaucetMobileItemLoader';

interface Transaction {
  action: string;
  txHash: string;
}

export default function TransactionsAssetsList({
  transactions,
  loading,
}: {
  transactions: Transaction[];
  loading: boolean;
}) {
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));
  const { currentNetworkConfig } = useRootStore();
  const { currentAccount, loading: web3Loading } = useWeb3Context();

  if (!currentAccount || loading) {
    return (
      <ConnectWalletPaper
        loading={web3Loading || loading}
        description={<Trans> Please connect your wallet to view transaction history.</Trans>}
      />
    );
  }

  return (
    <ListWrapper
      titleComponent={
        <Typography component="div" variant="h2" sx={{ mr: 4 }}>
          <Trans>Transactions</Trans>
        </Typography>
      }
    >
      <ListHeaderWrapper px={downToXSM ? 4 : 6}>
        <ListColumn isRow>
          <ListHeaderTitle>
            <Trans>Link</Trans>
          </ListHeaderTitle>
        </ListColumn>

        <ListColumn isRow>
          <ListHeaderTitle>
            <Trans>Action</Trans>
          </ListHeaderTitle>
        </ListColumn>

        {/*         
Each action may have unique columns 
                <ListColumn>
                    <ListHeaderTitle>
                        <Trans>Amount</Trans>
                    </ListHeaderTitle>
                </ListColumn> */}
      </ListHeaderWrapper>

      {loading ? (
        downToXSM ? (
          <>
            <FaucetMobileItemLoader />
            <FaucetMobileItemLoader />
            <FaucetMobileItemLoader />
          </>
        ) : (
          <>
            <FaucetItemLoader />
            <FaucetItemLoader />
            <FaucetItemLoader />
            <FaucetItemLoader />
          </>
        )
      ) : (
        transactions.map((transaction, key) => (
          <ListItem px={downToXSM ? 4 : 6} key={key}>
            <ListColumn>
              <Link href={currentNetworkConfig.explorerLinkBuilder({ tx: transaction.txHash })}>
                TX
              </Link>
            </ListColumn>
            <ListColumn>{transaction.action}</ListColumn>
          </ListItem>
        ))
      )}
    </ListWrapper>
  );
}
