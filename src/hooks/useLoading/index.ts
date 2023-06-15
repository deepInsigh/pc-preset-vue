import { Ref } from 'vue';

const show = ref(false);

export function useSetLoading(state: boolean): void {
  show.value = state;
}

export function useGetLoading(): Ref<boolean> {
  return show;
}
