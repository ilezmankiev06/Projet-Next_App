import { connectToDatabase } from "../util/mongodb";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

export type Platform = {
  name: string;
  platform_logo_url: string;
  slug: string;
  [key: string]: any;
};

export default function Games({ platforms }) {
  return (
    <div className="container">
      <br />
      <br />
      <br />
      <h1 className="text-center" style={{color: "white"}}>Platforms</h1>
      <br />
      <div className="row row-cols-1 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 g-4">
        {platforms.map((platform, id) => {
          if (platform.platform_logo_url === undefined) {
            return (
              <div>
                <div className="card" key={platform.id}>
                  <Link href={`/platforms/${platform.slug}`}><img
                    className="card-img-top"
                    src="https://thumbs.dreamstime.com/z/d-les-gens-homme-les-gens-pensant-avec-les-points-d-interrogation-rouges-au-dessus-de-sa-t%C3%AAte-plus-de-30047842.jpg"
                    width="300"
                    height="350"
                  /></Link>
                  <div className="card-body">
                    <h1 className="card-title">{platform.name}</h1>
                    <p className="card-text">{platform.summary}</p>
                  </div>
                  <div className="card-footer">
                    <Link href={`/platforms/${platform.slug}`}>See more!</Link>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div>
                <div className="card" key={id}>
                  <Link href={`/platforms/${platform.slug}`}>
                    <img
                      className="card-img-top"
                      src={platform.platform_logo_url}
                      width="300"
                      height="350"
                    />
                  </Link>
                  <div className="card-body">
                    <h1 className="card-title">{platform.name}</h1>
                    <p className="card-text">{platform.summary}</p>
                  </div>
                  <div className="card-footer">
                    <Link href={`/platforms/${platform.slug}`}>See more!</Link>
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
export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const platform = await db.collection("games").find().toArray();
  const platforms: Platform[] = [];
  platform.forEach((game) => {
    const platform = platforms.find(
      (platform) => platform.slug === game.platform.slug
    );
    if (!platform) {
      platforms.push(game.platform);
    }
  });
  // console.log(platforms);
  return {
    props: {
      platforms: platforms,
    },
  };
}
