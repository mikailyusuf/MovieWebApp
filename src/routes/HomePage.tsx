import {
  Box,
  Text,
  Input,
  Heading,
  VStack,
  Divider,
  Flex,
  HStack,
  Container,
  InputGroup,
  InputLeftElement,
  Avatar,
  WrapItem,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";
import axiosInstance from "../data/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import { AuthContext } from "../context/AuthContext";

interface MovieApiResponse {
  results: Movie[];
}

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  backdrop_path: string;
  poster_path: string;
}
const HomePage = () => {
  const { currentUser } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchedMovies, setSearchedMovies] = useState<Movie[]>();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    seachMovie(searchTerm);
  }, [searchTerm]);

  const fetchMovies = async (): Promise<Movie[]> => {
    const response = await axiosInstance.get<MovieApiResponse>(
      "/trending/movie/day"
    );
    return response.data.results;
  };

  const seachMovie = async (query: string) => {
    const searchParams = {
      language: "en-US",
      include_adult: false,
      query: query,
      page: 1,
    };
    await axiosInstance
      .get<MovieApiResponse>("/search/movie", { params: searchParams })
      .then((data) => {
        setSearchedMovies(data.data.results);
      });
    return;
  };

  const fetchDiscoverMovies = async (): Promise<Movie[]> => {
    const queryParams = {
      include_adult: "false",
      include_video: "false",
      language: "en-US",
      page: "1",
      sort_by: "popularity.desc",
      with_release_type: "2|3",
    };
    const response = await axiosInstance.get<MovieApiResponse>(
      "/discover/movie",
      { params: queryParams }
    );
    return response.data.results;
  };

  const {
    data: trendingMovies,
    error,
    isLoading,
  } = useQuery<Movie[], Error>({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  const { data: discoverMovies } = useQuery<Movie[], Error>({
    queryKey: ["discoverMovies"],
    queryFn: fetchDiscoverMovies,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container maxW="1200">
      <Flex flexDirection="column">
        <Box>
          <HStack
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={2}
          >
            <Box display="flex" alignItems="center" justifyContent="center">
              <Heading>NaijaFlex</Heading>
              <InputGroup size="md" ml={40}>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Search here"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </InputGroup>
            </Box>

            <HStack>
              <Text mr={4}>Hello {currentUser?.user.fullname}</Text>
              <WrapItem>
                <Avatar
                  size="lg"
                  name={currentUser?.user.fullname}
                  src={currentUser?.user.avatar}
                />{" "}
              </WrapItem>
            </HStack>
          </HStack>
          <Divider orientation="horizontal" mt={2} />
        </Box>
        {searchTerm === "" ? (
          <VStack mt={8} alignItems="flex-start">
            <MovieGrid
              sectionName="Trending Movies"
              movies={trendingMovies || []}
            />

            <MovieGrid
              sectionName="Discover Movies"
              movies={discoverMovies || []}
            />
          </VStack>
        ) : (
          <MovieGrid sectionName={searchTerm} movies={searchedMovies || []} />
        )}
      </Flex>
    </Container>
  );
};

export default HomePage;
