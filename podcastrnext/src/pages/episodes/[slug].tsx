import {GetStaticPaths, GetStaticProps} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {api} from "../../services/api";
import {useRouter} from "next/router"
import { ConverttimeString } from '../../utils/convertDurationToTimeString';
import styles from "./episode.module.scss";
import { usePlayer } from '../../contexts/PlayerContext';
import Head from 'next/head';


type Episode={
    id: string;
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    durationAsString: string;
    url: string;
    publishedat: number;
    description: string;
};
type EpisodeProps ={
    episode: Episode;
}
export default function Episode({episode}: EpisodeProps){
    const router = useRouter();
    const {play}= usePlayer();
    if (router.isFallback){
        return <p>Carregando...</p>
    }
    return(
        <div className={styles.episode}>
            <Head>
                <title>{episode.title}</title>
            </Head>

            <div className={styles.thumbnailContainer}>
                <Link href="/">
                    <button type='button'>
                <img src="/arrow-left.svg" alt="Voltar"/>
            </button>
                </Link>
            
            <Image width={700} height={160} src={episode.thumbnail} objectFit="cover"/>
            <button type="button" onClick = {()=> play(episode)}>
                <img src="/play.svg" alt="Tocar"/>
            </button>
            </div>
            <header>
               <h1>{episode.title}</h1> 
               <span>{episode.members}</span>
               <span>{episode.publishedat}</span>
               <span>{episode.durationAsString}</span>
            </header>
            <div className={styles.episodeDescripition} dangerouslySetInnerHTML={{__html : episode.description}}/>
                
           
        </div>
       
    )
}
export const getStaticPaths: GetStaticPaths = async()=>{
    return{
        paths:[],
        fallback : true,
    }
}
export const getStaticProps: GetStaticProps = async(ctx)=>{
    const {slug} = ctx.params
    const {data} = await api.get(`/episodes/${slug}`)
    const episode={
        id: data.id,
      title: data.title,
      thumbnail: data.thumbnail,
      members: data.members,
      publishedat: data.published_at,
      duration: data.file.duration,
      durationAsString: ConverttimeString(Number(data.file.duration)),
      description: data.description,
      url: data.file.url,
    };
  return{
      props:{
       episode,
      }, 
      revalidate: 60 *60 *24,
  }
}