export const AiringUpcoming = `query ($page: Int, $seasonYear: Int, $season: MediaSeason, $sort: [MediaSort]){
    Page(page:$page){
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(seasonYear: $seasonYear, season: $season, format: TV, sort: $sort) {
        id
        coverImage {
          large
        }
        description
        episodes
        nextAiringEpisode {
          id
          airingAt
          timeUntilAiring
          episode
        }
        status
        title {
          romaji
        }
      }
    }
}`;

export const Birthdays = `
query ($page: Int) {
  Page(page: $page) {
      characters(isBirthday: true, sort: FAVOURITES_DESC) {
          name {
              full
          }
          description(asHtml: true)
          image {
              large
              medium
          }
          siteUrl
          favourites
          media {
              nodes {
                  title {
                      romaji
                  }
              }
          }
      }
  }
}
`;

export const Schedule = `
query ($page: Int, $start: Int, $end: Int) {
  Page(page:$page){
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    airingSchedules(airingAt_greater: $start, airingAt_lesser: $end, sort: TIME) {
      media {
          id
          format
          averageScore
          coverImage {
            large
         }
         description
         episodes
         nextAiringEpisode {
            id
            airingAt
            timeUntilAiring
            episode
         }
         title {
            romaji
         }
      }
    }
  }
}
`;

export const Trending = `query ($page: Int) {
  Page(page:$page){
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    media(type: ANIME, sort: TRENDING_DESC) {
      id
      title {
        romaji
      }
      description
      status
      episodes
      source
      genres
      averageScore
      popularity
      siteUrl
      coverImage {
        large
      }
      format
      trending
    }
  }
}`;

export const Anime = `
query ($id: Int, $type: MediaType) {
  Media(id: $id, type: $type) {
    id
    siteUrl
    title {
        romaji
        english
        native
    }
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    coverImage {
        large
        medium
    }
    season
    seasonYear
    status
    description
    isAdult
    characters {
      nodes {
        id
        name {
          full
        }
        image {
          large
        }
        siteUrl
      }
    }
    studios {
      nodes {
          id
          name
          siteUrl
        }
    }
    genres
    popularity
    averageScore
    episodes
  }
}
`;

export const User = `
query($id: Int) {
  User(id: $id) {
    id
    name
    about
    avatar {
      large
    }
    statistics {
      anime {
        count
        episodesWatched
      }
    }
    favourites {
      anime {
        nodes {
          id
          title {
            romaji
          }
          coverImage {
            large
          }
        }
      }
    }
  }
}
`;

export const Studio = `
query($id: Int) {
  Studio(id: $id) {
    id
    name
    favourites
    media {
      nodes {
        id
        title {
          romaji
        }
        type
        coverImage {
          large
        }
      }
    }
  }
}
`;

export const Character = `
query($id: Int) {
  Character(id: $id) {
    id
    name {
      full
    }
    image {
      large
    }
    description(asHtml: true)
    gender
    dateOfBirth {
      year
      month
      day
    }
    age
    media(type: ANIME) {
      nodes {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
      }
    }
    favourites
  }
}
`;

export const Genre = `
query($page: Int, $genre: Array) {
  Page(page: $page) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    media(genre_in: [$genre], sort: TRENDING_DESC) {
      id
      title {
        romaji
      }
      coverImage {
        large
      }
    }
  }
}
`;

export const SearchAnime = `
query($page: Int, $search: String) {
  Page(page: $page) {
    media(search: $search, type: ANIME) {
      id
      title {
        romaji
      }
      coverImage {
        large
      }
    }
  }
}
`;

export const SearchCharacter = `
query($page: Int, $search: String) {
  Page(page: $page) {
    characters(search: $search) {
      id
      name {
        full
      }
      image {
        large
      }
      media {
        nodes {
          title {
            romaji
          }
        }
      }
    }
  }
}
`;

export const SearchUser = `
query($page: Int, $search: String) {
  Page(page: $page) {
    users(search: $search) {
      id
      name
      avatar {
        large
      }
    }
  }
}
`;
