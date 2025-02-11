import autocompleteConfig from './autocomplete-config';
import treeConfig from './tree-config';
import categoryConfig from './category-config';

const heyuiConfig = () => {

  HeyUI.config('autocomplete.configs', autocompleteConfig());
  HeyUI.config('tree.configs', treeConfig());
  HeyUI.config('category.configs', categoryConfig());

  HeyUI.config('menu', {
    keyName: 'key',
    titleName: 'title',
    childrenName: 'children'
  });
};

export default heyuiConfig;
