import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

export default interface NavigationProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}