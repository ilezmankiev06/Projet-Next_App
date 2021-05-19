import { GetServerSideProps } from "next";

const Games: React.FC<{ game: string }> = ({ game }) => {
  return <div>{game}</div>;
};

export default Games;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const games = context.params.category;
  const response = await fetch(
    `https://localhost:3000/games?game=${games}`
  );
  const game = await response.json();
  console.log(game);
  return {
    props: {
      game: game.value,
    },
  };
};
