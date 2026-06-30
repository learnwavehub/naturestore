// lib/actions.ts
// lib/actions.ts

export const getCollections = async () => {
  let delay = 500;

  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/collections`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch collections: ${response.status}`
        );
      }

      const collections = await response.json();

      if (collections?.length) {
        return collections;
      }

      console.warn(
        `Attempt ${attempt}: Empty collection list. Retrying in ${delay}ms...`
      );
    } catch (error) {
      console.error(`Attempt ${attempt}:`, error);
    }

    await new Promise((resolve) => setTimeout(resolve, delay));

    // 500ms → 1s → 2s → 4s → 8s
    delay *= 2;
  }

  return [];
};

export const getCollectionDetails = async (collectionId: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch collection ${collectionId}: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching collection ${collectionId}:`, error);
    return null;
  }
}

export const getProducts = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export const getProductDetails = async (productId: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product ${productId}: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    return null;
  }
}

export const getSearchedProducts = async (query: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/${query}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to search products: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}

export const getOrders = async (customerId: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${customerId}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

export const getRelatedProducts = async (productId: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/related`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch related products: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}
// ==================== THERAPIES ====================

/**
 * Get all therapies
 
 */
// ✅ So for therapies, it should be /therapy (not /api/therapy)
export const getTherapies = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/therapy`, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch therapies: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching therapies:', error);
    return [];
  }
}


export const getTherapyDetails = async (therapyId: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/therapy/${therapyId}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Therapy ${therapyId} not found`);
        return null;
      }
      throw new Error(`Failed to fetch therapy ${therapyId}: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching therapy ${therapyId}:`, error);
    return null;
  }
}

export const getSearchedTherapies = async (query: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/therapy/search?q=${encodeURIComponent(query)}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to search therapies: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching therapies:', error);
    return [];
  }
}


