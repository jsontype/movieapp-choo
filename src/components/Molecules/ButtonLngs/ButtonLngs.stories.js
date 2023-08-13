import ButtonLngs from '.'

export default {
  title: 'Molecules/ButtonLngs', // 스토리북에서 보여질 카테고리와 이름
  component: ButtonLngs, // 어떤 컴포넌트를 문서화할지 정의
  // 이벤트를 스토리북 액션으로 바인딩
}

const Template = args => <ButtonLngs {...args} />

export const Default = Template.bind({})
Default.args = {
  onChangeLng: language => console.log(`Selected language: ${language}`),
}
