import { createDiscreteApi } from 'naive-ui';

const { notification } = createDiscreteApi(['notification']);

export function validate(ref: any, hint = true): Promise<boolean> {
  return new Promise((resolve, reject) => {
    ref.validate(errors => {
      if (!errors) {
        resolve(true);
      } else {
        if (hint) {
          notification.error({
            content: '提示',
            meta: errors[0][0].message,
            duration: 3000,
          });
        }
        reject(errors);
      }
    });
  });
}

export function tips(meta: string, type?: 'warning' | 'success' | 'info' | 'error') {
  type = type || 'warning';
  notification[type]({
    content: '提 示',
    meta,
    duration: 3000,
  });
}
