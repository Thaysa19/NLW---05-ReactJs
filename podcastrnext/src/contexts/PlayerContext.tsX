 import {createContext} from 'react';
 import {useState } from 'react';
 type Episode ={
 title: string;
 members: string;
 thumbnail: string;
 duration: number;
 url:string;
 };
 type PlayerContextData = {
 episodeList: Episode[];
 currentEpisodeIndex: number;
 isPlaying: boolean;
 play: (episode: Episode) => void;
 togglePlay : ()=> void;
 setPlayingState: (state:boolean)=> void;
 };
export const PlayerContext = createContext({} as PlayerContextData);
export function PlayerContextProvider(){
   
        const [episodeList, setEpisodeList] = useState([]);
        const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
        const [isPlaying, setIsPlaying] = useState(false);
        function togglePlay(){
          setIsPlaying(!isPlaying);
        }
        function play(episode){
          setEpisodeList([episode]);
          setCurrentEpisodeIndex(0);
          setIsPlaying(true);
        }
        function setPlayingState(state: boolean){
        setIsPlaying(state);
        }
          return(
            <PlayerContext.Provider value={{episodeList, currentEpisodeIndex,play, isPlaying, togglePlay, setPlayingState}}>

                </PlayerContext.Provider>)
}