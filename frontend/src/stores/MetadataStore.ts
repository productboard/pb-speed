import { observable, action } from 'mobx';
export type TAction = string;
export type TSpace = { id: number; name: string };

class MetadataStore {
  @observable actions: Array<TAction> = [];
  @observable spaces: Array<TSpace> = [];

  @action
  setMetadata({
    actions,
    spaces,
  }: {
    actions: MetadataStore['actions'];
    spaces: MetadataStore['spaces'];
  }) {
    this.actions = actions;
    this.spaces = spaces;
  }
}

export default new MetadataStore();
