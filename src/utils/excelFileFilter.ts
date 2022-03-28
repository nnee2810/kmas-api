export function excelFileFilter(
  req: any,
  file: {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    size: number
    destination: string
    filename: string
    path: string
    buffer: Buffer
  },
  callback: (error: Error, acceptFile: boolean) => void,
) {
  if (
    !"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel".includes(
      file.mimetype,
    )
  )
    return callback(new Error("Invalid file type"), false)
  callback(null, true)
}
