import { Movie } from "../../routes/HomePage";
import MovieGrid from "../MovieGrid";
import { VStack, Heading } from "@chakra-ui/react";

interface Props {
  movies: Movie[];
  sectionName: string;
}
const SearchGrid = ({ movies }: Props) => {
  return (
    <VStack alignItems="flex-start">
      <Heading>Trending Movies</Heading>
      <MovieGrid movies={movies} sectionName="" />
    </VStack>
  );
};

export default SearchGrid;
