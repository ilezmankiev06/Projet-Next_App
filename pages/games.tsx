import { connectToDatabase } from "../util/mongodb";
import Link from "next/link";
export default function Games({ games }) {
  return (
    <div>
      <h1>Top 20 Movies of All Time</h1>
      <ul>
        {games.map((game, id) => {
          if (game.cover === undefined) {
            return (
              <Link href={`/games/${game}`}>
                <div className="card" key={id}>
                  <li key={game.id}>
                    {game.name}, {game.price / 100}$
                    <img
                      src="https://thumbs.dreamstime.com/z/d-les-gens-homme-les-gens-pensant-avec-les-points-d-interrogation-rouges-au-dessus-de-sa-t%C3%AAte-plus-de-30047842.jpg"
                      width="300"
                      height="300"
                      alt=""
                    />
                  </li>
                </div>
              </Link>
            );
          } else {
            return (
              <Link href={`/games/${game}`}>
                <div className="card" key={id}>
                  <li key={game.id}>
                    {game.name}, {game.price / 100}$
                    <img src={game.cover.url} alt="" />
                  </li>
                </div>
              </Link>
            );
          }
        })}
      </ul>
    </div>
  );
}
export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const games = await db.collection("games").find().toArray();
  console.log(games);
  return {
    props: {
      games: JSON.parse(JSON.stringify(games)),
    },
  };
}
