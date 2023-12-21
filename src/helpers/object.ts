export function isObject(item: object) {
  return item && typeof item === "object" && !Array.isArray(item);
}

export function mergeDeep(target: object, source: object) {
  if (isObject(target) && isObject(source)) {
    for (const k in source) {
      const key = k as keyof typeof source;
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        if (Array.isArray(source[key])) {
          if (!target[key]) target[key] = [] as never;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          for (const i in source[key] as any) {
            if (!target[key][i])
              target[key][i] = (isObject(source[key][i]) ? {} : []) as never;
            mergeDeep(target[key][i], source[key][i]);
          }
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
  }
}
