import { SimpleGrid, VStack, Heading } from "@chakra-ui/react";
import MovieCard from "./MovieCard";
import { Movie } from "../routes/HomePage";
interface Props {
  sectionName: string;
  movies: Movie[];
}
const MovieGrid = ({ movies, sectionName }: Props) => {
  return (
    <VStack alignItems="flex-start" mt={8}>
      <Heading>{sectionName}</Heading>
      <SimpleGrid columns={3} spacing={10}>
        {movies?.map((item) => (
          <MovieCard movie={item} />
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default MovieGrid;
