import { JSX, useState } from "react"
import { Slider } from "../Slider"
import { linksPopularGenresState } from '../../types/linksPopularGenresState'
import { CardData } from "../../types/Card"
import { SliderProps } from "../../types/interfaces/SliderProps"

export function PopularGenres(): JSX.Element {
  const itemsSerials: CardData[] = [
    {
      _id: '1',
      type: 'series',
      title: {
        value: 'Детективы',
        originalTitle: 'Detectives',
        linkTitle: '#'
      },
      badge: null,
      ageRestriction: 0,
      description: "Детективы",
      bg: {
        imgUrl: '/popularGenres/series/1.jpg',
        videoUrl: '',
        imgResizeUrl: '/popularGenres/series/1.jpg',
        sourceUrls: ['/popularGenres/series/1.jpg']
      },
      logoImg: "#",
      link: '#',
    },
    {
      _id: '2',
      type: 'series',
      title: {
        value: 'Комедии',
        originalTitle: 'Comedies',
        linkTitle: '#'
      },
      badge: null,
      ageRestriction: 0,
      description: "Комедии",
      bg: {
        imgUrl: '/popularGenres/series/2.jpg',
        videoUrl: '',
        imgResizeUrl: '/popularGenres/series/2.jpg',
        sourceUrls: ['/popularGenres/series/2.jpg'],
      },
      logoImg: "#",
      link: '#',
    },
    {
      _id: '3',
      type: 'series',
      title: {
        value: 'Криминал',
        originalTitle: 'Crime',
        linkTitle: '#'
      },
      badge: null,
      ageRestriction: 0,
      description: "Криминал",
      bg: {
        imgUrl: '/popularGenres/series/3.jpg',
        videoUrl: '',
        imgResizeUrl: '/popularGenres/series/3.jpg',
        sourceUrls: ['/popularGenres/series/3.jpg'],
      },
      logoImg: "#",
      link: '#',
    },
    {
      _id: '4',
      type: 'series',
      title: {
        value: 'Триллеры',
        originalTitle: 'Thrillers',
        linkTitle: '#'
      },
      badge: null,
      ageRestriction: 0,
      description: "Триллеры",
      bg: {
        imgUrl: '/popularGenres/series/4.jpg',
        videoUrl: '',
        imgResizeUrl: '/popularGenres/series/4.jpg',
        sourceUrls: ['/popularGenres/series/4.jpg'],
      },
      logoImg: "#",
      link: '#',
    },
    {
      _id: '5',
      type: 'series',
      title: {
        value: 'Комедии',
        originalTitle: 'Comedies',
        linkTitle: '#'
      },
      badge: null,
      ageRestriction: 0,
      description: "Комедии",
      bg: {
        imgUrl: '/popularGenres/series/5.jpg',
        videoUrl: '',
        imgResizeUrl: '/popularGenres/series/5.jpg',
        sourceUrls: ['/popularGenres/series/5.jpg'],
      },
      logoImg: "#",
      link: '#',
    },
    {
      _id: '6',
      type: 'series',
      title: {
        value: 'Комедии',
        originalTitle: 'Comedies',
        linkTitle: '#'
      },
      badge: null,
      ageRestriction: 0,
      description: "Комедии",
      bg: {
        imgUrl: '/popularGenres/series/6.jpg',
        videoUrl: '',
        imgResizeUrl: '/popularGenres/series/6.jpg',
        sourceUrls: ['/popularGenres/series/6.jpg'],
      },
      logoImg: "#",
      link: '#',
    },
    {
      _id: '7',
      type: 'series',
      title: {
        value: 'Комедии',
        originalTitle: 'Comedies',
        linkTitle: '#'
      },
      badge: null,
      ageRestriction: 0,
      description: "Комедии",
      bg: {
        imgUrl: '/popularGenres/series/7.jpg',
        videoUrl: '',
        imgResizeUrl: '/popularGenres/series/7.jpg',
        sourceUrls: ['/popularGenres/series/7.jpg'],
      },
      logoImg: "#",
      link: '#',
    },
    {
      _id: '8',
      type: 'series',
      title: {
        value: 'Комедии',
        originalTitle: 'Comedies',
        linkTitle: '#'
      },
      badge: null,
      ageRestriction: 0,
      description: "Комедии",
      bg: {
        imgUrl: '/popularGenres/series/8.jpg',
        videoUrl: '',
        imgResizeUrl: '/popularGenres/series/8.jpg',
        sourceUrls: ['/popularGenres/series/8.jpg'],
      },
      logoImg: "#",
      link: '#',
    },
  ]
  const itemsFilms: CardData[] = [
    {
      _id: '1',
      type: 'movie',
      title: {
        value: 'Драмы',
        originalTitle: 'Dramas',
        linkTitle: '#'
      },
      badge: null,
      ageRestriction: 0,
      description: "Драмы",
      bg: {
        imgUrl: '/popularGenres/movies/1.jpg',
        videoUrl: '',
        imgResizeUrl: '/popularGenres/movies/1.jpg',
        sourceUrls: ['/popularGenres/movies/1.jpg'],
      },
      logoImg: "#",
      link: '#',
    },
    {
      _id: '2',
      type: 'movie',
      title: {
        value: 'Документальные',
        originalTitle: 'Documentaries',
        linkTitle: '#'
      },
      badge: null,
      ageRestriction: 0,
      description: "Документальные",
      bg: {
        imgUrl: '/popularGenres/movies/2.jpg',
        videoUrl: '',
        imgResizeUrl: '/popularGenres/movies/2.jpg',
        sourceUrls: ['/popularGenres/movies/2.jpg'],
      },
      logoImg: "#",
      link: '#',
    },
    {
      _id: '3',
      type: 'series',
      title: {
        value: 'Биографические',
        originalTitle: 'Biographies',
        linkTitle: '#'
      },
      badge: null,
      ageRestriction: 0,
      description: "Биографические",
      bg: {
        imgUrl: '/popularGenres/movies/3.jpg',
        videoUrl: '',
        imgResizeUrl: '/popularGenres/movies/3.jpg',
        sourceUrls: ['/popularGenres/movies/3.jpg'],
      },
      logoImg: "#",
      link: '#',
    },
    {
      _id: '4',
      type: 'series',
      title: {
        value: 'Стендап',
        originalTitle: 'Standup',
        linkTitle: '#'
      },
      badge: null,
      ageRestriction: 0,
      description: "Стендап",
      bg: {
        imgUrl: '/popularGenres/movies/4.jpg',
        videoUrl: '',
        imgResizeUrl: '/popularGenres/movies/4.jpg',
        sourceUrls: ['/popularGenres/movies/4.jpg'],
      },
      logoImg: "#",
      link: '#',
    },
    {
      _id: '5',
      type: 'series',
      title: {
        value: 'Комедии',
        originalTitle: 'Comedies',
        linkTitle: '#'
      },
      badge: null,
      ageRestriction: 0,
      description: "Комедии",
      bg: {
        imgUrl: '/popularGenres/movies/5.jpg',
        videoUrl: '',
        imgResizeUrl: '/popularGenres/movies/5.jpg',
        sourceUrls: ['/popularGenres/movies/5.jpg'],
      },
      logoImg: "#",
      link: '#',
    },
    {
      _id: '6',
      type: 'series',
      title: {
        value: 'Криминал',
        originalTitle: 'Criminals',
        linkTitle: '#'
      },
      badge: null,
      ageRestriction: 0,
      description: "Криминал",
      bg: {
        imgUrl: '/popularGenres/movies/6.jpg',
        videoUrl: '',
        imgResizeUrl: '/popularGenres/movies/6.jpg',
        sourceUrls: ['/popularGenres/movies/6.jpg'],
      },
      logoImg: "#",
      link: '#',
    },
    {
      _id: '7',
      type: 'series',
      title: {
        value: 'Фильмы HBO',
        originalTitle: 'HBO Films',
        linkTitle: '#'
      },
      badge: null,
      ageRestriction: 0,
      description: "Фильмы HBO",
      bg: {
        imgUrl: '/popularGenres/movies/7.jpg',
        videoUrl: '',
        imgResizeUrl: '/popularGenres/movies/7.jpg',
        sourceUrls: ['/popularGenres/movies/7.jpg'],
      },
      logoImg: "#",
      link: '#',
    },
    {
      _id: '8',
      type: 'series',
      title: {
        value: 'Исторические',
        originalTitle: 'Historical',
        linkTitle: '#'
      },
      badge: null,
      ageRestriction: 0,
      description: "Исторические",
      bg: {
        imgUrl: '/popularGenres/movies/8.jpg',
        videoUrl: '',
        imgResizeUrl: '/popularGenres/movies/8.jpg',
        sourceUrls: ['/popularGenres/movies/8.jpg'],
      },
      logoImg: "#",
      link: '#',
    },
  ]
  const defaultLinksState: linksPopularGenresState = {
    serials: {
      value: true,
      items: itemsSerials,
    },
    films: {
      value: false,
      items: itemsFilms,
    }
  }
  const baseClass: string = 'link'
  const linkTypeClass: string = 'link_primary'
  const activeLinkClass: string = 'link_active'
  const text: Record<string, string> = {
    popularGenres: 'Популярные жанры',
    serials: 'Сериалы',
    films: 'Фильмы'
  }

  const [activeLinkPopularGenres, setActiveLinkPopularGenres] = useState(defaultLinksState)

  const sliderPropsPopularGenres: SliderProps = {
    sliderSettings: {
      typeSlider: 'multi',
      pagenation: false,
      autoSwipe: false,
      lastSwipe: true,
      quantityListItems: 5,
      mediaPlayerHandler: false
    },
    sliderData: {
      data: activeLinkPopularGenres.serials.value
        ? activeLinkPopularGenres.serials.items
        : activeLinkPopularGenres.films.items,
      cardStyles: {
        cardSize: 'sm',
        flex: {
          body: {
            justifyContent: 'space-between'
          }
        },
        clipPath: {
          value: true,
          type: '10'
        },
        ageRestrictionBadge: null,
        boxShadow: false,
        btnGroup: false,
        hover: {
          scale: false,
          playBack: {
            value: true,
            type: 'default'
          },
          shadow: false
        }
      },
      settings: {
        title: {
          titleOutside: false,
          titleLogoImg: false,
          titleLogoImgIndex: 0
        },
        badgeVisible: false,
        link: {
          linkType: 'allCard',
          linkDisabled: false
        },
        descriptionVisible: false,
        tags: null,
        cardSeries: false
      },
      loadingData: false,
      errorData: false
    },
  }

  const setClassLink = (link: boolean): string => link
    ? `${baseClass} ${linkTypeClass} ${activeLinkClass}`
    : `${baseClass} ${linkTypeClass}`

  const updateActiveLink = () => {
    setActiveLinkPopularGenres(prev => ({
      serials: {
        ...prev.serials,
        value: !prev.serials.value,
      },
      films: {
        ...prev.films,
        value: !prev.films.value,
      }
    }))
  }

  return (
    <>
      <div className="home-item__title container">
        <h2>{text.popularGenres}</h2>
        <div className="home-item__title-wrapper">
          <span className={setClassLink(activeLinkPopularGenres.serials.value)}
            onClick={updateActiveLink}
          >
            {text.serials}
          </span>
          <span className={setClassLink(activeLinkPopularGenres.films.value)}
            onClick={updateActiveLink}
          >
            {text.films}
          </span>
        </div>
      </div>

      <Slider {...sliderPropsPopularGenres} />
    </>
  )
}
