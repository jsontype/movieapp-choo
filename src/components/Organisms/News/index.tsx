import { useEffect, useState, memo } from "react"
import styles from "./style.module.scss"
import { useTranslation } from "react-i18next"
import TableContainer from "@mui/material/TableContainer"
import Table from "@mui/material/Table"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import TableBody from "@mui/material/TableBody"
import Paper from "@mui/material/Paper"

type NewsItemProps = {
  url: string
  title: string
  comments_count: number
  user: string
}

function News() {
  const { t } = useTranslation()

  const [newsList, setNewsList] = useState([])

  useEffect(() => {
    fetch("https://api.hnpwa.com/v0/news.json")
      .then((res) => res.json())
      .then((json) => setNewsList(json))
  }, [])

  return (
    <>
      <div className={styles.title}>{t("news:title")}</div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="news table">
          <TableHead>
            <TableRow>
              <TableCell>{t("news:itemTitle")}</TableCell>
              <TableCell align="right">{t("news:itemCommentsCount")}</TableCell>
              <TableCell align="right">{t("news:itemUser")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newsList.map((news: NewsItemProps, index: number) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <a
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.newsTitle}
                  >
                    {news.title}
                  </a>
                </TableCell>
                <TableCell align="right">{news.comments_count}</TableCell>
                <TableCell align="right">{news.user}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default memo(News)
