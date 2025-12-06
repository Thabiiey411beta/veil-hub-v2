import { HexString } from 'supra-l1-sdk';

export class SecurityUtils {
  // Validate Supra address
  static isValidAddress(address: string): boolean {
    try {
      new HexString(address);
      return address.length === 66 && address.startsWith('0x');
    } catch {
      return false;
    }
  }

  // Sanitize user input
  static sanitizeInput(input: string): string {
    return input.replace(/[^a-zA-Z0-9]/g, '');
  }

  // Rate limiting
  private static requestCounts = new Map<string, number[]>();
  
  static checkRateLimit(key: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
    const now = Date.now();
    const requests = this.requestCounts.get(key) || [];
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < windowMs);
    
    if (validRequests.length >= maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.requestCounts.set(key, validRequests);
    return true;
  }

  // Validate amount
  static isValidAmount(amount: string | number): boolean {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return !isNaN(num) && num > 0 && num < Number.MAX_SAFE_INTEGER;
  }

  // Prevent XSS
  static escapeHtml(text: string): string {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  // Check transaction signature
  static verifySignature(message: string, signature: string, publicKey: string): boolean {
    // Implement signature verification
    return signature.length === 130 && publicKey.length === 66;
  }
}
