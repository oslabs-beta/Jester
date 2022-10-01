import { store } from '../../client/redux/store';
import {
  setShowProjectPanel,
  setShowAddProject,
} from '../../client/redux/reducers/navPanelSlice';

type navPanelStateType = {
  showProjectPanel: boolean;
  showAddProject: boolean;
};

describe('Test NavPanel Reducers', () => {
  let defaultState: navPanelStateType;
  beforeAll(() => {
    defaultState = {
      showProjectPanel: false,
      showAddProject: false,
    };
  });
  describe('default state', () => {
    it('should return a default state', () => {
      const state = store.getState();
      expect(state.navPanel).toEqual(defaultState);
    });
  });
  describe('setshowProjectPanel' , () => {
    it('should toggle showProjectPanel boolean', () => {
      store.dispatch(setShowProjectPanel());
      const state = store.getState();
      expect(state.navPanel.showProjectPanel).toBe(true);
    });

  });
  describe('setShowAddProject' , () => {
    it('should toggle showAddProject boolean', () => {
      store.dispatch(setShowAddProject());
      const state = store.getState();
      expect(state.navPanel.showAddProject).toBe(true); 
    });

  });
});
