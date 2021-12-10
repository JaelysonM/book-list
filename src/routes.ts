import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Book from './pages/Book';
import Main from './pages/Main';

const Routes = createAppContainer(createSwitchNavigator({
  Main,
  Book,
}, {
  initialRouteName: 'Main',
  backBehavior: "history"
}))

export default Routes;