type TPackageJSONConfig = {
  version: string;
};

export function isPackageJSONConfig(value: unknown): value is TPackageJSONConfig {
  return typeof value === 'object' && value !== null && !Array.isArray(value) && Object.hasOwn(value, 'version');
}
