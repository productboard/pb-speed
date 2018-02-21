import { observable, action, autorun } from 'mobx';
import { TAction, TSpace } from './MetadataStore';

class FilterStore {
  @observable action: TAction | null = null;
  @observable spaceId: TSpace['id'] | null = null;

  constructor() {
    const localStorageKey = this.constructor.name;
    const dataFromLocalStorage = JSON.parse(
      localStorage.getItem(localStorageKey) || 'null',
    );

    if (dataFromLocalStorage) {
      Object.assign(this, dataFromLocalStorage);
    }

    autorun(() => {
      localStorage.setItem(
        localStorageKey,
        JSON.stringify({ action: this.action, spaceId: this.spaceId }),
      );
    });
  }

  @action
  setAction(action: FilterStore['action']) {
    this.action = action;
  }

  @action
  setSpace(spaceId: FilterStore['spaceId']) {
    this.spaceId = spaceId;
  }
}

export default new FilterStore();
