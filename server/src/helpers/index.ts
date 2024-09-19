import { ErrorMain } from '../types/Error'
import { Series } from '../types/interface/Series'

export function checkBadRequest(fields: string[], errorMessage: string) {

  const missingFields = fields.filter(field => !field)

  if (missingFields.length > 0) {
    const error: ErrorMain = {
      status: 400,
      numberError: 102,
      message: `Bad request: ${errorMessage}`,
      value: missingFields.join(", ")
    }

    throw error
  }
}

export const temporaryListSeries: Partial<Series>[] = [
  {
    data: {
      title: 'Дом Дракона',
      originalTitle: 'House of the Dragon',
      discription: 'В далекой галактике группа повстанцев борется против империи, во главе которой стоит злой Дарт Вейдер.',
      ageRestriction: 16,
      dateRelease: '1977-05-25',
      genres: ['Фантастика', 'Приключения', 'Боевик'],
      actors: ['Марк Хэмилл', 'Харрисон Форд', 'Кэрри Фишер'],
      directors: ['Джордж Лукас'],
      country: 'США',
      production: 'HBO'
    },
    rating: {
      raitingAmediateka: 8.5,
      ratingImdb: 8.6
    },
    actionsData: {
      favorites: ['пользователь1', 'пользователь2'],
      liked: ['пользователь3', 'пользователь4'],
      disliked: []
    },
    imgBg: '../../../client/public/hotd/imgBgHOTD.jpg',
    trailer: 'https://example.com/star-wars-trailer.mp4',
    seasons: [
      {
        numberOfSeasons: 1,
        episodes: [
          {
            link: '#',
            episodeNumber: 1,
            img: '../../../client/public/hotd/hotds1e1.jpg',
            title: 'Наследники дракона'
          },
          {
            link: '#',
            episodeNumber: 2,
            img: '../../../client/public/hotd/hotds1e2.jpg',
            title: 'Порочный принц'
          },
          {
            link: '#',
            episodeNumber: 3,
            img: '../../../client/public/hotd/hotds1e3.jpg',
            title: 'Второй своего имени'
          },
          {
            link: '#',
            episodeNumber: 4,
            img: '../../../client/public/hotd/hotds1e4.jpg',
            title: 'Король Узкого Моря'
          },
          {
            link: '#',
            episodeNumber: 5,
            img: '../../../client/public/hotd/hotds1e5.jpg',
            title: 'Мы путь осветим'
          },
          {
            link: '#',
            episodeNumber: 6,
            img: '../../../client/public/hotd/hotds1e6.jpg',
            title: 'Принцесса и королева'
          },
          {
            link: '#',
            episodeNumber: 7,
            img: '../../../client/public/hotd/hotds1e7.jpg',
            title: 'Дрифтмарк'
          },
          {
            link: '#',
            episodeNumber: 8,
            img: '../../../client/public/hotd/hotds1e8.jpg',
            title: 'Лорд Приливов'
          },
          {
            link: '#',
            episodeNumber: 9,
            img: '../../../client/public/hotd/hotds1e9.jpg',
            title: 'Зеленый Совет'
          },
          {
            link: '#',
            episodeNumber: 10,
            img: '../../../client/public/hotd/hotds1e10.jpg',
            title: 'Черная королева'
          }
        ],
        imgBg: '../../../client/public/hotd/imgBgHOTD.jpg',
        discription: `Долгожданный приквел легендарного сериала «Игра престолов». В основу «Дома Дракона» лег первый том книги Джорджа Р.Р. Мартина «Пламя и кровь», где раскрывается история династии Таргариенов. В частности, семейство ввязывается в жестокую гражданскую войну, которая получила название «Танец драконов». Среди режиссеров сериала — Мигель Сапочник, ранее работавший над «Игрой престолов». Главные роли исполнили Мэтт Смит («Доктор Кто»), Эмма Д’Арси («Мисс Плохое Поведение») и Оливия Кук («Медленные лошади»). Автор оригинальной книги Джордж Мартин описывает сериал «Дом Дракона» как «шекспировскую трагедию», где нет однозначно положительных героев. То есть все в лучших традициях невероятной вселенной «Игры престолов»!`
      }
    ]
  }
]


