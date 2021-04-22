 import {createContext} from 'react';
 type Episode ={
 tittle: string;
 members: string;
 thumbnail: string;
 duration: string;
 url:string;
 };
 type PlayerContextData = {
 episodeList: Episode[];
 currentEpisodeIndex: number;
 };
export const PlayerContext = createContext({} as PlayerContextData);
  