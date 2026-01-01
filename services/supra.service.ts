const RPC_URL = process.env.NEXT_PUBLIC_SUPRA_RPC_URL || 'https://rpc-testnet.supra.com';
const DEPLOYER_ADDR = '0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e';

export class SupraService {
  private static client: any = null;

  static async getClient(): Promise<any> {
    if (!this.client) {
      // Initialize client lazily when SDK is available
      this.client = { rpcUrl: RPC_URL };
    }
    return this.client;
  }

  static async getBalance(address: string): Promise<bigint> {
    try {
      const response = await fetch(`${RPC_URL}/v1/accounts/${address}`);
      const data = await response.json();
      return BigInt(data.balance || 0);
    } catch (error) {
      console.error('Failed to get balance:', error);
      return BigInt(0);
    }
  }

  static async callFunction(
    account: any,
    moduleName: string,
    functionName: string,
    args: any[] = []
  ) {
    const payload = {
      function: `${DEPLOYER_ADDR}::${moduleName}::${functionName}`,
      type_arguments: [],
      arguments: args,
    };

    return payload;
  }

  static async burnVeil(account: any, amount: bigint) {
    return await this.callFunction(
      account,
      'immortal_reserve',
      'burn_for_shares',
      [amount.toString()]
    );
  }

  static async lockVeil(account: any, amount: bigint, duration: bigint) {
    return await this.callFunction(
      account,
      'veveil',
      'lock',
      [amount.toString(), duration.toString()]
    );
  }

  static async borrow(account: any, collateral: bigint, amount: bigint) {
    return await this.callFunction(
      account,
      'debt_engine',
      'borrow',
      [collateral.toString(), amount.toString()]
    );
  }

  static async repay(account: any, amount: bigint) {
    return await this.callFunction(
      account,
      'debt_engine',
      'repay',
      [amount.toString()]
    );
  }
}
