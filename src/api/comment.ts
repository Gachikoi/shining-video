import request from "@/utils/request";

export const reqGetComments = () => request.get<CommentArr>('/getComments')
export const reqPostComment = (CommentData: Object) => request.post('/postComment', CommentData)
export const reqPostReply = (ReplyData: Object) => request.post('/postReply', ReplyData)
export const reqDeleteReply = (commentID: string,replyID:string) => request.delete('/deleteReply/' + commentID+"/"+replyID)
export const reqDeleteComment = (commentID: string) => request.delete('/deleteComment/' + commentID)

export interface Comment{
  id: string,
  date:string
  user: {
    avatarPath: string,
    name: string,
    id:string
  },
  content: string,
  replies:ReplyArr
}

export type CommentArr = Comment[]

export interface Reply{
  id: string
  date:string,
  user: {
    avatarPath: string,
    name: string
    id:string
  },
  content:string
}

export type ReplyArr=Reply[]