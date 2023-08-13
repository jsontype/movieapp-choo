import ButtonLng from 'components/Atoms/ButtonLng'
import styles from 'components/Atoms/ButtonLng/style.module.scss'

export type ButtonLngsProps = {
  onChangeLng: (language: string) => void
}

export default function ButtonLngs({ onChangeLng }: ButtonLngsProps) {
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ko', label: '한국어' },
    { code: 'ja', label: '日本語' },
  ]

  return (
    <div className={styles.buttonGroup}>
      {languages.map(lang => (
        <ButtonLng
          key={lang.code}
          onChangeLng={onChangeLng}
          onChangeLngArgs={lang.code}
          label={lang.label}
        />
      ))}
    </div>
  )
}
