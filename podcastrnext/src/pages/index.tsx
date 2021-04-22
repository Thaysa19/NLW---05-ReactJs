import { GetStaticProps } from "next";
import Link from "next/link"
import Image from "next/image";
import { api } from "../services/api";
import { ConverttimeString } from "../utils/convertDurationToTimeString";
import styles from "./home.module.scss";
type Episode = {
  id: string;
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedat: number;
};
type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
};

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Ultimos Lançamentos</h2>
        <ul>
          {latestEpisodes.map((episode) => {
            return (
              <li key={episode.id}>
                <Image
                  width={120}
                  height={120}
                  src={episode.thumbnail}
                  alt={episode.title}
                  objectFit="cover"
                />
                <div className={styles.episodeDetails}>
                <Link href={`/episodes/${episode.id}`}>
                <a>{episode.title}</a>
                </Link>
                  
                  <p>{episode.members}</p>
                  <span>{episode.publishedat}</span>
                  <span>{episode.durationAsString}</span>
                </div>
                <button type="button">
                  <img src="/play-green.svg" alt="Tocar Episodio" />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
      <section className={styles.allEpisodes}>
        <h2>Todos os episódios</h2>
        <table cellSpacing={0}>
          <thead>
            <tr>
               <th></th>
            <th>Podcastr</th>
            <th>Integrantes</th>
            <th>Data</th>
            <th>Duração</th>
            <th></th>
            </tr>
           
          </thead>
          <tbody>
            {allEpisodes.map((episode) => {
              return (
                <tr key={episode.id}>
                  <td>
                    <Image
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    
                  <Link href={`/episodes/${episode.id}`}>
                <a>{episode.title}</a>
                </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td>{episode.publishedat}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button type="button">
                      <img src="/play-green.svg" alt="Tocar" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedat: episode.published_at,
      duration: episode.file.duration,
      durationAsString: ConverttimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url,
    };
  });
  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);
  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 + 60 * 8,
  };
};
