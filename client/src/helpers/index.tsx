import { CardData } from "../types/Card"
import { UserData } from "../types/interfaces/User"

export const setDataInLocalStorage = (key: string, data: string | null | UserData): void => {
  if (data) {
    localStorage.setItem(key, JSON.stringify(data))
  } else {
    localStorage.removeItem(key)
  }
}

export const getDataFromLocalStorage = (key: string): UserData | null => {
  const data = localStorage.getItem(key)
  if (data) {
    return JSON.parse(data)
  }
  return null
}

export const temporarySlide: Array<CardData> = [
  {
    link: {
      type: "title",
      value: "/"
    },
    imgBg: "/slideImg/1/bg.jpg",
    title: {
      type: "img",
      value: "/slideImg/1/title.png"
    },
    description: "Приквел «Игры престолов» возвращается со вторым сезоном, в котором битва за власть в Вестеросе набирает грандиозные обороты",
    ageRestriction: 18,
    badge: {
      type: "secondary",
      title: "Номинант «Эмми»"
    },
  },
  {
    link: {
      type: "title",
      value: "/"
    },
    imgBg: "/slideImg/2/bg.jpg",
    title: {
      type: "img",
      value: "/slideImg/2/title.png"
    },
    description: "Психологическая драма о поддержке и силе жизни",
    ageRestriction: 18,
    badge: {
      type: "primary",
      title: "Премьера"
    }
  },
  {
    link: {
      type: "title",
      value: "/"
    },
    imgBg: "/slideImg/3/bg.jpg",
    title: {
      type: "img",
      value: "/slideImg/3/title.png"
    },
    description: "Смотрите в июле масштабную историческую драму о Римской империи с двукратным обладателем «Оскара» Энтони Хопкинсом в главной роли",
    ageRestriction: 18,
    badge: {
      type: "primary",
      title: "Мировая премьера 19 июля"
    }
  },
  {
    link: {
      type: "title",
      value: "/"
    },
    imgBg: "/slideImg/4/bg.jpg",
    title: {
      type: "img",
      value: "/slideImg/4/title.png"
    },
    description: "Красочный сериал «Искусство обмана» расскажет о дуэте обаятельных мошенников, которые решили заработать на глупости богачей",
    ageRestriction: 18,
  },
  {
    link: {
      type: "title",
      value: "/"
    },
    imgBg: "/slideImg/5/bg.jpg",
    title: {
      type: "img",
      value: "/slideImg/5/title.png"
    },
    description: "Детективный сериал — номинант на премию «Эмми» — погружает зрителей в мир семейных тайн и хитроумных преступлений, балансируя между комедией и социальной драмой",
    ageRestriction: 18,
  }
]

export const temporaryBannerListItem: Array<string> = [
  'В единой подписке',
  'На любых устройствах',
  'В отличном качестве',
  'Без рекламы'
]

export const temporarySlidesWatchingNow: Array<CardData> = [
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: '/watchingNow/1.jpg',
    title: {
      type: 'text',
      value: 'Игра престолов',
    },
    ageRestriction: 18,
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: '/watchingNow/2.jpg',
    title: {
      type: 'text',
      value: 'Дом Дракона'
    },
    ageRestriction: 18
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: '/watchingNow/3.jpg',
    title: {
      type: 'text',
      value: 'Обреченные на славу'
    },
    ageRestriction: 18
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: '/watchingNow/4.jpg',
    title: {
      type: 'text',
      value: 'Секс в большом городе'
    },
    ageRestriction: 18
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: '/watchingNow/5.jpg',
    title: {
      type: 'text',
      value: 'Алекс Лютый'
    },
    ageRestriction: 18
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: '/watchingNow/6.jpg',
    title: {
      type: 'text',
      value: 'Рим',
    },
    ageRestriction: 18
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: '/watchingNow/7.jpg',
    title: {
      type: 'text',
      value: 'Сопрано',
    },
    ageRestriction: 18
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: '/watchingNow/8.jpg',
    title: {
      type: 'text',
      value: 'Декстер®',
    },
    ageRestriction: 18
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: '/watchingNow/9.jpg',
    title: {
      type: 'text',
      value: 'Настоящий детектив',
    },
    ageRestriction: 18
  }
]

export const temporarySlidesNewRelease: Array<CardData> = [
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    title: {
      type: "img",
      value: "/newRelease/1/title.png"
    },
    imgBg: "/newRelease/1/bg.jpg",
    ageRestriction: 18
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    title: {
      type: "img",
      value: "/newRelease/2/title.png"
    },
    imgBg: "/newRelease/2/bg.jpg",
    ageRestriction: 18
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    title: {
      type: "img",
      value: "/newRelease/3/title.png"
    },
    imgBg: "/newRelease/3/bg.jpg",
    ageRestriction: 18
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    title: {
      type: "img",
      value: "/newRelease/4/title.png"
    },
    imgBg: "/newRelease/4/bg.jpg",
    ageRestriction: 18
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    title: {
      type: "img",
      value: "/newRelease/5/title.png"
    },
    imgBg: "/newRelease/5/bg.jpg",
    ageRestriction: 18
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    title: {
      type: "img",
      value: "/newRelease/6/title.png"
    },
    imgBg: "/newRelease/6/bg.jpg",
    ageRestriction: 18
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    title: {
      type: "img",
      value: "/newRelease/7/title.png"
    },
    imgBg: "/newRelease/7/bg.jpg",
    ageRestriction: 18
  }
]

export const temporarySlidesDetectiveSeries: Array<CardData> = [
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    title: {
      type: "text",
      value: "Месье Спейд"
    },
    imgBg: "/detectiveSeries/1.jpg",
    ageRestriction: 18
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    title: {
      type: "text",
      value: "Поймай мне убийцу"
    },
    imgBg: "/detectiveSeries/2.jpg",
    ageRestriction: 18
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    title: {
      type: "text",
      value: "Капкан"
    },
    imgBg: "/detectiveSeries/3.jpg",
    ageRestriction: 18
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    title: {
      type: "text",
      value: "Босх"
    },
    imgBg: "/detectiveSeries/4.jpg",
    ageRestriction: 18
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    title: {
      type: "text",
      value: "Парижская полиция 1905"
    },
    imgBg: "/detectiveSeries/5.jpg",
    ageRestriction: 18
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    title: {
      type: "text",
      value: "Отправление"
    },
    imgBg: "/detectiveSeries/6.jpg",
    ageRestriction: 18
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    title: {
      type: "text",
      value: "Соммердаль"
    },
    imgBg: "/detectiveSeries/7.jpg",
    ageRestriction: 18
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    title: {
      type: "text",
      value: "Найди меня"
    },
    imgBg: "/detectiveSeries/8.jpg",
    ageRestriction: 18
  }

]

export const temporaryThoseAboutToDie: Array<CardData> = [
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    title: {
      type: "img",
      value: "/promoLine/title.png"
    },
    imgBg: "/promoLine/1.jpg",
    ageRestriction: 18
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/promoLine/2.jpg",
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/promoLine/3.jpg",
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/promoLine/4.jpg",
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/promoLine/5.jpg",
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/promoLine/6.jpg",
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/promoLine/7.jpg",
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/promoLine/8.jpg",
  }
]

export const temporaryPopularGenresSeries: Array<CardData> = [
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/popularGenres/series/1.jpg",
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/popularGenres/series/2.jpg",
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/popularGenres/series/3.jpg",
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/popularGenres/series/4.jpg",
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/popularGenres/series/5.jpg",
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/popularGenres/series/6.jpg",
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/popularGenres/series/7.jpg",
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/popularGenres/series/8.jpg",
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/popularGenres/series/9.jpg",
  }
]

export const temporaryPopularGenresMovies: Array<CardData> = [
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/popularGenres/movies/1.jpg",
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/popularGenres/movies/2.jpg",
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/popularGenres/movies/3.jpg",
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/popularGenres/movies/4.jpg",
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/popularGenres/movies/5.jpg",
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/popularGenres/movies/6.jpg",
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/popularGenres/movies/7.jpg",
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/popularGenres/movies/8.jpg",
  },
]

export const temporaryBlog: Array<CardData> = [
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/blog/1.jpg",
    title: {
      type: "text",
      value: "Барби, подвинься, Рим наступает: как Ancient Roman Core захватил модников в 2024-м"
    },
    description: "Разбираемся в основах нового «кора» и изучаем римскую эстетику."
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/blog/2.jpg",
    title: {
      type: "text",
      value: "«Мифические создания и как их готовят» – история о том, как важно хорошо есть и не тревожиться"
    },
    description: "Дегустируем, насколько вкусными могут быть существа из китайской мифологии."
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/blog/3.jpg",
    title: {
      type: "text",
      value: "HBO готовит семь новых спин-оффов «Игры престолов» — сообщает Джордж Мартин"
    },
    description: "Больше экранизаций фанатам литературной вселенной прославленного писателя."
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/blog/4.jpg",
    title: {
      type: "text",
      value: "Как создается магия: 3 доксериала об истории фантастики, хоррора и комиксов"
    },
    description: "Эти проекты подробно изучают разные грани популярных жанров."
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/blog/5.jpg",
    title: {
      type: "text",
      value: "«Обреченные на славу»: как всё было на самом деле? Разбираем героев сериала вместе с историком"
    },
    description: "Реки крови в Колизее, добродушный император Веспасиан — правда или миф?"
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/blog/6.jpg",
    title: {
      type: "text",
      value: "«Мама» Поттера и «папа» Страйка отмечает день рождения"
    },
    description: "Британская писательница, сценаристка и кинопродюсер Джоан Роулинг празднует свой день рождения 31 июля."
  },
  {
    link: {
      type: 'allCard',
      value: '/'
    },
    imgBg: "/blog/7.jpg",
    title: {
      type: "text",
      value: "Это разборка императорская: 7 сериалов о королевских страстях и интригах"
    },
    description: "Исторические личности и выдуманные правители, с которыми лучше не связываться."
  },

]

export const temporaryListSeries = [
  {
    data: {
      title: 'Дом Дракона',
      originalTitle: 'House of the Dragon',
      discription: 'Долгожданный приквел легендарного сериала «Игра престолов». В основу «Дома Дракона» лег первый том книги Джорджа Р.Р. Мартина «Пламя и кровь», где раскрывается история династии Таргариенов. В частности, семейство ввязывается в жестокую гражданскую войну, которая получила название «Танец драконов». Среди режиссеров сериала — Мигель Сапочник, ранее работавший над «Игрой престолов». Главные роли исполнили Мэтт Смит («Доктор Кто»), Эмма Д’Арси («Мисс Плохое Поведение») и Оливия Кук («Медленные лошади»). Автор оригинальной книги Джордж Мартин описывает сериал «Дом Дракона» как «шекспировскую трагедию», где нет однозначно положительных героев. То есть все в лучших традициях невероятной вселенной «Игры престолов»!',
      aboutSerial: {
        title: 'Главная информация о «Доме дракона»',
        discription: `После невероятного успеха телесериала «Игра престолов» стоило ожидать, что вселенная сериала обязательно дополнится приквелами и спин-оффами. Первым из них стал проект «Дом дракона» (в оригинале — House of Dragon), вышедший в 2022 году. Сейчас посмотреть все серии онлайн и в хорошем качестве можно в Амедиатеке — по подписке доступен весь сезон бесплатно — без дополнительных плат. А в этом материале подробнее расскажем о сюжете сериала.

        Новый сериал-приквел «Дом дракона» снят также по франшизе Джорджа Р. Р. Мартина «Песнь льда и пламени», а если быть точнее по главам книги «Пламя и кровь», которые описывают события гражданской войны с названием «Танец Драконов».

        Действие сериала «Дом дракона» переносит зрителей в фэнтези-континент Вестерос, знакомый фанатам по «Игре престолов». Однако события во всех сериях происходят примерно за 200 лет до событий всех сезонов известной истории. Кстати, именно по этой причине смотреть сериал можно и тем, кто еще не погружен в основной сюжет.

        История «Дома дракона» разворачивается вокруг рода Таргариенов, которые и объединили Семь Королевств. После смерти короля Визериса I сразу два героя заявили свои права на Железный трон — принцесса Рейнира Таргариен и принц Деймон Таргариен. Они заручились поддержкой разных партий, и началась жестокая война — ведь бесплатно и без жертв получить желаемое невозможно.

        Интересный факт: у сюжета сериала «Дом дракона» есть исторический прототип — война в Англии за престол в XII веке. Тогда за трон боролись племянник короля Генриха I Стефан и дочь Генриха Матильда.

        Также занимательный факт — в книге данный сюжет представлен как хорошая, но не очень объективная историческая хроника, написанная вестеросским историком. В сериале «Дом дракона» создатели, в том числе в лице режиссера Мигеля Сапочника, решили рассказать эту историю в хронологическом порядке для достоверности.

        Что известно о выходе нового сезона «Дома дракона»?
        Первый сезон сериала имел огромный успех и получил достаточно большое количество положительных оценок от критиков. Кроме того, успех сериала также подтвердили и награды известных кинопремий:

        «Дом дракона» получил «Золотой глобус» в номинации «Лучший драматический сериал».

        У сериала девять номинаций в прайм-таймовой премии «Эмми».

        Сериал удостоился трех технических наград в Британской телеакадемии.

        Благодаря такому отклику у создателей «Дома дракона» не было сомнений, снимать ли второй сезон.

        И недавно создатели сериала анонсировали дату выхода нового сезона — июнь 2024 — то есть ждать осталось недолго!

        В опубликованных трейлерах и отрывках можно увидеть звезд всех серий первого сезона, например Мэтта Смита, он исполнил роль принца Деймона Таргариена и Эмму Д’Арси, исполнившей роль Рейниры Таргариен.

        Пока точная дата выхода нового отсутствует. Однако у зрителей есть возможность посмотреть первый сезон онлайн в хорошем качестве уже сейчас — в Амедиатеке.

        5 дополнительных интересных фактов о сериале «Дом дракона»
        - Железный трон в «Доме дракона» мощнее и больше: создатели хотели подчеркнуть исключительность и силу дома Таргариенов, поэтому Железный трон благодаря увеличению мечей стал выше и эффектнее, а вокруг декораторы вручную оформили лес из плавящегося оружия.

        - Музыку для сериала написал Рамин Джавади, который, по его словам, может видеть музыку в цвете (это называется синестезия). Благодаря тонкой работе и выбору инструментов, удалось сохранить дух оригинального сериала и добавить изюминки в новый.

        - Драконы в приквеле намного эффектнее, особеннее и ярче — каждый дракон был тщательно проработан. Например, для прорисовки дракона по имени Вхагар использовали образ черепахи. Кроме того, драконов наделили почти человеческими качествами — кто-то любитель поворчать, а кто-то немного нервный.

        - Род Таргариенов никогда не болеет: удивительно, но это также одно из особенностей этой династии. У них крепкий иммунитет, и их обходили стороной все заболевания.

        - Настоящие фанаты сериала помнят, как в одной из серий «Игры престолов» появился стаканчик с кофе, и это стало мемом. Режиссер Мигель Сапочник сериала «Дом дракона» в одном из интервью поделился, что съемочная группа и актеры порой специально оставляли стаканы с кофе в кадре (ради шутки). На монтаже их, конечно, закрашивали.`,
      },
      ageRestriction: 18,
      dateRelease: 2022,
      genres: ['Драма', 'Мелодрама', 'Боевик', 'Фэнтези'],
      actors: ['Стив Туссэн', 'Мэтт Смит', 'Эмма Д’Арси', 'Пэдди Консидайн'],
      directors: ['Грег Яйтанс', 'Мигель Сапочник'],
      country: 'США',
      production: 'HBO'
    },
    rating: {
      amediateka: 9.1,
      imdb: 8.8,
      kinopoisk: 8.4
    },
    actionsData: {
      favorites: [],
      liked: [],
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
