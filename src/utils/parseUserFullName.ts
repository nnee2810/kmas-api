export default function parseUserFullName(value: string) {
  return value.split("(")[0]
}
