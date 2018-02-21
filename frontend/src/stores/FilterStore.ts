import { TAction, TSpace } from './MetadataStore';
import { observable, action } from 'mobx';

class FilterStore {
  @observable action: TAction | null = null;
  @observable spaceId: TSpace['id'] | null = null;

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
