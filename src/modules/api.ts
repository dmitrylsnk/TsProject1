import type { Post } from "../types/index.js";

export async function getPosts(): Promise<Post[]> {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');

        if (!res.ok) throw new Error('Network error');
        
        const data: Post[] = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        
        return []; 
    }
}