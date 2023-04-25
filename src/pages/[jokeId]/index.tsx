import { GetStaticProps, NextPage } from "next";
import EditForm from "@/components/layout/EditForm";
import { Box } from "@mui/material";
import { getJokeById, getJokes } from "@/services/jokeService";
import { IJoke } from "@/models/Joke";

const JokeDetails: NextPage = ({ data }) => {
  return (
    <main>
      <Box display="flex" alignItems="center" justifyContent="center">
        <EditForm data={data} />
      </Box>
    </main>
  );
};

export default JokeDetails;

export const getStaticPaths = async () => {
  const jokes = await getJokes();

  const paths = jokes.map((joke) => ({
    params: { jokeId: joke.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = Number(params?.jokeId);

  const data: IJoke = await getJokeById(id);

  return {
    props: { data },
  };
};
