import { CheerioAPI } from "cheerio"

export const parseInitialFormData = ($: CheerioAPI) => {
  const form = $("form")
  const select = form.find("select")
  const input = form.find('input[type!="submit"][type!="checkbox"]')

  const data = {}

  input.each((i, elem) => {
    if ($(elem).attr("name"))
      data[$(elem).attr("name")] = $(elem).attr("value") || ""
  })

  select.each((i, elem) => {
    if ($(elem).attr("name"))
      data[$(elem).attr("name")] = $(elem)
        .find($('[selected="selected"]'))
        .attr("value")
  })
  return data
}

export const parseSelector = ($: CheerioAPI) => {
  const data = {}
  const form = $("form")
  const select = form.find("select")

  select.each((i, elem) => {
    const options = $(elem).find($("option[selected]"))[0]
    data[$(elem).attr("name")] =
      (options && $(options).attr("value")) || undefined
  })

  return data
}
