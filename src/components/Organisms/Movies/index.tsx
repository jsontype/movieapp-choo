import { useState, useEffect, memo, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import styles from './style.module.scss'
import { useTranslation } from 'react-i18next'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Box from '@mui/material/Box'

type MoviesItemProps = {
  id: number
  title: string
  rating: number
  runtime: number
  genres: string[]
  summary: string
  large_cover_image: string
}

function Movies() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const sortby = useMemo(() => searchParams.get('sortby'), [searchParams])
  const [sort, setSort] = useState(sortby || 'rating')
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const url =
      sort === 'download_count'
        ? 'https://yts.mx/api/v2/list_movies.json?sort_by=download_count'
        : sort === 'title'
        ? 'https://yts.mx/api/v2/list_movies.json?sort_by=title'
        : sort === 'year'
        ? 'https://yts.mx/api/v2/list_movies.json?sort_by=year'
        : 'https://yts.mx/api/v2/list_movies.json?sort_by=rating'

    fetch(url)
      .then(res => res.json())
      .then(json => {
        setMovies(json.data.movies)
      })
  }, [sort])

  const render = useMemo(
    () =>
      movies.map((item: MoviesItemProps) => {
        return (
          <div className={styles.movieItemContainer} key={item.id}>
            <div className={styles.movieTextContainer}>
              <div className={styles.movieTitle}>
                {item.title} {item.rating >= 9 && '👍'}
              </div>
              <div
                className={styles[item.rating >= 9 ? 'good' : item.rating >= 7 ? 'soso' : 'bad']}
              >
                {t('movies:itemRating')} : {item.rating} / 10
              </div>
              <div>
                {t('movies:itemRuntime')} : {parseInt(String(item.runtime / 60))}
                {t('movies:itemRuntimeHour')} {item.runtime % 60}
                {t('movies:itemRuntimeMinute')}
              </div>
              <div>
                {t('movies:itemGenres')} : {item.genres.join(', ')}
              </div>
              <div>
                {t('movies:itemSummary')} :{' '}
                {item.summary.length < 1
                  ? t('movies:noSummary')
                  : item.summary.length > 100
                  ? `${item.summary.substring(0, 99)} ...`
                  : item.summary}
              </div>
            </div>
            <div className={styles.movieImageContainer}>
              <img className={styles.movieImage} src={item.large_cover_image} alt={item.summary} />
            </div>
          </div>
        )
      }),
    [movies, t],
  )

  return (
    <>
      <div className={styles.title}>{t('movies:title')}</div>

      <div className={styles.sortBtnContainer}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
              m: 1,
            },
          }}
        >
          <ButtonGroup variant="text" aria-label="text button group">
            <Button onClick={() => setSort('rating')}>{t('movies:sortRating')}</Button>
            <Button onClick={() => setSort('download_count')}>
              {t('movies:sortDownloadCount')}
            </Button>
            <Button onClick={() => setSort('title')}>{t('movies:sortTitle')}</Button>
            <Button onClick={() => setSort('year')}>{t('movies:sortYear')}</Button>{' '}
          </ButtonGroup>
        </Box>
      </div>

      <div>{render}</div>
    </>
  )
}

export default memo(Movies)
