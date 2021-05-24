import { GetServerSideProps } from "next";
import { connectToDatabase } from "../../util/mongodb";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Platform_slug({ games }) {
  // console.log(games);
  return (
    <div className="container">
      <br />
      <br />
      <br />
      <br />
      <h1 className="text-center" style={{color: "white"}}>Platform Games</h1>
      <br />
      <div className="row row-cols-1 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 g-4">
        {games.map((game, id) => {
          if (game.cover === undefined) {
            return (
              <div className="col">
                <div className="card" key={game.id}>
                  <img
                    className="card-img-top"
                    src="https://thumbs.dreamstime.com/z/d-les-gens-homme-les-gens-pensant-avec-les-points-d-interrogation-rouges-au-dessus-de-sa-t%C3%AAte-plus-de-30047842.jpg"
                    width="300"
                    height="400"
                    alt=""
                  />
                  <div className="card-body">
                    <h1 className="card-title">{game.name}</h1>
                    <p className="card-price">{game.price / 100}$</p>
                  </div>
                  <div className="card-footer">
                    <Link href={`/games/${game.slug}`}>See more!</Link>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div className="col">
                <div className="card" key={id}>
                  <Link href={`/games/${game.slug}`}>
                    <img
                      className="card-img-top"
                      src={game.cover.url}
                      width="300"
                      height="400"
                      alt=""
                    />
                  </Link>
                  <div className="card-body">
                    <h1 className="card-title">{game.name}</h1>
                    <p className="card-price">{game.price / 100}$</p>
                  </div>
                  <div className="card-footer">
                    <Link href={`/games/${game.slug}`}>See more!</Link>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
      <style jsx>{`
        .card {
          width: 25rem;
          height: 40rem;
          border: solid black 2px;
          cursor: pointer;
        }
        .card:hover {
          transform: scale(1.1);
          transition: linear 0.8s;
          z-index: 1;
          background-color: grey;
          color: white;
          border: solid black 2px;
        }
        .card-footer {
          border-top: solid black 2px;
        }
        .card-img-top {
          border-bottom: solid black 2px;
        }
      `}</style>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query.id;
  const { db } = await connectToDatabase();
  const games = await db
    .collection("games")
    .find({ "platform.slug": query })
    .toArray();
  console.log(games);
  return {
    props: {
      games: JSON.parse(JSON.stringify(games)),
    },
  };
};
