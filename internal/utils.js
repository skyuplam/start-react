import HappyPack from 'happypack';
export const removeEmpty = (list) =>
  list.filter((iterm) => item);

export const happypack = ({name, loaders}) => new HappyPack({
  id: name,
  verbose: false,
  threads: 5,
  loaders,
});
