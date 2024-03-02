import React from "react";
import Mountains from "./mountains";
import X from "./x";
import Plus from "./plus";
import Search from "./search";
import User from "./user";
import Lll from "./lll";
import Notification from "./notification";
import Pulse from "./pulse";
import ArrowBack from "./arrowBack";
import ArrowForward from "./arrowForward";
import Map from "./map";
import More from "./more";
import Atom from "./atom";
import Duplicate from "./duplicate";
import Save from "./save";
import Controls from "./controls";
import Play from "./play";
import Loader from "./loader";
import Feed from "./feed";
import Cog from "./cog";
import Pause from "./pause";
import StopRec from "./stopRec";
import LoopIcon from "./loopIcon";
import TrashIcon from "./trash";
import SpotifyIcon from "./spotifyIcon";
import AppleIcon from "./appleIcon";
import FileIcon from "./fileIcon";
import ArrowRight from "./arrowRight";
import Mic from "./mic";
import Spotify from "./spotify";
import Music from "./music";
import WaveForm from "./waveForm";
import ProfileIcon from "./profileIcon"
import LoaderIcon from "./loaderIcon"
import FollowIcon from "./followIcon"
import SubscribeIcon from "./subscribeIcon"
import AcceptSubIcon from "./acceptSubIcon"
import DeclineSubIcon from "./declineSubIcon"
import MarkSeenIcon from "./markSeenIcon"
import DownvoteIcon from "./downvoteIcon"
import UpvoteIcon from "./upvoteIcon"
import MessageIcon from "./messageIcon"
import BookMark from "./bookMark"
import DotMenu from "./dotMenu"
import HeartIcon from "./heartIcon"
import PencilEdit from "./pencilEdit"
import RepostIcon from "./repostIcon"
import WaveFormProfile from "./waveFormProfile"
import ViewStyleWindows from "./viewStyleWindows"
import ViewStyleList from "./viewStyleList"
import BookmarkIcon from "./bookmarkIcon"
import LinkIcon from "./linkIcon"
import ZapIcon from "./zapIcon"
import ChevronDown from "./chevronDown"
import SearchBar from "./searchBar"
import TagsIcon from "./tagsIcon"
import PulseIcon from "./pulseIcon"
import HashtagIcon from "./hashtagIcon"
import StarIcon from "./starIcon"
import KeyIcon from "./keyIcon"
import LogOutIcon from "./logOutIcon"
import BugIcon from "./bugIcon"
import ChangePrpofileIcon from "./changeProfileImg"
import LocPoint from "./locPoint"
import SeenIcon from "./seenIcon"
import AddImageIcon from "./addImageIcon"

const Icon = ({ name, style }) => {
  switch (name) {
    case "addImageIcon":
      return <AddImageIcon style={style} />;
    case "starIcon":
      return <StarIcon style={style} />;
    case "seenIcon":
      return <SeenIcon style={style} />;
    case "locPoint":
      return <LocPoint style={style} />;
    case "changeProfileIcon":
      return <ChangePrpofileIcon style={style} />;

    case "keyIcon":
      return <KeyIcon style={style} />;
    case "logOutIcon":
      return <LogOutIcon style={style} />;
    case "bugIcon":
      return <BugIcon style={style} />;
    case "hashtagIcon":
      return <HashtagIcon style={style} />;
    case "linkIcon":
      return <LinkIcon style={style} />;
    case "pulseIcon":
      return <PulseIcon style={style} />;
    case "tagsIcon":
      return <TagsIcon style={style} />;
    case "searchBar":
      return <SearchBar style={style} />;
    case "chevronDown":
      return <ChevronDown style={style} />;
    case "zapIcon":
      return <ZapIcon style={style} />;
    case "bookmarkIcon":
      return <BookmarkIcon style={style} />;
    case "viewStyleList":
      return <ViewStyleList style={style} />;
    case "viewStyleWindows":
      return <ViewStyleWindows style={style} />;
    case "dotMenu":
      return <DotMenu style={style} />;
    case "waveFormProfile":
      return <WaveFormProfile style={style} />;
    case "repostIcon":
      return <RepostIcon style={style} />;
    case "pencilEdit":
      return <PencilEdit style={style} />;
    case "heartIcon":
      return <HeartIcon style={style} />;
    case "bookMark":
      return <BookMark style={style} />;
    case "messageIcon":
      return <MessageIcon style={style} />;
    case "messageIcon":
      return <MessageIcon style={style} />;
    case "downvoteIcon":
      return <DownvoteIcon style={style} />;
    case "upvoteIcon":
      return <UpvoteIcon style={style} />;
    case "waveForm":
      return <WaveForm style={style} />;
    case "markSeenIcon":
      return <MarkSeenIcon style={style} />;
    case "declineSubIcon":
      return <DeclineSubIcon style={style} />;
    case "acceptSubIcon":
      return <AcceptSubIcon style={style} />;
    case "subscribeIcon":
      return <SubscribeIcon style={style} />;
    case "followIcon":
      return <FollowIcon style={style} />;
    case "loaderIcon":
      return <LoaderIcon style={style} />;
    case "profileIcon":
      return <ProfileIcon style={style} />;
    case "mountains":
      return <Mountains style={style} />;
    case "x":
      return <X style={style} />;
    case "plus":
      return <Plus style={style} />;
    case "search":
      return <Search style={style} />;
    case "user":
      return <User style={style} />;
    case "lll":
      return <Lll style={style} />;
    case "notification":
      return <Notification style={style} />;
    case "pulse":
      return <Pulse style={style} />;
    case "arrow_back":
      return <ArrowBack style={style} />;
    case "arrow_forward":
      return <ArrowForward style={style} />;
    case "map":
      return <Map style={style} />;
    case "more":
      return <More style={style} />;
    case "atom":
      return <Atom style={style} />;
    case "duplicate":
      return <Duplicate style={style} />;
    case "save":
      return <Save style={style} />;
    case "controls":
      return <Controls style={style} />;
    case "play":
      return <Play style={style} />;
    case "pause":
      return <Pause style={style} />;
    case "loader":
      return <Loader style={style} />;
    case "feed":
      return <Feed style={style} />;
    case "cog":
      return <Cog style={style} />;
    case "arrow_right":
      return <ArrowRight style={style} />;
    case "fileIcon":
      return <FileIcon style={style} />;
    case "trashIcon":
      return <TrashIcon style={style} />;
    case "appleIcon":
      return <AppleIcon style={style} />;
    case "spotifyIcon":
      return <SpotifyIcon style={style} />;
    case "loopIcon":
      return <LoopIcon style={style} />;
    case "stopRec":
      return <StopRec style={style} />;
    case "mic":
      return <Mic style={style} />;
    case "spotify":
      return <Spotify style={style} />;
    case "music":
      return <Music style={style} />;
    default:
      return;
  }
};

export default Icon;
