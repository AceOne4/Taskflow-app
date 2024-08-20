"use client";
import { IComment } from "@/types/types";
import { sendComment } from "@/utils/actions";
import { pusherClient } from "@/utils/pusher";
import { Session } from "next-auth";
import { comment } from "postcss";
import React, { useEffect, useState } from "react";

interface CommentsProps {
  comments: IComment[];
  taskId: string;
  session: Session | null;
}

const Comments: React.FC<CommentsProps> = ({ session, comments, taskId }) => {
  const [currentComments, setCurrentComments] = useState<IComment[]>([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    setCurrentComments(comments);
    const channel = pusherClient.subscribe(taskId);
    channel.bind("comments", (comment: IComment) => {
      setCurrentComments((prev) => [...prev, comment]);
    });

    return () => {
      pusherClient.unsubscribe(taskId);
    };
  }, [taskId, comments]);

  const handleCommentSend = async () => {
    const comment: IComment = {
      taskId,
      senderName: session?.user?.name as string,
      createdAt: new Date(),
      content: input,
      sender: session?.user?.id as string,
    };
    await sendComment(comment);
    setInput("");
  };

  return (
    <div className=" shadow-sm shadow-indigo-200 rounded-lg p-6 mb-6  bg-indigo-950 ">
      <h2 className="text-xl font-semibold mb-2 text-indigo-600">Comments</h2>
      {currentComments.map((comment, index) => (
        <div key={comment._id || index} className="border-b py-2">
          <p>
            <strong>{comment.senderName}:</strong> {comment.content}
          </p>
        </div>
      ))}
      <div className=" flex items-center py-4 ">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Add a comment..."
          className="flex-1 border rounded-lg p-2 text-indigo-900"
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={handleCommentSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Comments;
