import { useContext } from "react";
import { CommunityChatContext } from "./community-chat-context";

export const useCommunityChat = () => useContext(CommunityChatContext);