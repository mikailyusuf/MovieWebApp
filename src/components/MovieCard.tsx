import {
  Image,
  Text,
  Box,
} from "@chakra-ui/react";

import { Movie } from "../routes/HomePage";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image
        objectFit="cover"
        overflow="hidden"
        src={"https://image.tmdb.org/t/p/w500/" + movie.backdrop_path}
      />
      <Text p={2}>{movie.title}</Text>
    </Box>
  );
};

export default MovieCard;
