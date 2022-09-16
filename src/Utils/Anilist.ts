import axios from "axios";

const date = new Date();

export function AniFetch(query: string, variables: object) {
  return axios
    .post(
      "https://graphql.anilist.co",
      {
        query,
        variables,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
    .then((response: any) => response.data)
    .catch((err: Error) => console.log(err));
}

export function Season() {
  const month = date.getMonth();

  if (month < 3) {
    return { seasonYear: date.getFullYear(), season: "WINTER" };
  } else if (month < 6) {
    return { seasonYear: date.getFullYear(), season: "SPRING" };
  } else if (month < 9) {
    return { seasonYear: date.getFullYear(), season: "SUMMER" };
  } else {
    return { seasonYear: date.getFullYear(), season: "FALL" };
  }
}

export function NextSeason() {
  const month = date.getMonth();

  if (month < 3) {
    return { seasonYear: date.getFullYear(), season: "SPRING" };
  } else if (month < 6) {
    return { seasonYear: date.getFullYear(), season: "SUMMER" };
  } else if (month < 9) {
    return { seasonYear: date.getFullYear(), season: "FALL" };
  } else {
    return { seasonYear: date.getFullYear() + 1, season: "WINTER" };
  }
}
