import React from 'react'
import MuiButton from '@mui/material/Button'
import styles from './style.module.scss'
import { FaFlagUsa, FaFlag } from 'react-icons/fa'

export type ButtonProps = {
  onChangeLng: any
  onChangeLngArgs: string
  label: string
}

export default function ButtonLng({ onChangeLng, onChangeLngArgs, label }: ButtonProps) {
  // 국기 아이콘 렌더링
  const renderIcon = () => {
    switch (onChangeLngArgs) {
      case 'en':
        return <FaFlagUsa />
      case 'ko':
        return <FaFlag />
      case 'ja':
        return <FaFlag />
      default:
        return null
    }
  }

  return (
    <MuiButton
      size="small"
      onClick={() => onChangeLng(onChangeLngArgs)}
      variant="contained"
      className={styles.buttonPrimary}
      startIcon={renderIcon()} // 아이콘을 추가합니다.
      sx={{ fontSize: '10%' }}
    >
      {/* {onChangeLngArgs} */}
      {label}
    </MuiButton>
  )
}
