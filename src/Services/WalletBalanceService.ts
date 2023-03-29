import { WalletBalanceProvider } from '@aave/contract-helpers';
import { normalize } from '@aave/math-utils';
import { Provider } from '@ethersproject/providers';
import { governanceConfig } from 'src/ui-config/governanceConfig';

type BatchBalanceOfArgs = {
  user: string;
};

type GetPoolWalletBalances = {
  user: string;
  poolAddress: string;
};

export class WalletBalanceService {
  private readonly walletBalanceService: WalletBalanceProvider;

  constructor(provider: Provider, walletBalanceProviderAddress: string) {
    this.walletBalanceService = new WalletBalanceProvider({
      walletBalanceProviderAddress,
      provider,
    });
  }

  async getGovernanceTokensBalance({ user }: BatchBalanceOfArgs) {
    const balances = await this.walletBalanceService.batchBalanceOf(
      [user],
      [
        governanceConfig.aaveTokenAddress,
        governanceConfig.aAaveTokenAddress,
        governanceConfig.stkAaveTokenAddress,
      ]
    );
    return {
      aave: normalize(balances[0].toString(), 18),
      aAave: normalize(balances[1].toString(), 18),
      stkAave: normalize(balances[2].toString(), 18),
    };
  }

  async getPoolTokensBalances({ user, poolAddress }: GetPoolWalletBalances) {
    const { 0: tokenAddresses, 1: balances } =
      await this.walletBalanceService.getUserWalletBalancesForLendingPoolProvider(
        user,
        poolAddress
      );
    const mappedBalances = tokenAddresses.map((address, ix) => ({
      address: address.toLowerCase(),
      amount: balances[ix].toString(),
    }));
    return mappedBalances;
  }
}
