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
        averageScore
        coverImage {
          large
          medium
        }
        description
        episodes
        endDate {
          year
          month
          day
        }
        genres
        nextAiringEpisode {
          id
          airingAt
          timeUntilAiring
          episode
        }
        popularity
        season
        siteUrl
        source
        startDate {
          year
          month
          day
        }
        status
        studios(isMain: true) {
          nodes {
            id
            name
          }
        }
        title{
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
          description 
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

export const Profile = `
query ($name: String) {
  User(name: $name) {
      statistics {
        anime {
          count
          minutesWatched
          episodesWatched
        }
      }
    }
    MediaListCollection(userName: $name, type: ANIME) {
      lists {
        name
        entries {
          status
          media {
              title {
                  romaji
              }
              siteUrl
              id
              averageScore
              coverImage {
                large
                medium
             }
             description
             episodes
             popularity
             source
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
            medium
         }
         description
         episodes
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
         genres
         nextAiringEpisode {
            id
            airingAt
            timeUntilAiring
            episode
         }
         popularity
         season
         siteUrl
         source
         status
         studios(isMain: true) {
            nodes {
                id
                name
            }
         }
         title {
            romaji
         }
      }
    }
  }
}
`;
