import { SupraClient, SupraAccount, HexString, BCS } from 'supra-l1-sdk';

const RPC_URL = process.env.NEXT_PUBLIC_SUPRA_RPC_URL || 'https://rpc-testnet.supra.com';
const DEPLOYER_ADDR = '0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e';

export class SupraService {
  private static client: SupraClient | null = null;

  static async getClient(): Promise<SupraClient> {
    if (!this.client) {
      this.client = await SupraClient.init(RPC_URL);
    }
    return this.client;
  }

  static async getBalance(address: string): Promise<bigint> {
    const client = await this.getClient();
    return await client.getAccountSupraCoinBalance(address);
  }

  static async callFunction(
    account: SupraAccount,
    moduleName: string,
    functionName: string,
    args: any[] = []
  ) {
    const client = await this.getClient();
    
    const payload = {
      function: `${DEPLOYER_ADDR}::${moduleName}::${functionName}`,
      type_arguments: [],
      arguments: args,
    };

    return await client.sendTx(account, { EntryFunction: payload });
  }

  static async burnVeil(account: SupraAccount, amount: bigint) {
    return await this.callFunction(
      account,
      'immortal_reserve',
      'burn_for_shares',
      [BCS.bcsSerializeUint64(amount)]
    );
  }

  static async lockVeil(account: SupraAccount, amount: bigint, duration: bigint) {
    return await this.callFunction(
      account,
      'veveil',
      'lock',
      [BCS.bcsSerializeUint64(amount), BCS.bcsSerializeUint64(duration)]
    );
  }

  static async borrow(account: SupraAccount, collateral: bigint, amount: bigint) {
    return await this.callFunction(
      account,
      'debt_engine',
      'borrow',
      [BCS.bcsSerializeUint64(collateral), BCS.bcsSerializeUint64(amount)]
    );
  }

  static async repay(account: SupraAccount, amount: bigint) {
    return await this.callFunction(
      account,
      'debt_engine',
      'repay',
      [BCS.bcsSerializeUint64(amount)]
    );
  }
}
