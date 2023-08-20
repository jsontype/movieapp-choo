import ButtonLng from ".";

export default {
  title: "Atoms/ButtonLng",
  component: ButtonLng,
};

const Template = (args) => <ButtonLng {...args} />;

export const English = Template.bind({});
English.args = {
  onChangeLng: () => console.log("English selected"),
  onChangeLngArgs: "en",
  label: "English",
};

export const Korean = Template.bind({});
Korean.args = {
  onChangeLng: () => console.log("Korean selected"),
  onChangeLngArgs: "ko",
  label: "Korean",
};

export const Japanese = Template.bind({});
Japanese.args = {
  onChangeLng: () => console.log("Japanese selected"),
  onChangeLngArgs: "ja",
  label: "Japanese",
};
