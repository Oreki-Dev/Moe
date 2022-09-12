import axios from "axios";
import cheerio from "cheerio";

const date = new Date();
const NEWS_URL_URI = "https://myanimelist.net/news?p=";

const byProperty = (prop: any) => {
  return (a: any, b: any) => {
    return typeof a[prop] === "number"
      ? a[prop] - b[prop]
      : a[prop] < b[prop]
      ? -1
      : a[prop] > b[prop]
      ? 1
      : 0;
  };
};

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

export function News(nbNews: number) {
  return new Promise((resolve, reject) => {
    const maxPage = Math.ceil(nbNews / 20) + 1;

    const promises = [];

    for (let i = 1; i < maxPage; ++i) {
      promises.push(axios.get(`${NEWS_URL_URI}${i}`));
    }

    axios
      .all(promises)
      .then(
        axios.spread(function () {
          const result = [];

          for (let i = 0; i < maxPage - 1; ++i) {
            const { data } = arguments[`${i}`];
            const $ = cheerio.load(data);

            const pageElements = $(".news-unit-right");

            const links: any = [];
            $(".image-link").each(function () {
              links.push($(this).attr("href"));
            });

            const titles = pageElements
              .find("p.title")
              .text()
              .split("\n      ");
            titles.shift();
            const texts = pageElements
              .find("div.text")
              .text()
              .split("\n      ");
            texts.shift();

            for (let i = 0, l = titles.length; i < l; ++i) {
              titles[i] = titles[i].slice(0, -5);
              texts[i] = texts[i].slice(0, -5);
            }

            for (let i = 0, l = titles.length; i < l; ++i) {
              const tmp = links[i].split("/");
              result.push({
                title: titles[i],
                link: links[i],
                description: texts[i],
                newsNumber: tmp[tmp.length - 1],
              });
            }
          }

          result.sort(byProperty("newsNumber"));
          result.reverse();
          resolve(result.slice(0, nbNews));
        })
      )
      .catch((err: any) => reject(err));
  });
}
