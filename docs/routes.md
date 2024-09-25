# Routes

## GET Products

**Rote:** GET - /products

**Visibility:** Public

**Query:** { 
    
    fts?: string;
    limit?: number;
    offset?: number;
    priceMin?: number;
    priceMax?: number;
    
}

**Return:** { 
    
    data: {
        id: number;
        originId: string;
        title: string;
        bodyHtml: string;
        vendor: string;
        type: string;
        tags: string[];
        publishedAt: string;
        createdAt: string;
        updatedAt: string;
        variants: Variant[];
        images: Image[];
        options: Option[];
    }[];
    limit: number;
    offset: number;
    count: number;
    
}

