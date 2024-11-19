import { ErrorMain } from '../types/Error'
import { MediaContent } from '../types/interface/MediaContent'
import { Banner } from '../types/interface/Banner'

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
            link: '#',
            episodeNumber: 1,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds1e1.jpg',
            title: 'Наследники дракона'
          },
          {
            link: '#',
            episodeNumber: 2,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds1e2.jpg',
            title: 'Порочный принц'
          },
          {
            link: '#',
            episodeNumber: 3,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds1e3.jpg',
            title: 'Второй своего имени'

          },
          {
            link: '#',
            episodeNumber: 4,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds1e4.jpg',
            title: 'Король Узкого Моря'
          },
          {
            link: '#',
            episodeNumber: 5,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds1e5.jpg',
            title: 'Мы путь осветим'
          },
          {
            link: '#',
            episodeNumber: 6,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds1e6.jpg',
            title: 'Принцесса и королева'
          },
          {
            link: '#',
            episodeNumber: 7,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds1e7.jpg',
            title: 'Дрифтмарк'
          },
          {
            link: '#',
            episodeNumber: 8,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds1e8.jpg',
            title: 'Лорд Приливов'
          },
          {
            link: '#',
            episodeNumber: 9,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds1e9.jpg',
            title: 'Зеленый Совет'
          },
          {
            link: '#',
            episodeNumber: 10,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds1e10.jpg',
            title: 'Черная королева'
          }
        ],
        bg: {
          imgUrl: 'http://localhost:3000/public/series/hotd/imgBgHOTDs1.jpg',
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
            link: '#',
            episodeNumber: 1,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds2e1.jpg',
            title: 'Сын за сына'
          },
          {
            link: '#',
            episodeNumber: 2,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds2e2.jpg',
            title: 'Рейнира Жестокая'
          },
          {
            link: '#',
            episodeNumber: 3,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds2e3.jpg',
            title: 'Горящая Мельница'

          },
          {
            link: '#',
            episodeNumber: 4,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds2e4.jpg',
            title: 'Красный дракон и золотой'
          },
          {
            link: '#',
            episodeNumber: 5,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds2e5.jpg',
            title: 'Регент'
          },
          {
            link: '#',
            episodeNumber: 6,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds2e6.jpg',
            title: 'Простой люд'
          },
          {
            link: '#',
            episodeNumber: 7,
            imgPreview: 'http://localhost:3000/public/series/hotd/hotds2e7.jpg',
            title: 'Красный Посев'
          },
          {
            link: '#',
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
      imgUrl: 'http://localhost:3000/public/series/hotd/imgBgHOTDs2.jpg',
      videoUrl: 'http://localhost:3000/public/series/hotd/hotdBgVideo.mp4',
      imgResizeUrl: 'http://localhost:3000/public/series/hotd/resizeImgBgS2.jpg'
    },
    trailer: {
      quality360: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo360.mp4',
      quality720: 'http://localhost:3000/public/series/hotd/hotdTrailerVideo720.mp4',
      quality1080: null,
      quality2160: null,
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
            link: '#',
            episodeNumber: 1,
            imgPreview: 'http://localhost:3000/public/series/nightTherapy/s1e1.jpg',
            title: 'Ночь - это день'
          },
          {
            link: '#',
            episodeNumber: 2,
            imgPreview: 'http://localhost:3000/public/series/nightTherapy/s1e2.jpg',
            title: 'Очень узкий мостик'
          },
          {
            link: '#',
            episodeNumber: 3,
            imgPreview: 'http://localhost:3000/public/series/nightTherapy/s1e3.jpg',
            title: 'В центре бури'
          },
          {
            link: '#',
            episodeNumber: 4,
            imgPreview: 'http://localhost:3000/public/series/nightTherapy/s1e4.jpg',
            title: 'Не замечать до последнего.'
          },
          {
            link: '#',
            episodeNumber: 5,
            imgPreview: 'http://localhost:3000/public/series/nightTherapy/s1e5.jpg',
            title: 'Крах'
          },
          {
            link: '#',
            episodeNumber: 6,
            imgPreview: 'http://localhost:3000/public/series/nightTherapy/s1e6.jpg',
            title: 'Ретроградный Меркурий, часть 1'
          },
          {
            link: '#',
            episodeNumber: 7,
            imgPreview: 'http://localhost:3000/public/series/nightTherapy/s1e7.jpg',
            title: 'Ретроградный Меркурий, часть 2'
          },
          {
            link: '#',
            episodeNumber: 8,
            imgPreview: 'http://localhost:3000/public/series/nightTherapy/s1e8.jpg',
            title: 'Когда придёт время, отпусти'
          },
          {
            link: '#',
            episodeNumber: 9,
            imgPreview: 'http://localhost:3000/public/series/nightTherapy/s1e8.jpg',
            title: 'Линия жизни'
          },
          {
            link: '#',
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
      quality1080: null,
      quality2160: null,
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
            link: '#',
            episodeNumber: 1,
            imgPreview: 'http://localhost:3000/public/series/thoseAboutToDie/s1e1.jpg',
            title: 'Дерзни или умри'
          },
          {
            link: '#',
            episodeNumber: 2,
            imgPreview: 'http://localhost:3000/public/series/thoseAboutToDie/s1e2.jpg',
            title: 'Не доверяй никому'
          },
          {
            link: '#',
            episodeNumber: 3,
            imgPreview: 'http://localhost:3000/public/series/thoseAboutToDie/s1e3.jpg',
            title: 'На пороге смерти'
          },
          {
            link: '#',
            episodeNumber: 4,
            imgPreview: 'http://localhost:3000/public/series/thoseAboutToDie/s1e4.jpg',
            title: 'Ставка глупца'
          },
          {
            link: '#',
            episodeNumber: 5,
            imgPreview: 'http://localhost:3000/public/series/thoseAboutToDie/s1e5.jpg',
            title: 'Предательство'
          },
          {
            link: '#',
            episodeNumber: 6,
            imgPreview: 'http://localhost:3000/public/series/thoseAboutToDie/s1e6.jpg',
            title: 'Кровные узы'
          },
          {
            link: '#',
            episodeNumber: 7,
            imgPreview: 'http://localhost:3000/public/series/thoseAboutToDie/s1e7.jpg',
            title: 'На смертном одре'
          },
          {
            link: '#',
            episodeNumber: 8,
            imgPreview: 'http://localhost:3000/public/series/thoseAboutToDie/s1e8.jpg',
            title: 'Всё или ничего'
          },
          {
            link: '#',
            episodeNumber: 9,
            imgPreview: 'http://localhost:3000/public/series/thoseAboutToDie/s1e9.jpg',
            title: 'Жребий брошен'
          },
          {
            link: '#',
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
      quality1080: null,
      quality2160: null,
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
            link: '#',
            episodeNumber: 1,
            imgPreview: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/s1e1.jpg',
            title: 'Две судьбы'
          },
          {
            link: '#',
            episodeNumber: 2,
            imgPreview: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/s1e2.jpg',
            title: 'План в действии'
          },
          {
            link: '#',
            episodeNumber: 3,
            imgPreview: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/s1e3.jpg',
            title: 'План изменился'
          },
          {
            link: '#',
            episodeNumber: 4,
            imgPreview: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/s1e4.jpg',
            title: 'Неожиданные перемены'
          },
          {
            link: '#',
            episodeNumber: 5,
            imgPreview: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/s1e5.jpg',
            title: 'Око за око'
          },
          {
            link: '#',
            episodeNumber: 6,
            imgPreview: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/s1e6.jpg',
            title: 'Перемирие'
          },
          {
            link: '#',
            episodeNumber: 7,
            imgPreview: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/s1e7.jpg',
            title: 'Каждый своим путем'
          },
          {
            link: '#',
            episodeNumber: 8,
            imgPreview: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/s1e8.jpg',
            title: 'По следу'
          },
          {
            link: '#',
            episodeNumber: 9,
            imgPreview: 'http://localhost:3000/public/series/losArtistasPrimerosTrazos/s1e9.jpg',
            title: 'Жизнь кувырком'
          },
          {
            link: '#',
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
      quality1080: null,
      quality2160: null,
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
            link: '#',
            episodeNumber: 1,
            imgPreview: 'http://localhost:3000/public/series/queensOfMystery/s1e1.jpg',
            title: 'Спарринг со смертью: глава первая'
          },
          {
            link: '#',
            episodeNumber: 2,
            imgPreview: 'http://localhost:3000/public/series/queensOfMystery/s1e2.jpg',
            title: 'Спарринг со смертью: глава последняя'
          },
          {
            link: '#',
            episodeNumber: 3,
            imgPreview: 'http://localhost:3000/public/series/queensOfMystery/s1e3.jpg',
            title: 'Современное искусство убийства: глава первая'
          },
          {
            link: '#',
            episodeNumber: 4,
            imgPreview: 'http://localhost:3000/public/series/queensOfMystery/s1e4.jpg',
            title: 'Современное искусство убийства: глава последняя'
          },
          {
            link: '#',
            episodeNumber: 5,
            imgPreview: 'http://localhost:3000/public/series/queensOfMystery/s1e5.jpg',
            title: 'Ворон: глава первая'
          },
          {
            link: '#',
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
      quality1080: null,
      quality2160: null,
      img: 'http://localhost:3000/public/series/queensOfMystery/imgTrailer.jpg'
    },
    logoImg: 'http://localhost:3000/public/series/queensOfMystery/imgTitle.png'
  },
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


