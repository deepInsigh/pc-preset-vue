export const defaultTableOptions = [
  {
    type: 'checkbox',
    width: 60,
    resizable: false,
    fixed: 'left',
    align: 'center',
  },
  {
    type: 'seq',
    width: 60,
    resizable: false,
    fixed: 'left',
    align: 'center',
  },
  {
    title: '实际卡板数',
    field: 'ACTUAL_BOARD_NUMBER',
    width: 180,
  },
  {
    title: '实际箱数',
    field: 'ACTUAL_BOX_NUMBER',
    width: 180,
  },
  {
    title: '币种',
    field: 'currency',
    width: 180,
    params: {
      dictionaryKey: 'CurrencyPSC',
    },
  },
];
export const defaultQueryOptions = [
  {
    compType: 'input',
    value: '',
    label: '实际卡板数',
    field: 'ACTUAL_BOARD_NUMBER',
  },
  {
    compType: 'input',
    value: '',
    label: '实际箱数',
    field: 'ACTUAL_BOX_NUMBER',
  },
  {
    compType: 'select',
    value: '',
    label: '币种',
    field: 'currency',
    options: [],
    multiple: false,
  },
];
