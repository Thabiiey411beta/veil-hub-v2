export const CONTRACTS = {
  VeilToken: '0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e',
  ImmortalReserve: '0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e',
  DebtEngine: '0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e',
  VeVEIL: '0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e',
  VeilHub: '0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e',
  BuybackEngine: '0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e'
} as const;

export const VEIL_TOKEN_ABI = [
  'function balanceOf(address) view returns (uint256)',
  'function totalSupply() view returns (uint256)',
  'function burn(uint256) external',
  'function approve(address,uint256) external returns (bool)'
] as const;

export const IMMORTAL_RESERVE_ABI = [
  'function burnVeilForImmortalShares(uint256) external',
  'function pendingDividends(address) view returns (uint256)',
  'function claimDividends() external',
  'function balanceOf(address) view returns (uint256)',
  'function totalSupply() view returns (uint256)',
  'function getBurnBonus() view returns (uint256)',
  'function totalVeilBurned() view returns (uint256)'
] as const;

export const DEBT_ENGINE_ABI = [
  'function openPosition(address,uint256,uint256) external',
  'function closePosition() external',
  'function calculateTotalDebt(address) view returns (uint256)',
  'function isPositionAtRisk(address) view returns (bool)',
  'function positions(address) view returns (uint256,uint256,uint256,address,bool)'
] as const;

export const VEVEIL_ABI = [
  'function lock(uint256,uint256) external',
  'function unlock() external',
  'function balanceOf(address) view returns (uint256)',
  'function getBoost(address) view returns (uint256)',
  'function locks(address) view returns (uint256,uint256)'
] as const;
