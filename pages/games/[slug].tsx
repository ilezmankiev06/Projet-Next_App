import { GetServerSideProps } from "next";
import { connectToDatabase } from "../../util/mongodb";
import Link from "next/link";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Game({ games }) {
  const [flip, setFlip] = useState(false);
  console.log(games);
  return (
    <div className="container">
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 g-4">
        {games.map((game, id) => {
          if (game.cover === undefined) {
            return (
              <div className="col w-40">
                <div className="card" key={game.id}>
                  <img
                    className="card-img-left"
                    src="https://thumbs.dreamstime.com/z/d-les-gens-homme-les-gens-pensant-avec-les-points-d-interrogation-rouges-au-dessus-de-sa-t%C3%AAte-plus-de-30047842.jpg"
                    width="300"
                    height="400"
                    alt=""
                  />
                  <div className="card-body">
                    <h1 className="card-title">{game.name}</h1>
                    <p className="card-summary">{game.summary}</p>
                    <p className="card-price">{game.price / 100}$</p>
                  </div>
                  <br />
                  <br />
                  <div className="card-footer">
                    <Link href={`/games/${game.slug}`}>Achat à suivre</Link>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div className="col">
                <div className="card" key={id}>
                  <img className="card-img-left" src={game.cover.url} width="300" height="400" alt="" />
                  <div className="card-body">
                    <h1 className="card-title">{game.name}</h1>
                    <p className="card-summary">{game.summary}</p>
                    <p className="card-price">{game.price / 100}$</p>
                  </div>
                  <div className="card-footer">
                    <Link href={`/games/${game.slug}`}>Achat à suivre</Link>
                  </div>
                </div>
                <div>
                  <button className="btn btn-primary" onClick={() => setFlip(!flip)}>
                    <div className="text-center">
                      {flip
                        ? game.screenshots.map((value) => (
                          <div className="container">
                              <div className="col">
                            <br /><img src={value} alt="" /></div></div>
                          ))
                        : "screenshots"}
                    </div>
                  </button>
                </div>
              </div>
            );
          }
        })}
      </div>
      <style jsx>{`
        .card {
          width: 80rem;
          height: 45rem;
        }
      `}</style>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query.slug;
  const { db } = await connectToDatabase();
  const games = await db.collection("games").find({ slug: query }).toArray();
  console.log(games);
  return {
    props: {
      games: JSON.parse(JSON.stringify(games)),
    },
  };
};
