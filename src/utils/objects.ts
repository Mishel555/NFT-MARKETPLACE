export const countProps = (obj: object): number => {
  let count = 0;

  for (const k in obj) {
    if (obj.hasOwnProperty(k)) {
      count++;
    }
  }
  return count;
};

export const objectEquals = (v1: unknown, v2: unknown): boolean => {
  if (typeof (v1) !== typeof (v2)) {
    return false;
  }

  if (typeof (v1) === 'function') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return v1.toString() === v2.toString();
  }

  if (v1 instanceof Object && v2 instanceof Object) {
    if (countProps(v1) !== countProps(v2)) {
      return false;
    }
    let r = true;
    for (const k in v1) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      r = objectEquals(v1[k], v2[k]);
      if (!r) {
        return false;
      }
    }
    return true;
  } else {
    return v1 === v2;
  }
};

export const isObjectEmpty = (obj: object) => countProps(obj) === 0;

export const copyObject = (obj: unknown) => JSON.parse(JSON.stringify(obj));
