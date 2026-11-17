// biome-ignore lint/suspicious/noExplicitAny: Required for Types
type ObjectOfAny = Record<string, any>;

type FixedLengthArray<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : FixedLengthArrayRecursive<T, N, []>
  : never;

type FixedLengthArrayRecursive<
  T,
  N extends number,
  R extends unknown[],
> = R["length"] extends N ? R : FixedLengthArrayRecursive<T, N, [T, ...R]>;

type BuildTestFactoryGetterProps<TModel> = (index: number) => Partial<TModel>;

type BuildTestFactoryArrayProps<
  TModel,
  TCount extends number,
> = FixedLengthArray<Partial<TModel>, TCount>;

type BuildTestFactoryProps<TModel, TCount extends number> =
  | BuildTestFactoryGetterProps<TModel>
  | BuildTestFactoryArrayProps<TModel, TCount>;

const range = (startAt: number, size: number): Array<number> => {
  const length = size - startAt + 1;
  return Array.from({ length }, (_, i) => i + startAt);
};

const isGetterProps = <TModel>(
  props: unknown,
): props is BuildTestFactoryGetterProps<TModel> => typeof props === "function";

const isArrayProps = <TModel>(
  props: unknown,
  index: number,
): props is Array<TModel> => Array.isArray(props) && index < props.length;

const getOverrideProps = <TModel, TCount extends number>(
  props: BuildTestFactoryProps<TModel, TCount> | undefined,
  index: number,
): Partial<TModel> => {
  let overrideProps: Partial<TModel> = {};
  if (isGetterProps<TModel>(props)) {
    overrideProps = props(index);
  } else if (props && isArrayProps<TModel>(props, index)) {
    overrideProps = props[index] ?? {};
  }
  return overrideProps;
};

/**
 * Provides functions to create items from a given factory.
 * @example
 *
 * const UserFactory = buildFactory<UserType>((index) => ({
 *   name: faker.name.firstName(),
 *   age: faker.datatype.number(1, index === 0 ? 50 : 100),
 * }));
 * // single item
 * UserFactory.create();
 * // single item with overriden props
 * UserFactory.create({ name: 'John' });
 * // multiple items
 * UserFactory.createMany(3);
 * // multiple items with overriden props on every item
 * UserFactory.createMany(3, () => ({ name: 'John' }));
 * // multiple items with overriden props per index
 * UserFactory.createMany(3, [{ name: 'John' }, { name: 'Jane' }, { name: 'Jack' }]);
 */
export const buildFactory = <TModel extends ObjectOfAny>(
  factory: (index?: number) => TModel,
) => ({
  create: (props?: Partial<TModel>): TModel => ({ ...factory(), ...props }),
  createMany: <TCount extends number>(
    count = 10 as TCount,
    props?: BuildTestFactoryProps<TModel, TCount>,
  ): TModel[] =>
    range(1, count).map((_, index) => ({
      ...factory(index),
      ...getOverrideProps(props, index),
    })),
});
