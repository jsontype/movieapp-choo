import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Button from "@mui/material/Button"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { useTranslation } from "react-i18next"
import React, { useState } from "react"
import Movies from "./components/Organisms/Movies"
import Todos from "./components/Organisms/Todos"
import News from "./components/Organisms/News"
import Counter from "./components/Organisms/Counter"
import { Routes, Route, Link } from "react-router-dom"
import styles from "./App.module.scss"
import i18n from "i18next"
import ButtonLng from "./components/Atoms/ButtonLng"
import MovieFilterIcon from "@mui/icons-material/MovieFilter"
import ChecklistIcon from "@mui/icons-material/Checklist"
import ArticleIcon from "@mui/icons-material/Article"
import ExposureIcon from "@mui/icons-material/Exposure"

type Anchor = "top" | "left" | "bottom" | "right"

export default function TemporaryDrawer() {
  const { t } = useTranslation()

  // 메뉴 아이콘
  const menuItems = [
    { text: t("movies:title"), icon: <MovieFilterIcon />, link: "/movies" },
    { text: t("todos:title"), icon: <ChecklistIcon />, link: "/todos" },
    { text: t("news:title"), icon: <ArticleIcon />, link: "/news" },
    { text: t("counter:title"), icon: <ExposureIcon />, link: "/counter" },
  ]

  // 카운터앱에 넘겨줄 상태
  const [count, setCount] = useState(0)

  // 메뉴 위치 상태
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  // 언어 변경 함수
  const onChangeLng = (lng: string) => {
    lng === "ja"
      ? i18n.changeLanguage("ja")
      : lng === "en"
      ? i18n.changeLanguage("en")
      : i18n.changeLanguage("ko")
  }

  // 메뉴 열기 함수
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return
      }
      setState({ ...state, [anchor]: open })
    }

  // 메뉴 리스트
  const renderNavbarItem = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List onClick={toggleDrawer(anchor, false)}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <Link to={item.link} className={styles.menu}>
                <ListItemText primary={item.text} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <div className={styles.rightButtons}>
          <ButtonLng
            onChangeLng={onChangeLng}
            onChangeLngArgs={"en"}
            label={t("common:lngE")}
          />
          <ButtonLng
            onChangeLng={onChangeLng}
            onChangeLngArgs={"ko"}
            label={t("common:lngK")}
          />
          <ButtonLng
            onChangeLng={onChangeLng}
            onChangeLngArgs={"ja"}
            label={t("common:lngJ")}
          />
        </div>
      </List>
    </Box>
  )

  return (
    <>
      <div className={styles.header}>
        {/* 헤더 */}
        {(["left"] as const).map((anchor) => (
          <React.Fragment key={anchor}>
            {/* 왼쪽 메뉴 : 로고, 메뉴 열기 버튼 */}
            <div>
              <span className={styles.logo}>General App</span>

              <Button onClick={toggleDrawer(anchor, true)}>
                {t("common:navigation")}
              </Button>
            </div>

            {/* 숨겨져있는 사이드바 메뉴 */}
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {renderNavbarItem(anchor)}
            </Drawer>

            {/* 오른쪽 메뉴 : 언어 변경 버튼 */}
            <div className={styles.rightButtons}>
              <ButtonLng
                onChangeLng={onChangeLng}
                onChangeLngArgs={"en"}
                label={t("common:lngE")}
              />
              <ButtonLng
                onChangeLng={onChangeLng}
                onChangeLngArgs={"ko"}
                label={t("common:lngK")}
              />
              <ButtonLng
                onChangeLng={onChangeLng}
                onChangeLngArgs={"ja"}
                label={t("common:lngJ")}
              />
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* 메인 */}
      <div className={styles.App}>
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/news" element={<News />} />
          <Route
            path="/counter"
            element={<Counter count={count} setCount={setCount} />}
          />
        </Routes>
      </div>
    </>
  )
}
