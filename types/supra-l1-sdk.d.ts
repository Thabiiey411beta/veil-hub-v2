declare module 'supra-l1-sdk' {
	export class SupraAccount {
		constructor(seedOrBuffer: any);
	}
	export type HexString = string;
	export const BCS: {
		bcsSerializeUint64: (v: bigint) => any;
	};

	export class SupraClient {
		static init(url: string): Promise<SupraClient>;
		getAccountSupraCoinBalance(address: string): Promise<bigint>;
		sendTx(account: SupraAccount, payload: any): Promise<any>;
		sendTxAndWaitForResponse(account: SupraAccount, payload: any): Promise<any>;
	}

	export { SupraClient };
}
declare module 'supra-l1-sdk';
