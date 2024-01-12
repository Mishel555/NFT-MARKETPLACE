interface IIsObject {
  (item: unknown): boolean;
}

interface IObject {
  [key: string]: unknown;
}

interface IDeepMerge {
  (target: IObject, ...sources: Array<IObject>): IObject;
}

/**
 * @description Method to check if an item is an object. Date and Function are considered
 * an object, so if you need to exclude those, please update the method accordingly.
 * @param item - The item that needs to be checked
 * @return {Boolean} Whether or not @item is an object
 */
export const isObject: IIsObject = (item: unknown): boolean => (
  Boolean(item instanceof Object)
);

/**
 * @description Method to perform a deep merge of objects
 * @param {Object} target - The targeted object that needs to be merged with the supplied @sources
 * @param {Array<Object>} sources - The source(s) that will be used to update the @target object
 * @return {Object} The final merged object
 */
export const deepMerge: IDeepMerge = (target: IObject, ...sources: Array<IObject>): IObject => {
  // return the target if no sources passed
  if (!sources.length) {
    return target;
  }

  const result: IObject = target;

  if (isObject(result)) {
    const len: number = sources.length;

    for (let i = 0; i < len; i += 1) {
      const elm: unknown = sources[i];

      if (isObject(elm)) {
        const objectElm: IObject = Object(elm);
        for (const key in objectElm) {
          if (objectElm.hasOwnProperty(key)) {
            if (isObject(objectElm[key])) {
              if (!result[key] || !isObject(result[key])) {
                result[key] = Array.isArray(objectElm[key]) ? [] : {};
              }
              deepMerge(result[key] as IObject, objectElm[key] as IObject);
            } else {
              result[key] = objectElm[key];
            }
          }
        }
      }
    }
  }

  return result;
};

export default deepMerge;
