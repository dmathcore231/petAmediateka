import { ErrorMain } from '../types/Error'
import { MediaContent } from '../types/interface/MediaContent'
import { Banner } from '../types/interface/Banner'
import { CardData } from '../types/interface/CardData'

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

export const temporaryListSeries: Partial<MediaContent>[] = [
  {
    type: 'series',
    seasons: [
      {
        numberOfSeasons: 1,
        episodes: [
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4',
            },
            episodeNumber: 1,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds1e1.jpg',
            title: 'Наследники дракона'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4',
            },
            episodeNumber: 2,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds1e2.jpg',
            title: 'Порочный принц'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4',
            },
            episodeNumber: 3,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds1e3.jpg',
            title: 'Второй своего имени'

          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4',
            },
            episodeNumber: 4,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds1e4.jpg',
            title: 'Король Узкого Моря'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4',
            },
            episodeNumber: 5,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds1e5.jpg',
            title: 'Мы путь осветим'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4',
            },
            episodeNumber: 6,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds1e6.jpg',
            title: 'Принцесса и королева'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4',
            },
            episodeNumber: 7,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds1e7.jpg',
            title: 'Дрифтмарк'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4',
            },
            episodeNumber: 8,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds1e8.jpg',
            title: 'Лорд Приливов'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4',
            },
            episodeNumber: 9,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds1e9.jpg',
            title: 'Зеленый Совет'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4',
            },
            episodeNumber: 10,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds1e10.jpg',
            title: 'Черная королева'
          }
        ],
        bg: {
          imgUrl: 'http://localhost:3000/public/series/hotd/imgBgS1.jpg',
          videoUrl: null
        },
        trailer: null,
        description: `
        Долгожданный приквел легендарного сериала «Игра престолов». В основу «Дома Дракона» лег первый том книги Джорджа Р.Р. Мартина «Пламя и кровь», где раскрывается история династии Таргариенов. В частности, семейство ввязывается в жестокую гражданскую войну, которая получила название «Танец драконов». Среди режиссеров сериала — Мигель Сапочник, ранее работавший над «Игрой престолов». Главные роли исполнили Мэтт Смит («Доктор Кто»), Эмма Д’Арси («Мисс Плохое Поведение») и Оливия Кук («Медленные лошади»). Автор оригинальной книги Джордж Мартин описывает сериал «Дом Дракона» как «шекспировскую трагедию», где нет однозначно положительных героев. То есть все в лучших традициях невероятной вселенной «Игры престолов»!`,
      },
      {
        numberOfSeasons: 2,
        episodes: [
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4',
            },
            episodeNumber: 1,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds2e1.jpg',
            title: 'Сын за сына'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4',
            },
            episodeNumber: 2,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds2e2.jpg',
            title: 'Рейнира Жестокая'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4',
            },
            episodeNumber: 3,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds2e3.jpg',
            title: 'Горящая Мельница'

          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4',
            },
            episodeNumber: 4,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds2e4.jpg',
            title: 'Красный дракон и золотой'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4',
            },
            episodeNumber: 5,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds2e5.jpg',
            title: 'Регент'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4',
            },
            episodeNumber: 6,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds2e6.jpg',
            title: 'Простой люд'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4',
            },
            episodeNumber: 7,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds2e7.jpg',
            title: 'Красный Посев'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4',
            },
            episodeNumber: 8,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds2e8.jpg',
            title: 'Королева на все времена'
          },
        ],
        bg: {
          imgUrl: 'http://localhost:3000/public/series/hotd/imgBgS2.jpg',
          videoUrl: null
        },
        trailer: null,
        description: `Приквел «Игры престолов» возвращается со вторым сезоном, в котором битва за власть в Вестеросе набирает грандиозные обороты. Главные герои «Дома Дракона» – Алисента (Оливия Кук) и Эйгон (Том Глинн-Карни), которые всеми силами пытаются оставить за собой Железный трон, и Рейнира (Эмма Д’Арси) с Деймоном (Мэтт Смит), которые копят силы на Драконьем Камне для захвата власти в королевстве, – готовы начать гражданскую войну. Важную роль в противостоянии «зеленых» и «черных» сыграет Криган (Том Тейлор), предок знаменитых Старков из оригинального сериала. Зрителей ждут заговоры и неожиданные союзы за столом переговоров, эпичные сражения на земле и в небе на огнедышащих драконах, а также любовь, предательства, подвиги и шекспировские страсти – в общем, всё то, за что так любят творчество Джорджа Мартина.`,
      },
    ],
    data: {
      title: {
        value: 'Дом Дракона',
        originalTitle: 'House of the Dragon',
        linkTitle: 'house-of-the-dragon'
      },
      badge: {
        type: 'secondary',
        title: 'Номинант «Эмми»'
      },
      description: {
        mainDescription: 'Долгожданный приквел легендарного сериала «Игра престолов». В основу «Дома Дракона» лег первый том книги Джорджа Р.Р. Мартина «Пламя и кровь», где раскрывается история династии Таргариенов. В частности, семейство ввязывается в жестокую гражданскую войну, которая получила название «Танец драконов». Среди режиссеров сериала — Мигель Сапочник, ранее работавший над «Игрой престолов». Главные роли исполнили Мэтт Смит («Доктор Кто»), Эмма Д’Арси («Мисс Плохое Поведение») и Оливия Кук («Медленные лошади»). Автор оригинальной книги Джордж Мартин описывает сериал «Дом Дракона» как «шекспировскую трагедию», где нет однозначно положительных героев. То есть все в лучших традициях невероятной вселенной «Игры престолов»!',
        prewiewDescription: 'Дом Дракона — серия второй серии «Игры престолов».'
      },
      about: {
        title: "Главная информация о «Доме дракона»",
        description: `После невероятного успеха телесериала «Игра престолов» стоило ожидать, что вселенная сериала обязательно дополнится приквелами и спин-оффами. Первым из них стал проект «Дом дракона» (в оригинале — House of Dragon), вышедший в 2022 году. Сейчас посмотреть все серии онлайн и в хорошем качестве можно в Амедиатеке — по подписке доступен весь сезон бесплатно — без дополнительных плат. А в этом материале подробнее расскажем о сюжете сериала.

        Новый сериал-приквел «Дом дракона» снят также по франшизе Джорджа Р. Р. Мартина «Песнь льда и пламени», а если быть точнее по главам книги «Пламя и кровь», которые описывают события гражданской войны с названием «Танец Драконов».

        Действие сериала «Дом дракона» переносит зрителей в фэнтези-континент Вестерос, знакомый фанатам по «Игре престолов». Однако события во всех сериях происходят примерно за 200 лет до событий всех сезонов известной истории. Кстати, именно по этой причине смотреть сериал можно и тем, кто еще не погружен в основной сюжет.

        История «Дома дракона» разворачивается вокруг рода Таргариенов, которые и объединили Семь Королевств. После смерти короля Визериса I сразу два героя заявили свои права на Железный трон — принцесса Рейнира Таргариен и принц Деймон Таргариен. Они заручились поддержкой разных партий, и началась жестокая война — ведь бесплатно и без жертв получить желаемое невозможно.

        Интересный факт: у сюжета сериала «Дом дракона» есть исторический прототип — война в Англии за престол в XII веке. Тогда за трон боролись племянник короля Генриха I Стефан и дочь Генриха Матильда.

      Также занимательный факт — в книге данный сюжет представлен как хорошая, но не очень объективная историческая хроника, написанная вестеросским историком. В сериале «Дом дракона» создатели, в том числе в лице режиссера Мигеля Сапочника, решили рассказать эту историю в хронологическом порядке для достоверности.`
      },
      ageRestriction: 18,
      dateRelease: '2022',
      genres: ['Драма', 'Мелодрама', 'Боевик', 'Фэнтези'],
      actors: ['Стив Туссэн', 'Мэтт Смит', 'Эмма Д’Арси', 'Пэдди Консидайн'],
      directors: ['Грег Яйтанс', 'Мигель Сапочник'],
      country: 'США',
      production: 'HBO'
    },
    rating: {
      raitingAmediateka: 9.1,
      ratingImdb: 8.8,
      ratingKinopoisk: 8.4
    },
    actionsData: {
      favorites: [],
      liked: [],
      disliked: []
    },
    bg: {
      imgUrl: 'http://localhost:3000/public/series/hotd/imgBgS2.jpg',
      videoUrl: 'http://localhost:3000/public/series/hotd/hotdBgVideo.mp4',
      imgResizeUrl: 'http://localhost:3000/public/series/hotd/resizeImgBgS2.jpg'
    },
    trailer: {
      quality360: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo360.mp4',
      quality720: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4',
      img: 'http://localhost:3000/public/series/hotd/hotdTrailer.jpg'
    },
    logoImg: 'http://localhost:3000/public/series/hotd/logo.png'
  },
  {
    type: 'series',
    seasons: [
      {
        numberOfSeasons: 1,
        episodes: [
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo720.mp4',
            },
            episodeNumber: 1,
            imgPreview: 'http://localhost:3000/public/series/nightTherapy/s1e1.jpg',
            title: 'Ночь - это день'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo720.mp4',
            },
            episodeNumber: 2,
            imgPreview: 'http://localhost:3000/public/series/nightTherapy/s1e2.jpg',
            title: 'Очень узкий мостик'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo720.mp4',
            },
            episodeNumber: 3,
            imgPreview: 'http://localhost:3000/public/series/nightTherapy/s1e3.jpg',
            title: 'В центре бури'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo720.mp4',
            },
            episodeNumber: 4,
            imgPreview: 'http://localhost:3000/public/series/nightTherapy/s1e4.jpg',
            title: 'Не замечать до последнего.'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo720.mp4',
            },
            episodeNumber: 5,
            imgPreview: 'http://localhost:3000/public/series/nightTherapy/s1e5.jpg',
            title: 'Крах'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo720.mp4',
            },
            episodeNumber: 6,
            imgPreview: 'http://localhost:3000/public/series/nightTherapy/s1e6.jpg',
            title: 'Ретроградный Меркурий, часть 1'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo720.mp4',
            },
            episodeNumber: 7,
            imgPreview: 'http://localhost:3000/public/series/nightTherapy/s1e7.jpg',
            title: 'Ретроградный Меркурий, часть 2'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo720.mp4',
            },
            episodeNumber: 8,
            imgPreview: 'http://localhost:3000/public/series/nightTherapy/s1e8.jpg',
            title: 'Когда придёт время, отпусти'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo720.mp4',
            },
            episodeNumber: 9,
            imgPreview: 'http://localhost:3000/public/series/nightTherapy/s1e8.jpg',
            title: 'Линия жизни'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo720.mp4',
            },
            episodeNumber: 10,
            imgPreview: 'http://localhost:3000/public/series/nightTherapy/s1e10.jpg',
            title: 'Это только начало'
          }
        ],
        bg: {
          imgUrl: 'http://localhost:3000/public/series/nightTherapy/bgImg.jpg',
          videoUrl: null,
        },
        trailer: null,
        description: null
      }
    ],
    data: {
      title: {
        value: 'Ночная терапия',
        originalTitle: 'Night Therapy',
        linkTitle: 'night-therapy'
      },
      badge: {
        type: 'primary',
        title: 'Премьера'
      },
      description: {
        mainDescription: 'Психологическая драма о поддержке и силе жизни. В центре повествования – психолог Луи Мансур (Юсеф Свейд, «Неортодоксальная»). После самоубийства жены ему приходится самостоятельно справляться с утратой, параллельно воспитывая двоих детей. Чтобы пережить боль, он решает после очередной бессонной ночи изменить время приема своих пациентов и встречаться с ними после заката. Постепенно главный герой погружается в чужие проблемы, наблюдая за человеческими историями, словно невидимый зритель, и учится справляться с собственной болью. Ночная терапия оказывается целительной для всех ее участников. Актриса Шира Хаас («Неортодоксальная») исполнила в сериале роль гениальной компьютерщицы, которая предпочитает не выходить из дома, а режиссером выступил известный израильский документалист Гавриель Библиович.',
        prewiewDescription: 'Психологическая драма о поддержке и силе жизни'
      },
      about: null,
      ageRestriction: 18,
      dateRelease: '2024',
      genres: ['Драма'],
      actors: ['Шира Хаас', 'Яаков Зада Даниель'],
      directors: ['Гавриель Библиович'],
      country: 'Израиль',
      production: 'N/A'
    },
    rating: {
      raitingAmediateka: 9.3,
      ratingImdb: 8.4,
      ratingKinopoisk: 7.7
    },
    actionsData: {
      favorites: [],
      liked: [],
      disliked: []
    },
    bg: {
      imgUrl: 'http://localhost:3000/public/series/nightTherapy/bgImg.jpg',
      videoUrl: null,
      imgResizeUrl: 'http://localhost:3000/public/series/nightTherapy/resizeImgBgS1.jpg'
    },
    trailer: {
      quality360: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo360.mp4',
      quality720: 'http://localhost:3000/public/series/nightTherapy/nTTrailerVideo720.mp4',
      img: 'http://localhost:3000/public/series/nightTherapy/imgTrailer.jpg'
    },
    logoImg: 'http://localhost:3000/public/series/nightTherapy/imgTitle.png'
  },
  {
    type: 'series',
    seasons: [
      {
        numberOfSeasons: 1,
        episodes: [
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo720.mp4',
            },
            episodeNumber: 1,
            imgPreview: 'http://localhost:3000/public/series/thoseAboutToDie/s1e1.jpg',
            title: 'Дерзни или умри'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo720.mp4',
            },
            episodeNumber: 2,
            imgPreview: 'http://localhost:3000/public/series/thoseAboutToDie/s1e2.jpg',
            title: 'Не доверяй никому'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo720.mp4',
            },
            episodeNumber: 3,
            imgPreview: 'http://localhost:3000/public/series/thoseAboutToDie/s1e3.jpg',
            title: 'На пороге смерти'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo720.mp4',
            },
            episodeNumber: 4,
            imgPreview: 'http://localhost:3000/public/series/thoseAboutToDie/s1e4.jpg',
            title: 'Ставка глупца'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo720.mp4',
            },
            episodeNumber: 5,
            imgPreview: 'http://localhost:3000/public/series/thoseAboutToDie/s1e5.jpg',
            title: 'Предательство'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo720.mp4',
            },
            episodeNumber: 6,
            imgPreview: 'http://localhost:3000/public/series/thoseAboutToDie/s1e6.jpg',
            title: 'Кровные узы'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo720.mp4',
            },
            episodeNumber: 7,
            imgPreview: 'http://localhost:3000/public/series/thoseAboutToDie/s1e7.jpg',
            title: 'На смертном одре'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo720.mp4',
            },
            episodeNumber: 8,
            imgPreview: 'http://localhost:3000/public/series/thoseAboutToDie/s1e8.jpg',
            title: 'Всё или ничего'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo720.mp4',
            },
            episodeNumber: 9,
            imgPreview: 'http://localhost:3000/public/series/thoseAboutToDie/s1e9.jpg',
            title: 'Жребий брошен'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo720.mp4',
            },
            episodeNumber: 10,
            imgPreview: 'http://localhost:3000/public/series/thoseAboutToDie/s1e10.jpg',
            title: 'Да начнутся игры'
          }
        ],
        bg: {
          imgUrl: 'http://localhost:3000/public/series/thoseAboutToDie/bgImg.jpg',
          videoUrl: null,
        },
        trailer: null,
        description: null
      }
    ],
    data: {
      title: {
        value: 'Обреченные на славу',
        originalTitle: 'Those About to Die',
        linkTitle: 'those-about-to-die'
      },
      badge: {
        type: 'primary',
        title: 'Мировая премьера 19 июля'
      },
      description: {
        mainDescription: 'Масштабная историческая драма о Римской империи с двукратным обладателем «Оскара» Энтони Хопкинсом в главной роли. Режиссером выступил Роланд Эммерих, известный по фильмам-катастрофам «День независимости», «Послезавтра» и «2012», а сценаристом – номинант на «Оскар» Роберт Родат («Спасти рядового Райана»). Зрителей ждет погружение в суровый мир гладиаторских боев и дворцовых интриг, где борьба за власть идет не на жизнь, а на смерть. Император Веспасиан (Энтони Хопкинс) – опытный воин, взошедший на трон после кровопролитной гражданской войны. Чтобы утихомирить народ, он решает дать ему не только хлеба, но и зрелищ, повелев проводить регулярные битвы гладиаторов на арене, гонки на колесницах и даже публичные казни. «Обреченные на славу» – это не только эпичные битвы и древнеримские страсти, но и звездный актерский состав: Иван Реон («Игра престолов»), Димитри Леонидас («Центурион»), Том Хьюз («Виктория»), Габриэлла Пессион («Соври мне») и многие другие. В основе сериала лежит роман Дэниела Мэнникса «Путь гладиатора».',
        prewiewDescription: 'Смотрите в июле масштабную историческую драму о Римской империи с двукратным обладателем «Оскара» Энтони Хопкинсом в главной роли'
      },
      about: null,
      ageRestriction: 18,
      dateRelease: '2024',
      genres: ['Драма', 'Боевик', 'Комедия'],
      actors: ['Энтони Хопкинс', 'Габриэлла Пессион', 'Том Хьюз', 'Димитри Леонидас', 'Иван Реон'],
      directors: ['Марко Кройцпайнтнер', 'Роланд Эммерих'],
      country: 'США',
      production: 'Peacock'
    },
    rating: {
      raitingAmediateka: 8.8,
      ratingImdb: 6.6,
      ratingKinopoisk: 7.7
    },
    actionsData: {
      favorites: [],
      liked: [],
      disliked: []
    },
    bg: {
      imgUrl: 'http://localhost:3000/public/series/thoseAboutToDie/bgImg.jpg',
      videoUrl: null,
      imgResizeUrl: 'http://localhost:3000/public/series/thoseAboutToDie/resizeImgBgS1.jpg'
    },
    trailer: {
      quality360: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo360.mp4',
      quality720: 'http://localhost:3000/public/series/thoseAboutToDie/tatdTrailerVideo720.mp4',
      img: 'http://localhost:3000/public/series/thoseAboutToDie/imgTrailer.jpg'
    },
    logoImg: 'http://localhost:3000/public/series/thoseAboutToDie/imgTitle.png'
  },
  {
    type: 'series',
    seasons: [
      {
        numberOfSeasons: 1,
        episodes: [
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo720.mp4',
            },
            episodeNumber: 1,
            imgPreview: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/s1e1.jpg',
            title: 'Две судьбы'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo720.mp4',
            },
            episodeNumber: 2,
            imgPreview: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/s1e2.jpg',
            title: 'План в действии'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo720.mp4',
            },
            episodeNumber: 3,
            imgPreview: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/s1e3.jpg',
            title: 'План изменился'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo720.mp4',
            },
            episodeNumber: 4,
            imgPreview: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/s1e4.jpg',
            title: 'Неожиданные перемены'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo720.mp4',
            },
            episodeNumber: 5,
            imgPreview: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/s1e5.jpg',
            title: 'Око за око'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo720.mp4',
            },
            episodeNumber: 6,
            imgPreview: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/s1e6.jpg',
            title: 'Перемирие'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo720.mp4',
            },
            episodeNumber: 7,
            imgPreview: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/s1e7.jpg',
            title: 'Каждый своим путем'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo720.mp4',
            },
            episodeNumber: 8,
            imgPreview: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/s1e8.jpg',
            title: 'По следу'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo720.mp4',
            },
            episodeNumber: 9,
            imgPreview: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/s1e9.jpg',
            title: 'Жизнь кувырком'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo360.mp4',
              quality720: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo720.mp4',
            },
            episodeNumber: 10,
            imgPreview: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/s1e10.jpg',
            title: 'Последний план'
          }
        ],
        bg: {
          imgUrl: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/imgBg.jpg',
          videoUrl: null
        },
        trailer: null,
        description: null
      }
    ],
    data: {
      title: {
        value: 'Искусство обмана',
        originalTitle: 'Los Artistas: Primeros Trazos',
        linkTitle: 'los-artistas-primeros-trazos',
      },
      badge: null,
      description: {
        mainDescription: 'Красочный сериал «Искусство обмана» расскажет о дуэте обаятельных мошенников, которые решили заработать на глупости богачей. Ката (Химена Ромо), влиятельный арт-эксперт, находится в эмоциональном упадке и близка к профессиональному выгоранию. Красавчик Яго (Макси Иглесиас), торговец антиквариатом, продает за большие деньги безделушки неопытным коллекционерам. Их знакомство приводит к неожиданному результату – они решают организовать общее дело. У героев нет никаких сомнений, что знания и связи помогут продать миллионерам не один десяток поддельных картин, но в какой-то момент их план превращается в капкан… Смогут ли герои обогатиться и выйти сухими из воды?',
        prewiewDescription: 'Красочный сериал «Искусство обмана» расскажет о дуэте обаятельных мошенников, которые решили заработать на глупости богачей'
      },
      about: null,
      ageRestriction: 18,
      dateRelease: '2023',
      genres: ['Драма'],
      actors: ['Химена Ромо', 'Макси Иглесиас'],
      directors: ['Хоакин Льямас', 'Мануэль Санабрия'],
      country: 'Испания',
      production: 'Televisa'
    },
    rating: {
      raitingAmediateka: 8.0,
      ratingImdb: 6.5,
      ratingKinopoisk: 7.4
    },
    actionsData: {
      favorites: [],
      liked: [],
      disliked: []
    },
    bg: {
      imgUrl: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/imgBg.jpg',
      videoUrl: null,
      imgResizeUrl: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/resizeImgBgS1.jpg'
    },
    trailer: {
      quality360: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo360.mp4',
      quality720: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/tatdTrailerVideo720.mp4',
      img: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/imgTrailer.jpg'
    },
    logoImg: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/imgTitle.png'
  },
  {
    type: 'series',
    seasons: [
      {
        numberOfSeasons: 1,
        episodes: [
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/queensOfMystery/videoTrailer720.mp4'
              },
              quality360: '',
              quality720: '',
            },
            episodeNumber: 1,
            imgPreview: 'http://localhost:3000/public/series/queensOfMystery/s1e1.jpg',
            title: 'Спарринг со смертью: глава первая'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/queensOfMystery/videoTrailer720.mp4'
              },
              quality360: '',
              quality720: '',
            },
            episodeNumber: 2,
            imgPreview: 'http://localhost:3000/public/series/queensOfMystery/s1e2.jpg',
            title: 'Спарринг со смертью: глава последняя'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/queensOfMystery/videoTrailer720.mp4'
              },
              quality360: '',
              quality720: '',
            },
            episodeNumber: 3,
            imgPreview: 'http://localhost:3000/public/series/queensOfMystery/s1e3.jpg',
            title: 'Современное искусство убийства: глава первая'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/queensOfMystery/videoTrailer720.mp4'
              },
              quality360: '',
              quality720: '',
            },
            episodeNumber: 4,
            imgPreview: 'http://localhost:3000/public/series/queensOfMystery/s1e4.jpg',
            title: 'Современное искусство убийства: глава последняя'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/queensOfMystery/videoTrailer720.mp4'
              },
              quality360: '',
              quality720: '',
            },
            episodeNumber: 5,
            imgPreview: 'http://localhost:3000/public/series/queensOfMystery/s1e5.jpg',
            title: 'Ворон: глава первая'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/queensOfMystery/videoTrailer720.mp4'
              },
              quality360: '',
              quality720: '',
            },
            episodeNumber: 6,
            imgPreview: 'http://localhost:3000/public/series/queensOfMystery/s1e6.jpg',
            title: 'Ворон: глава последняя'
          }
        ],
        bg: {
          imgUrl: 'http://localhost:3000/public/series/queensOfMystery/imgBg.jpg',
          videoUrl: null
        },
        trailer: null,
        description: null
      }
    ],
    data: {
      title: {
        value: 'Королевы тайн',
        originalTitle: 'Queens of Mystery',
        linkTitle: 'queens-of-mystery'
      },
      badge: null,
      description: {
        mainDescription: 'Атмосферный детективный сериал — номинант на премию «Эмми» — погружает зрителей в мир семейных тайн и хитроумных преступлений, балансируя между теплой комедией и социальной драмой. Матильда Стоун и ее три эпатажные тетушки, которые пишут криминальные романы, расследуют несколько любопытных дел: убийство в оздоровительном центре, загадку из мира современного искусства и кражу рукописи Эдгара Аллана По. Несмотря на то, что в личной жизни Матильды не всё гладко, она добивается значительного успеха в деле о пропаже своей матери. Тетушкам явно это не по душе, и они делают всё, чтобы девушка не узнала шокирующую правду…',
        prewiewDescription: 'Детективный сериал — номинант на премию «Эмми» — погружает зрителей в мир семейных тайн и хитроумных преступлений, балансируя между комедией и социальной драмой'
      },
      about: null,
      ageRestriction: 18,
      dateRelease: '2023',
      genres: ['Драма', 'Детектив', 'Криминал'],
      actors: ['Флоренс Холл', 'Шиван Редмонд', 'Сара Вудворд', 'Джули Грэм', 'Мартин Тренаман'],
      directors: ['Джейми Магнус Стоун'],
      country: 'Великобритания',
      production: 'AMC'
    },
    rating: {
      raitingAmediateka: 8.3,
      ratingImdb: 7.3,
      ratingKinopoisk: 6.2
    },
    actionsData: {
      favorites: [],
      liked: [],
      disliked: []
    },
    bg: {
      imgUrl: 'http://localhost:3000/public/series/queensOfMystery/imgBg.jpg',
      videoUrl: null,
      imgResizeUrl: 'http://localhost:3000/public/series/queensOfMystery/resizeImgBgS1.jpg'
    },
    trailer: {
      quality360: 'http://localhost:3000/public/series/queensOfMystery/videoTrailer360.mp4',
      quality720: 'http://localhost:3000/public/series/queensOfMystery/videoTrailer720.mp4',
      img: 'http://localhost:3000/public/series/queensOfMystery/imgTrailer.jpg'
    },
    logoImg: 'http://localhost:3000/public/series/queensOfMystery/imgTitle.png'
  },
  {
    type: 'series',
    seasons: [
      {
        numberOfSeasons: 1,
        episodes: [
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/normalPeople/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4',
            },
            episodeNumber: 1,
            imgPreview: 'http://localhost:3000/public/series/normalPeople/s1e1.jpg',
            title: 'Серия 1'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/normalPeople/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4',
            },
            episodeNumber: 2,
            imgPreview: 'http://localhost:3000/public/series/normalPeople/s1e2.jpg',
            title: 'Серия 2'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/normalPeople/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4',
            },
            episodeNumber: 3,
            imgPreview: 'http://localhost:3000/public/series/normalPeople/s1e3.jpg',
            title: 'Серия 3'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/normalPeople/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4',
            },
            episodeNumber: 4,
            imgPreview: 'http://localhost:3000/public/series/normalPeople/s1e4.jpg',
            title: 'Серия 4'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/normalPeople/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4',
            },
            episodeNumber: 5,
            imgPreview: 'http://localhost:3000/public/series/normalPeople/s1e5.jpg',
            title: 'Серия 5'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/normalPeople/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4',
            },
            episodeNumber: 6,
            imgPreview: 'http://localhost:3000/public/series/normalPeople/s1e6.jpg',
            title: 'Серия 6'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/normalPeople/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4',
            },
            episodeNumber: 7,
            imgPreview: 'http://localhost:3000/public/series/normalPeople/s1e7.jpg',
            title: 'Серия 7'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/normalPeople/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4',
            },
            episodeNumber: 8,
            imgPreview: 'http://localhost:3000/public/series/normalPeople/s1e8.jpg',
            title: 'Серия 8'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/normalPeople/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4',
            },
            episodeNumber: 9,
            imgPreview: 'http://localhost:3000/public/series/normalPeople/s1e9.jpg',
            title: 'Серия 9'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/normalPeople/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4',
            },
            episodeNumber: 10,
            imgPreview: 'http://localhost:3000/public/series/normalPeople/s1e10.jpg',
            title: 'Серия 10'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/normalPeople/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4',
            },
            episodeNumber: 11,
            imgPreview: 'http://localhost:3000/public/series/normalPeople/s1e11.jpg',
            title: 'Серия 11'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/normalPeople/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4',
            },
            episodeNumber: 12,
            imgPreview: 'http://localhost:3000/public/series/normalPeople/s1e12.jpg',
            title: 'Серия 12'
          },
        ],
        bg: {
          imgUrl: 'http://localhost:3000/public/series/normalPeople/imgBgS1.jpg',
          videoUrl: null
        },
        trailer: null,
        description: '«Нормальные люди» – экранизация одноименного бестселлера Салли Руни с Полом Мескалом («Гладиатор 2», «Солнце мое») и Дейзи Эдгар-Джонс («Там, где поют раки», «Безмолвный свидетель») в главных ролях. Действие сериала разворачивается в небольшом ирландском городке. Марианна – умная, богатая, но совершенно непопулярная девушка в школе, практически изгой. Конелл – звезда футбольной команды и тайная любовь всех одноклассниц. Их случайная встреча приводит не просто к первой любви, а скорее к первой настоящей близости, которую они попробуют пронести через годы и сохранить во взрослом возрасте. Героев будут ждать болезненные расставания и трогательные примирения с совершенно непредсказуемым исходом их тайного романа.'
      }
    ],
    data: {
      title: {
        value: 'Нормальные люди',
        originalTitle: 'Normal People',
        linkTitle: 'normal-people'
      },
      badge: null,
      description: {
        mainDescription: '«Нормальные люди» – экранизация одноименного бестселлера Салли Руни с Полом Мескалом («Гладиатор 2», «Солнце мое») и Дейзи Эдгар-Джонс («Там, где поют раки», «Безмолвный свидетель») в главных ролях. Действие сериала разворачивается в небольшом ирландском городке. Марианна – умная, богатая, но совершенно непопулярная девушка в школе, практически изгой. Конелл – звезда футбольной команды и тайная любовь всех одноклассниц. Их случайная встреча приводит не просто к первой любви, а скорее к первой настоящей близости, которую они попробуют пронести через годы и сохранить во взрослом возрасте. Героев будут ждать болезненные расставания и трогательные примирения с совершенно непредсказуемым исходом их тайного романа.',
        prewiewDescription: '«Нормальные люди» – экранизация одноименного бестселлера Салли Руни с Полом Мескалом («Гладиатор 2», «Солнце мое») и Дейзи Эдгар-Джонс («Там, где поют раки», «Безмолвный свидетель») в главных ролях. Действие сериала разворачивается в небольшом ирландском городке.'
      },
      about: null,
      ageRestriction: 18,
      dateRelease: '2020',
      genres: ['Драма', 'Мелодрама'],
      actors: ['Пол Мескал', 'Дейзи Эдгар-Джонс'],
      directors: ['Леонард Абрахамсон', 'Хетти Макдональд'],
      country: 'Ирландия',
      production: 'Hulu'
    },
    rating: {
      raitingAmediateka: 7.2,
      ratingImdb: 8.4,
      ratingKinopoisk: 7.6
    },
    actionsData: {
      favorites: [],
      liked: [],
      disliked: []
    },
    bg: {
      imgUrl: 'http://localhost:3000/public/series/normalPeople/imgBgS1.jpg',
      videoUrl: null,
      imgResizeUrl: 'http://localhost:3000/public/series/normalPeople/resizeImgBgS1.jpg'
    },
    trailer: {
      quality360: 'http://localhost:3000/public/series/normalPeople/videoTrailer360.mp4',
      quality720: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4',
      img: 'http://localhost:3000/public/series/normalPeople/imgTrailer.png'
    },
    logoImg: 'http://localhost:3000/public/series/normalPeople/imgLogo.png'
  },
  {
    type: 'series',
    seasons: [
      {
        numberOfSeasons: 1,
        episodes: [
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/theMayfairWitches/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/theMayfairWitches/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/theMayfairWitches/videoTrailer720.mp4',
            },
            episodeNumber: 1,
            imgPreview: 'http://localhost:3000/public/series/theMayfairWitches/s1e1.jpg',
            title: 'Час ведьмовства'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/theMayfairWitches/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/theMayfairWitches/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/theMayfairWitches/videoTrailer720.mp4',
            },
            episodeNumber: 2,
            imgPreview: 'http://localhost:3000/public/series/theMayfairWitches/s1e2.jpg',
            title: 'Во тьме'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/theMayfairWitches/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/theMayfairWitches/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/theMayfairWitches/videoTrailer720.mp4',
            },
            episodeNumber: 3,
            imgPreview: 'http://localhost:3000/public/series/theMayfairWitches/s1e3.jpg',
            title: 'Вторая линия'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/theMayfairWitches/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/theMayfairWitches/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/theMayfairWitches/videoTrailer720.mp4',
            },
            episodeNumber: 4,
            imgPreview: 'http://localhost:3000/public/series/theMayfairWitches/s1e4.jpg',
            title: 'Всё страньше и страньше'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/theMayfairWitches/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/theMayfairWitches/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/theMayfairWitches/videoTrailer720.mp4',
            },
            episodeNumber: 5,
            imgPreview: 'http://localhost:3000/public/series/theMayfairWitches/s1e5.jpg',
            title: 'Пленница'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/theMayfairWitches/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/theMayfairWitches/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/theMayfairWitches/videoTrailer720.mp4',
            },
            episodeNumber: 6,
            imgPreview: 'http://localhost:3000/public/series/theMayfairWitches/s1e6.jpg',
            title: 'Передача'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/theMayfairWitches/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/theMayfairWitches/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/theMayfairWitches/videoTrailer720.mp4',
            },
            episodeNumber: 7,
            imgPreview: 'http://localhost:3000/public/series/theMayfairWitches/s1e7.jpg',
            title: 'Тесса'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/theMayfairWitches/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/theMayfairWitches/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/theMayfairWitches/videoTrailer720.mp4',
            },
            episodeNumber: 8,
            imgPreview: 'http://localhost:3000/public/series/theMayfairWitches/s1e8.jpg',
            title: 'И что за чудище'
          }
        ],
        bg: {
          imgUrl: 'http://localhost:3000/public/series/theMayfairWitches/imgBgS1.jpg',
          videoUrl: null
        },
        trailer: null,
        description: null
      }
    ],
    data: {
      title: {
        value: 'Мэйфейрские ведьмы',
        originalTitle: `Anne Rice's The Mayfair Witches`,
        linkTitle: 'the-mayfair-witches'
      },
      badge: null,
      description: {
        mainDescription: 'Фэнтези-сериал, основанный на серии книг Энн Райс – именно она подарила нам культовый мистический роман «Интервью с вампиром». Действие «Мэйфейрских ведьм» разворачивается в Новом Орлеане. Главная героиня Роуэн Филдинг (Александра Даддарио), хирург по профессии, узнает, что она наследница древнего ведьминского рода, а своим экстрасенсорным даром члены ее семьи обязаны злому духу по имени Лэшер (Джек Хьюстон). Врачебный дар Роуэн помогает спасать пациентов, а вот магический – лишать жизни ее врагов. Девушка решает разобраться, что за проклятье на ней лежит, кем была ее настоящая мать и какая судьба ждет ее саму. Среди актерского состава – Аннабет Гиш («Полуночная месса»), Гарри Хэмлин («Бесстыжие») и Бет Грант («Старикам здесь не место»).',
        prewiewDescription: 'Фэнтези-сериал, основанный на серии книг Энн Райс – именно она подарила нам культовый мистический роман «Интервью с вампиром». Действие «Мэйфейрских ведьм» разворачивается в Новом Орлеане. '
      },
      about: {
        title: 'О сериале «Мэйфейрские ведьмы»',
        description: ' В 2023 году вышла экранизация книг писательницы Энн Райс «Мэйфейрские ведьмы» (в оригинале — Mayfair witches). Этот телесериал сразу покорил как фанатов писательницы, так и не знакомых с ее творчеством зрителей. Это не типичная история доброго или злого волшебника, это нечто более интересное и глубокое. В материале рассказываем об этом сериале и делимся интересными фактами. А посмотреть сериал онлайн и в хорошем качестве можно в Амедиатеке. Роуэн Филдинг — молодой, но очень талантливый и успешный нейрохирург: она заботится о своих пациентах и у нее буквально есть дар им помогать. Однако всё в ее жизни меняется, когда у приемной матери происходит ремиссия рака. Роуэн встречается со своей темной стороной: в тщетных попытках помочь маме она какой-то силой мысли лишает жизни двух человек и понимает, что с ней что-то не так.И как оказалось, на самом деле биологическая мама Роуэн, как и она сама, принадлежит сильному и достаточно знаменитому роду Мэйфейрских ведьм. Только вот их покровитель — темный (или не совсем) дух Лэшер. Роуэн предстоит разобраться в семейных тайнах, научиться управлять своими силами и ответить на вопрос, кто же на самом деле этот Лэшер и чего он хочет. '
      },
      ageRestriction: 18,
      dateRelease: '2023',
      genres: ['Фэнтези', 'Ужасы', 'Драма'],
      actors: ['Бет Грант', 'Гарри Хэмлин', 'Аннабет Гиш', ' Джек Хьюстон', 'Александра Даддарио'],
      directors: ['Майкл Аппендаль', 'Алексис О. Коричински', 'Аксель Кэролин'],
      country: 'США',
      production: 'AMC'
    },
    rating: {
      raitingAmediateka: 8.6,
      ratingImdb: 6.2,
      ratingKinopoisk: 5.8
    },
    actionsData: {
      favorites: [],
      liked: [],
      disliked: []
    },
    bg: {
      imgUrl: 'http://localhost:3000/public/series/theMayfairWitches/imgBgS1.jpg',
      videoUrl: null,
      imgResizeUrl: 'http://localhost:3000/public/series/theMayfairWitches/resizeImgBgS1.jpg'
    },
    trailer: {
      quality360: 'http://localhost:3000/public/series/theMayfairWitches/videoTrailer360.mp4',
      quality720: 'http://localhost:3000/public/series/theMayfairWitches/videoTrailer720.mp4',
      img: 'http://localhost:3000/public/series/theMayfairWitches/imgTrailer.png'
    },
    logoImg: 'http://localhost:3000/public/series/theMayfairWitches/imgLogo.png'
  },
  {
    type: 'series',
    seasons: [
      {
        numberOfSeasons: 1,
        episodes: [
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/theOffer/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/theOffer/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/theOffer/videoTrailer720.mp4',
            },
            episodeNumber: 1,
            imgPreview: 'http://localhost:3000/public/series/theOffer/s1e1.jpg',
            title: 'Серия 1'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/theOffer/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/theOffer/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/theOffer/videoTrailer720.mp4',
            },
            episodeNumber: 2,
            imgPreview: 'http://localhost:3000/public/series/theOffer/s1e2.jpg',
            title: 'Серия 2'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/theOffer/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/theOffer/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/theOffer/videoTrailer720.mp4',
            },
            episodeNumber: 3,
            imgPreview: 'http://localhost:3000/public/series/theOffer/s1e3.jpg',
            title: 'Серия 3'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/theOffer/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/theOffer/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/theOffer/videoTrailer720.mp4',
            },
            episodeNumber: 4,
            imgPreview: 'http://localhost:3000/public/series/theOffer/s1e4.jpg',
            title: 'Серия 4'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/theOffer/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/theOffer/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/theOffer/videoTrailer720.mp4',
            },
            episodeNumber: 5,
            imgPreview: 'http://localhost:3000/public/series/theOffer/s1e5.jpg',
            title: 'Серия 5'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/theOffer/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/theOffer/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/theOffer/videoTrailer720.mp4',
            },
            episodeNumber: 6,
            imgPreview: 'http://localhost:3000/public/series/theOffer/s1e6.jpg',
            title: 'Серия 6'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/theOffer/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/theOffer/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/theOffer/videoTrailer720.mp4',
            },
            episodeNumber: 7,
            imgPreview: 'http://localhost:3000/public/series/theOffer/s1e7.jpg',
            title: 'Серия 7'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/theOffer/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/theOffer/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/theOffer/videoTrailer720.mp4',
            },
            episodeNumber: 8,
            imgPreview: 'http://localhost:3000/public/series/theOffer/s1e8.jpg',
            title: 'Серия 8'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/theOffer/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/theOffer/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/theOffer/videoTrailer720.mp4',
            },
            episodeNumber: 9,
            imgPreview: 'http://localhost:3000/public/series/theOffer/s1e9.jpg',
            title: 'Серия 9'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/theOffer/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/theOffer/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/theOffer/videoTrailer720.mp4',
            },
            episodeNumber: 10,
            imgPreview: 'http://localhost:3000/public/series/theOffer/s1e10.jpg',
            title: 'Серия 10'
          }
        ],
        bg: {
          imgUrl: 'http://localhost:3000/public/series/theOffer/imgBgS1.jpg',
          videoUrl: null
        },
        trailer: null,
        description: 'От просмотра «Предложения» вы действительно не сможете отказаться – и отсылка к крылатой фразе дона Корлеоне тут неспроста. За десять эпизодов сериала вы узнаете всё о том, как создавался фильм «Крестный отец» и какие проблемы с ним были связаны. Основные роли в его создании сыграли продюсеры Альберт Радди (Майлз Теллер) и Роберт Эванс (Мэттью Гуд), которым пришлось сломать немало копий, пока режиссер Фрэнсис Форд Коппола (Дэн Фоглер) и писатель Марио Пьюзо (Патрик Галло) никак не могли найти общий язык, а студия не верила, что какой-то «местечковый романчик» про борьбу итальянских кланов в США сможет стать мировым хитом. Но мы-то с вами знаем, чем всё закончилось… А вот как начиналось – эту страницу из истории создания шедевра зрителям и предстоит открыть!'
      }
    ],
    data: {
      title: {
        value: 'Предложение',
        originalTitle: 'The Offer',
        linkTitle: 'the-offer'
      },
      badge: null,
      description: {
        mainDescription: 'От просмотра «Предложения» вы действительно не сможете отказаться – и отсылка к крылатой фразе дона Корлеоне тут неспроста. За десять эпизодов сериала вы узнаете всё о том, как создавался фильм «Крестный отец» и какие проблемы с ним были связаны. Основные роли в его создании сыграли продюсеры Альберт Радди (Майлз Теллер) и Роберт Эванс (Мэттью Гуд), которым пришлось сломать немало копий, пока режиссер Фрэнсис Форд Коппола (Дэн Фоглер) и писатель Марио Пьюзо (Патрик Галло) никак не могли найти общий язык, а студия не верила, что какой-то «местечковый романчик» про борьбу итальянских кланов в США сможет стать мировым хитом. Но мы-то с вами знаем, чем всё закончилось… А вот как начиналось – эту страницу из истории создания шедевра зрителям и предстоит открыть!',
        prewiewDescription: '«Предложение» (The Offer) — это сериал, выпущенный компанией Paramount+, в котором рассказывается о бурном пути выхода на экраны кинематографического шедевра Фрэнсиса Форда Копполы «Крёстный отец».'
      },
      about: {
        title: 'Сюжет сериала «Предложение»',
        description: `«Предложение» (The Offer) — это сериал, выпущенный компанией Paramount+, в котором рассказывается о бурном пути выхода на экраны кинематографического шедевра Фрэнсиса Форда Копполы «Крёстный отец». Благодаря сочетанию исторических фактов, фантазии и криминальной драмы проект предлагает зрителям интригующий взгляд на поворотный момент в истории кино, рассказывая не только о триумфах, но и о трудностях, с которыми пришлось столкнуться в процессе производства. Давайте отправимся в сложный мир Голливуда, ведь смотреть все сезоны сериала можно онлайн в HD-качестве на сайте Amediateka с русскими субтитрами. Первые семь дней можно попробовать сервис бесплатно.

        Сюжет криминальной драмы «Предложение» разворачивается в начале 1970-х годов и сосредоточен на Альберте С. Радди, продюсере, который сталкивается как со скептицизмом киноиндустрии, так и с личными дилеммами, когда он возглавил создание адаптации бестселлера Марио Пьюзо. Радди, относительно неизвестная в то время фигура в Голливуде, поначалу сталкивается с массой препятствий, включая сопротивление студии, бюджетные ограничения и нестабильные отношения с талантливыми людьми, задействованными в проекте. Но он готов и хочет достичь правосудия и истины.

        Каждый эпизод подробно раскрывает многогранную драму, связанную с производством фильма, иллюстрируя неустанное стремление Радди к своему видению среди хаоса. История мафиозных связей, убийств, расследований, силы журналистики, борьбы за власть и творческих конфликтов придает повествованию глубину и сложность, превращая «Предложение» не просто в рассказ о фильме «Крёстный отец», но и в настоящий триллер о тайнах и творчестве в Голливуде.`
      },
      ageRestriction: 18,
      dateRelease: '2022',
      genres: ['Драма', 'Биография'],
      actors: ['Патрик Галло', 'Дэн Фоглер', 'Мэттью Гуд', 'Майлз Теллер'],
      directors: ['Колин Бакси', 'Адам Аркин'],
      country: 'США',
      production: 'Paramount Pictures'
    },
    rating: {
      raitingAmediateka: 9.3,
      ratingImdb: 8.6,
      ratingKinopoisk: 8.3
    },
    actionsData: {
      favorites: [],
      liked: [],
      disliked: []
    },
    bg: {
      imgUrl: 'http://localhost:3000/public/series/theOffer/imgBgS1.jpg',
      videoUrl: null,
      imgResizeUrl: 'http://localhost:3000/public/series/theOffer/resizeImgBgS1.jpg'
    },
    trailer: {
      quality360: 'http://localhost:3000/public/series/theOffer/videoTrailer360.mp4',
      quality720: 'http://localhost:3000/public/series/theOffer/videoTrailer720.mp4',
      img: 'http://localhost:3000/public/series/theOffer/imgTrailer.png'
    },
    logoImg: 'http://localhost:3000/public/series/theOffer/imgLogo.png'
  }
]

export const temporaryBanner: Banner = {
  title: "Мировые премьеры и любимые сериалы",
  bannerListItem: ['В единой подписке',
    'На любых устройствах',
    'В отличном качестве',
    'Без рекламы'],
  img: "/bannerImg.png",
  titleBtn: "Попробовать за 1₽",
  ageRestriction: 18
}

export const formationLink = (typeContent: 'movie' | 'series', _id: string, link: string): string => {
  if (typeContent === 'movie') {
    return `/movie/${_id}/${link}`
  } else {
    return `/series/${_id}/${link}`
  }
}

export const mapMediaContentToCardData = (item: MediaContent): CardData => ({
  _id: item._id as string,
  type: item.type,
  title: item.data.title,
  badge: item.data.badge,
  ageRestriction: item.data.ageRestriction,
  description: item.data.description.prewiewDescription,
  bg: item.bg,
  logoImg: item.logoImg,
  link: formationLink(item.type, item._id as string, item.data.title.linkTitle)
})
