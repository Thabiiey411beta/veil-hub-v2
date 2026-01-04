// 21st.dev Magic Integration Service
// Enables AI-powered UI component generation

const MAGIC_API_KEY = process.env.NEXT_PUBLIC_MAGIC_API_KEY || 'd72d1811743e5ed677ca2ce45aff24024d29bc92155ade3b77e013d7ba66b163';
const MAGIC_API_URL = 'https://api.21st.dev/magic';

export interface MagicComponentRequest {
  prompt: string;
  style?: 'minimal' | 'modern' | 'glassmorphism' | 'gradient';
  theme?: 'dark' | 'light';
  framework?: 'react' | 'vue' | 'svelte';
}

export interface MagicComponentResponse {
  code: string;
  preview: string;
  variants: string[];
  metadata: {
    generatedAt: string;
    model: string;
    tokens: number;
  };
}

export async function generateComponent(request: MagicComponentRequest): Promise<MagicComponentResponse> {
  try {
    const response = await fetch(`${MAGIC_API_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAGIC_API_KEY}`,
      },
      body: JSON.stringify({
        ...request,
        style: request.style || 'glassmorphism',
        theme: request.theme || 'dark',
        framework: request.framework || 'react',
      }),
    });

    if (!response.ok) {
      throw new Error(`Magic API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to generate component:', error);
    throw error;
  }
}

export async function generateVariants(componentCode: string, count: number = 5): Promise<string[]> {
  try {
    const response = await fetch(`${MAGIC_API_URL}/variants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAGIC_API_KEY}`,
      },
      body: JSON.stringify({
        code: componentCode,
        count,
      }),
    });

    if (!response.ok) {
      throw new Error(`Magic API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.variants;
  } catch (error) {
    console.error('Failed to generate variants:', error);
    throw error;
  }
}

export async function optimizeComponent(componentCode: string): Promise<string> {
  try {
    const response = await fetch(`${MAGIC_API_URL}/optimize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAGIC_API_KEY}`,
      },
      body: JSON.stringify({
        code: componentCode,
      }),
    });

    if (!response.ok) {
      throw new Error(`Magic API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.optimizedCode;
  } catch (error) {
    console.error('Failed to optimize component:', error);
    throw error;
  }
}
