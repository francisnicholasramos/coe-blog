// Entities' Schema
export interface User {
    id: string;
    username: string;
    email: string;
}

export interface Post {
  id: string;           
  title: string;        
  content: string;      
  published: boolean;   
  createdAt: string;    
  userId: string;       
  user: User;          
  comments?: Comment[]; 
}

export interface Comment {
    id: string;           
    content: string;      
    userId?: string;      
    username?: string;    
    createdAt: string;    
    postId: string;       
    type: CommentType;    
    user?: User;          
}

export interface PostCardProps {
    post: Post;
}

export type CommentType = 'PUBLIC' | 'PRIVATE';

// Auth
export interface LoginProps {
    username: string;
    password: string;
}
