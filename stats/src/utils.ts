export const stringToDate = (data: string): Date => {
  const arr = data.split('/')
  return new Date(parseInt(arr[0]), parseInt(arr[1]) - 1, parseInt(arr[2]))
}
