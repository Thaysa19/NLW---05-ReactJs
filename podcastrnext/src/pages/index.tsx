import {GetStaticProps} from "next"
import Image from "next/image"
import { api } from "../services/api"
import { ConverttimeString } from "../utils/convertDurationToTimeString"
import styles from "./home.module.scss";
type Episode = {
   id: string;
    title: string;
    members: string;
    thumbnail: string,
    duration: number,
    durationAsString:string,
    url: string,
    publisehedat: number,


}
type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}

export default function Home( {latestEpisodes, allEpisodes}: HomeProps) {
  return (
    <div className={styles.homepage}>
       <section className={styles.lastEpisodes}>
         <h2>Ultimos Lançamentos</h2>
         <ul>
          {latestEpisodes.map(episode => {
             return(
               <li key={episode.id}>
                 <Image width={192} height={192} src={episode.thumbnail} alt={episode.title}/>
                  <div className={styles.episodeDetails}>
                    <a href="">{episode.title}</a>
                    <p>{episode.members}</p>
                    <span>{episode.publisehedat}</span>
                    <span>{episode.durationAsString}</span>
                  </div>
                  <button type="button">
                    <img src="/play-green.svg" alt="Tocar Episodio"/>
                  </button>
               </li>
             )
          }
           
            )}
         </ul>
       </section>
       <section className={styles.allEpisodes}></section>
    </div>
 
  )
}
export const getStaticProps: GetStaticProps = async() => {
  const {data} = await api.get('episodes', {
    params : {
      _limit : 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })
  
  const episodes = data.map(episode =>{
    return{
      id : episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members : episode.members,
     publishedat: episode.published_at,
     duration : episode.file.duration,
     durationAsString: ConverttimeString(Number(episode.file.duration)),
     description : episode.description,
     url: episode.file.url,
    };
  })
  const latestEpisodes = episodes.slice(0,2);
  const allEpisodes = episodes.slice(2, episodes.length);
  return{
    props:{
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 +60 *8,
  }}

